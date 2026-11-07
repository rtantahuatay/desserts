import { selectCartCount, useCartStore } from "../stores/cartStore";

type CartDrawerProps = {
  onConfirm: () => void;
};

export default function CartDrawer({ onConfirm }: CartDrawerProps) {

  const cartCount = useCartStore(selectCartCount);
  
  return (
    <aside
      aria-label="Shopping cart"
      className="mt-8 rounded-xl bg-white p-6 lg:sticky lg:top-8 lg:mt-0 lg:w-80 lg:shrink-0 xl:w-96"
    >
      <h2 className="text-2xl font-bold text-brand">Your Cart ({cartCount})</h2>

      <div className="flex flex-col items-center py-6 text-center">
        <img src="/images/illustration-empty-cart.svg" alt="" className="size-32" />
        <p className="mt-4 text-sm font-semibold text-rose-500">
          Your added items will appear here
        </p>
      </div>

      <button
        type="button"
        onClick={onConfirm}
        className="w-full rounded-full bg-brand py-4 font-semibold text-white transition-colors hover:bg-brand-dark"
      >
        Confirm Order
      </button>
    </aside>
  );
}