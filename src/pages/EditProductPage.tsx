import { Link, useNavigate, useParams } from "react-router";
import NotFoundMessage from "../components/NotFoundMessage";
import ProductForm from "../components/ProductForm";
import { useUpdateProduct } from "../hooks/useProductsMutations";
import { useProduct } from "../hooks/useProductsQueries";
import { toProductFormValues, toProductInput, type ProductFormValues } from "../schemas/productSchema";
import { isNotFoundError } from "../services/productsService";


export default function EditProductPage() {
    const { id= ""} = useParams();
    const navigate = useNavigate();

    const { data: product, isPending, error, refetch} = useProduct(id);
    const updateMutation = useUpdateProduct();

    const isNotFound = isNotFoundError(error);

    function handleSubmit(values: ProductFormValues) {
        updateMutation.mutate(
            {id, product: toProductInput(values)},
            {onSuccess: ()=> navigate(`/producto/${id}`)},
        );
    }

    return (
        <main className="mx-auto max-w-xl p-6 lg:p-10">
            <Link to={`/producto/${id}`} className="font-semibold text-brand hover:underline">
                ← Back to product
            </Link>

            <h1 className="mt-6 text-[40px] leading-tight font-bold">Edit product</h1>

            {isPending && <p role="status" className="mt-8 text-rose-500">Loading product...</p>}

            {!product && isNotFound && <NotFoundMessage message="This product does not exist." />}

            {!product && error && !isNotFound && (
                <div role="alert" className="mt-8 rounded-xl bg-white p-6 text-center" >
                    <p className="font-semibold">Could not load the product.</p>
                    <button type="button" onClick={() => refetch()} className="mt-4 rounded-full bg-brand px-6 py-3 font-semibold text-white
                            transition-colors hover:bg-brand-dark">
                        Try again
                    </button>
                </div>
            )}
            
            {product && (
                <ProductForm
                    defaultValues={toProductFormValues(product)}
                    submitLabel="Save changes"
                    isSubmitting={updateMutation.isPending}
                    onSubmit={handleSubmit}
                />
            )}
        </main>
    );
}