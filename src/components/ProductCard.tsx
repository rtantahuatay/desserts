import type { Product } from "../data/products";
import { CartIcon } from "./icons";

type ProductCardProps = {
    product: Product;

};

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <article>
            <div className="relative mb-9">
                <picture>
                    <source media="(min-width: 1024px)" srcSet={product.image.desktop} />
                    <source media="(min-width: 768px)" srcSet={product.image.tablet} />
                    <img
                        src={product.image.mobile}
                        alt={product.name}
                        className="rounded-lg w-full"
                    />
                </picture>

                <button type="button" className="absolute bottom-0 left-1/2 flex h-11 w-40 -translate-x-1/2 
                translate-y-1/2 items-center justify-center gap-2 rounded-full border border-rose-400 bg-white 
                text-sm font-semibold transition-colors hover:border-brand hover:text-brand">
                    <CartIcon className="size-5 text-brand" />
                    Add to Cart
                </button>
            </div>

            <p className="text-sm text-rose-500">{product.category}</p>
            <h3 className="font-semibold">{product.name}</h3>
            <p className="font-semibold text-brand">${product.price.toFixed(2)}</p>
        </article>

    )
}