import type { CartItem } from "../interfaces/cart";
import { CloseIcon } from "./icons";

type CartItemRowProps = {
    item: CartItem;
    onRemove: (id: string) => void;
};

export default function CartItemRow ({item, onRemove}: CartItemRowProps) {
    return ( 
        <li className="flex items-center justify-between gap-4 border-b border-rose-100 py-4">
            <div className="min-w-0">
                <p className="truncate text-sm font-semibold" >{item.name}</p>
                <p className="mt-2 text-sm">
                    <span className="mr-3 font-semibold text-brand" >{item.quantity}x</span>
                    <span className="mr-2 text-rose-500">@ ${item.price.toFixed(2)}</span>
                    <span className="font-semibold text-rose-500">${(item.price * item.quantity).toFixed(2)}</span>
                </p>
            </div>

            <button
                type="button"
                aria-label= {`Remove ${item.name}`}
                onClick={() => onRemove(item.id)}
                className="shrink-0 rounded-full border border-rose-400 p-1 text-rose-400 transition-colors hover:border-rose-900 hover:text-rose-900"
            >
                <CloseIcon className="size-2.5" />
            </button>
        </li>
    );
}