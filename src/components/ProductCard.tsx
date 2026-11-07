import type { Product } from "../interfaces/product";
import { useCartStore } from "../stores/cartStore";
import { CartIcon } from "./icons";
import QuantityStepper from "./QuantityStepper";
import { Link } from "react-router";
import CategoryBadge from "./CategoryBadge";

type ProductCardProps = {
    product: Product;

};

export default function ProductCard({ product }: ProductCardProps) {

    const quantity = useCartStore(
        (state) => state.items.find((item) => item.id === product.id)?.quantity ?? 0,
    );
    const addItem = useCartStore((state) => state.addItem);
    const increaseQuantity = useCartStore((state) => state.increaseQuantity);
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

    const isInCart = quantity > 0;


    return (
        <article>
            <div className="relative mb-9">
                <picture>
                    <source media="(min-width: 1024px)" srcSet={product.image.desktop} />
                    <source media="(min-width: 768px)" srcSet={product.image.tablet} />
                    <img
                        src={product.image.mobile}
                        alt={product.name}
                        className={` w-full rounded-lg ring-brand ${isInCart ? " ring-2" : ""} `}
                    />
                </picture>

                <div className="absolute bottom-0 left-1/2 h-11 w-40 -translate-x-1/2 translate-y-1/2">
                {isInCart ? ( <QuantityStepper 
                                quantity={quantity}
                                onIncrease={()=> increaseQuantity(product.id)}
                                onDecrease={() => decreaseQuantity(product.id)}
                            /> 
                        ) : (
                    <button type="button" onClick={() => addItem(product)} className="flex h-full w-full items-center justify-center 
                            gap-2 rounded-full border border-rose-400 bg-white text-sm font-semibold transition-colors 
                            hover:border-brand hover:text-brand group-focus-within:opacity-0">
                        <CartIcon className="size-5 text-brand" />
                        Add to Cart
                    </button>
                )}
                </div>
            </div>

            <CategoryBadge name={product.category}/>
            <h2 className="mt-2 font-semibold">
                <Link to={`/producto/${product.id}`} className="hover:text-brand hover:underline">
                    {product.name}
                </Link>
            </h2>
            <p className="font-semibold text-brand">${product.price.toFixed(2)}</p>
        </article>
    );
}