import { Link } from "react-router";
import { selectCartCount, useCartStore } from "../stores/cartStore";
import { CartIcon } from "./icons";


type HeaderProps = {
  onOpenCart: () => void;
};

export default function Header({onOpenCart}: HeaderProps) {

  const cartCount = useCartStore(selectCartCount);

  return (
    <header className="flex flex-wrap items-center justify-between gap-3">
      <h1 className="text-[40px] leading-tight font-bold">Desserts</h1>

      <div className="flex items-center gap-3">
        <Link to="/producto/nuevo" className="whitespace-nowrap rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark">
          New product
        </Link>

        <button type="button" aria-label={`Open cart, ${cartCount} items`} onClick={onOpenCart}
                className="relative rounded-full bg-white p-3 text-brand shadow-sm transition-colors hover:bg-brand hover:text-white lg:hidden">
          <CartIcon className="size-6" />

          <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-rose-900 text-xs font-semibold text-white">
            {cartCount}
          </span>
        </button>
      </div>
    </header>
  );
}