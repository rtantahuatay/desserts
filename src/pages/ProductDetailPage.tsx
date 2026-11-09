import { Link, useParams } from "react-router";
import { useProduct } from "../hooks/useProductsQueries";
import { isNotFoundError } from "../services/productsService";
import NotFoundMessage from "../components/NotFoundMessage";
import ProductDetailSkeleton from "../components/ProductDetailSkeleton";
import CategoryBadge from "../components/CategoryBadge";


export default function ProductDetailPage(){

    const { id = "" } = useParams();

    const { data: product, isPending, isError, error, refetch } = useProduct(id);

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
                        <CategoryBadge name={product.category} />
                        <h1 className="mt-3 text-[40px] leading-tight font-bold">{product.name}</h1>
                        <p className="mt-4 text-2xl font-semibold text-brand">${product.price.toFixed(2)}</p>
                        <Link to={`/producto/${product.id}/editar`} className="mt-6 inline-block rounded-full border border-brand px-6 py-3 font-semibold text-brand
                                transition-colors hover:bg-brand hover:text-white">
                            Edit product
                        </Link>
                    </div>
                </article>
            )}
        </main>
    )


}