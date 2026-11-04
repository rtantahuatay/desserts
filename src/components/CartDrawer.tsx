import { CloseIcon } from "./icons";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function CartDrawer({ isOpen, onClose, onConfirm }: CartDrawerProps) {
    return (
        <>
        <div onClick={onClose} className={` fixed inset-0 z-10 bg-black/50 transition-opacity lg:hidden 
            ${isOpen ? "opacity-100": "pointer-events-none opacity-0"} `}  />

        <aside aria-label="Shopping cart" className={` fixed inset-y-0 right-0 z-20 w-full max-w-sm overflow-y-auto bg-white p-6
            transition-[translate,visibility] lg:sticky lg:inset-auto lg:top-8 lg:z-auto lg:w-96 lg:shrink-0 lg:translate-x-0
            lg:rounded-xl lg:visible ${isOpen ? "visible translate-x-0" : "invisible translate-x-full"} `} >
            
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-brand">Your Cart (0)</h2>
                <button type="button" aria-label="Close cart" onClick={onClose}
                className="rounded-full border border-rose-400 p-1.5 text-rose-400 transition-colors hover:border-rose-900 hover:text-rose-900 lg:hidden">
                    <CloseIcon className="size-3" />
                </button>
            </div>

            <div className="flex flex-col items-center py-6 text-center">
                <img src="/images/illustration-empty-cart.svg" alt="" className="size-32" />
                <p className="mt-4 text-sm font-semibold text-rose-500">
                    Your added items will appear here. Start shopping to fill it in.
                </p>
            </div>

            <button type="button" onClick={onConfirm} className="w-full rounded-full bg-brand py-4 font-semibold text-white transition-colors
                hover:bg-brand-dark">
                Confirm Order
            </button>

        </aside>
        </>
    );
}