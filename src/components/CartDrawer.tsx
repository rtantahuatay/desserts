import { selectCartCount, selectCartTotal, useCartStore } from "../stores/cartStore";
import CartItemRow from "./CartItemRow";

type CartDrawerProps = {
  onConfirm: () => void;
};

export default function CartDrawer({ onConfirm }: CartDrawerProps) {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const cartCount = useCartStore(selectCartCount);
  const cartTotal = useCartStore(selectCartTotal);

  const isEmpty = items.length === 0;
  
  return (
    <aside
      aria-label="Shopping cart"
      className="mt-8 rounded-xl bg-white p-6 lg:sticky lg:top-8 lg:mt-0 lg:w-80 lg:shrink-0 xl:w-96"
    >
      <h2 className="text-2xl font-bold text-brand">Your Cart ({cartCount})</h2>

    {isEmpty ? (
      <div className="flex flex-col items-center py-6 text-center">
        <img src="/images/illustration-empty-cart.svg" alt="" className="size-32" />
        <p className="mt-4 text-sm font-semibold text-rose-500">
          Your added items will appear here
        </p>
      </div>
    ): (
      <>
        <ul className="mt-2">
          {items.map((item) => (
            <CartItemRow key={item.id} item={item} onRemove={removeItem} />
          ))}
        </ul>

        <div className="flex items-center justify-between py-6">
          <p className="">Order Total</p>
          <p className="text-2xl font-bold">${cartTotal.toFixed(2)}</p>
        </div>

        <p className="flex items-center justify-center gap-2 rounded-lg bg-rose-50 p-4 text-sm">
          <img src="/images/icon-carbon-neutral.svg" alt="" />
          <span>
            This is a <strong>carbon-neutral</strong> delivery
          </span>
        </p>

      <button
        type="button"
        onClick={onConfirm}
        className="w-full rounded-full bg-brand py-4 font-semibold text-white transition-colors hover:bg-brand-dark"
      >
        Confirm Order
      </button>
      
      </>
    )}
    </aside>
  );
}