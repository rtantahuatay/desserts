import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { getProductById, isNotFoundError } from "../api/products";
import NotFoundMessage from "../components/NotFoundMessage";
import ProductDetailSkeleton from "../components/ProductDetailSkeleton";


export default function ProductDetailPage(){

    const { id = "" } = useParams();

    const { data: product, isPending, isError, error, refetch } = useQuery({
        queryKey: ["products", id],
        queryFn: () => getProductById(id),
        retry: (failureCount, error) => !isNotFoundError(error) && failureCount < 1,
    });

    const isNotFound = isNotFoundError(error);

    return (
        <main className="mx-auto max-w-4xl p-6 lg:p-10">
            <Link to="/" className="font-semibold text-brand hover:underline">
                ← Back to products
            </Link>

            {isPending && (
                <>
                <p role="status" className="sr-only">Loading product...</p>
                <ProductDetailSkeleton/>
                </>
            )}

            {isNotFound && <NotFoundMessage message="This product does not exist."  />}

            {isError && !isNotFound && (
                <div role="alert" className="mt-8 rounded-xl bg-white p-6 text-center">
                    <p className="font-semibold">Could not load the product.</p>
                    <button type="button" onClick={() => refetch()} className="mt-4 rounded-full bg-brand px-6 py-3 font-semibold text-white
                            transition-colors hover:bg-brand-dark">
                    Try again
                    </button>
                </div>
            )}

            {product && (
                <article className="mt-8 grid gap-8 md:grid-cols-2 md:items-center">
                    <picture>
                        <source media="(min-width: 1024px)" srcSet={product.image.desktop} />
                        <source media="(min-width: 768px)" srcSet={product.image.tablet} />
                        <img src={product.image.mobile} alt={product.name} className="w-full rounded-lg" />
                    </picture>

                    <div>
                        <p className="text-rose-500">{product.category}</p>
                        <h1 className="mt-1 text-[40px] leading-tight font-bold">{product.name}</h1>
                        <p className="mt-4 text-2xl font-semibold text-brand">${product.price.toFixed(2)}</p>
                    </div>
                </article>
            )}
        </main>
    )


}