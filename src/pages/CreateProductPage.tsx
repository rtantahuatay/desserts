import { Link, useNavigate } from "react-router";
import ProductForm from "../components/ProductForm";
import { useCreateProduct } from "../hooks/useProductsMutations";
import { toProductInput, type ProductFormValues } from "../schemas/productSchema";

export default function CreateProductPage() {
    const navigate = useNavigate();
    const createMutation = useCreateProduct();

    function handleSubmit(values: ProductFormValues){
        createMutation.mutate(toProductInput(values), {
            onSuccess: () => navigate("/"),
        });
    }

    return (
        <main className="mx-auto max-w-xl p-6 lg:p-10">
            <Link to="/" className="font-semibold text-brand hover:underline">
                ← Back to products
            </Link>

            <h1 className="mt-6 text-[40px] leading-tight font-bold">New Product</h1>

            <ProductForm 
                submitLabel="Create product"
                isSubmitting={createMutation.isPending}
                onSubmit={handleSubmit}
            />
        </main>
    );
}
