import type { Product } from "../interfaces/product";
import { CartIcon } from "./icons";
import QuantityStepper from "./QuantityStepper";
import { Link } from "react-router";

type ProductCardProps = {
    product: Product;

};

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <article>
            <div tabIndex={-1} className="group relative mb-9 outline-none">
                <picture>
                    <source media="(min-width: 1024px)" srcSet={product.image.desktop} />
                    <source media="(min-width: 768px)" srcSet={product.image.tablet} />
                    <img
                        src={product.image.mobile}
                        alt={product.name}
                        className="rounded-lg w-full ring-brand group-focus-within:ring-2"
                    />
                </picture>

                <div className="absolute bottom-0 left-1/2 h-11 w-40 -translate-x-1/2 translate-y-1/2">

                <button type="button" className="flex h-full w-full items-center justify-center 
                        gap-2 rounded-full border border-rose-400 bg-white text-sm font-semibold transition-colors 
                        hover:border-brand hover:text-brand group-focus-within:opacity-0">
                    <CartIcon className="size-5 text-brand" />
                    Add to Cart
                </button>
                <QuantityStepper quantity={1} 
                className=" pointer-events-none absolute inset-0 opacity-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 " />

                </div>
            </div>

            <p className="text-sm text-rose-500">{product.category}</p>
            <h2 className="font-semibold">
                <Link to={`/producto/${product.id}`} className="hover:text-brand hover:underline">
                    {product.name}
                </Link>
            </h2>
            <p className="font-semibold text-brand">${product.price.toFixed(2)}</p>
        </article>

    );
}