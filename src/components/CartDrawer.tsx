import { useEffect } from "react";
import { selectCartCount, selectCartTotal, useCartStore } from "../stores/cartStore";
import CartItemRow from "./CartItemRow";
import { CloseIcon } from "./icons";


type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function CartDrawer({ isOpen, onClose, onConfirm }: CartDrawerProps) {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const cartCount = useCartStore(selectCartCount);
  const cartTotal = useCartStore(selectCartTotal);

  const isEmpty = items.length === 0;

  useEffect( () => {
    if (!isOpen) return;

    function handleKeyDown (event: KeyboardEvent){
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown" ,handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);
  
  return (
    <>
<div onClick={onClose} className={`fixed inset-0 z-10 bg-black/50 transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

    <aside arial-label="Shopping cart" className={ ` fixed inset-y-0 right-0 z-20 w-full max-w-sm overflow-y-auto bg-white p-6 transition-[translate,visibility]
      lg:visible lg:sticky lg:inset-auto lg:top-8 lg:z-auto lg:w-80 lg:shrink-0 lg:translate-x-0 lg:rounded-xl xl:w-96
      ${isOpen ? "visible translade-x-0" : "invisible translate-x-full"} ` } >

      <div className="flex items-center justity-between">
        <h2 className="text 2xl font-bold text-brand">Your Cart ({cartCount})</h2>

      <button type="button" arial-label="Close cart" 
              onClick={onClose} 
              className="rounded-full border border-rose-400 p-1.5 text-rose-400 transition-colors hover:boder-rose-900 hover:text-rose-900 lg:hidden">
        <CloseIcon className="size-3" />
      </button>
      </div>

      {isEmpty ? (
        <div className="flex flex-col items-center py-6 text-center">
          <img src="/images/illustration-empty-cart.svg" alt="" className="size-32" />
          <p className="mt-4 text-sm font-semibold text-rose-500">
            Your added items will appear here
          </p>
        </div>
      ) : (
        <>
          <ul className="mt-2">
            {items.map((item) => (
              <CartItemRow key={item.id} item={item} onRemove={removeItem} />
            ))}
          </ul>

          <div className="flex items-center justify-between py-6">
            <p className="text-sm">Order Total</p>
            <p className="text-xl font-bold">${cartTotal.toFixed(2)}</p>
          </div>  

          <p className="flex items-center justity-center gap-2 rounded-lg bg-rose-50 p-4 text-sm">
            <img src="/images/icon-carbon-neutral.svg" alt="" />
            <span>
              This is a <strong className="font-semibold">carbon-neutral</strong> delivery
            </span>
          </p>

          <button type="button" onClick={onConfirm} className="mt-6 w-full rounded-full bg-brand py-4 font-semibold text-white
          transition colors hover:bg-brand-dark">
            Confirm Order
          </button>
        </>
      ) }
    </aside>
    </>
  );
}