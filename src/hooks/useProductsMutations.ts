import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "sonner";
import type { ProductInput } from "../interfaces/product";
import { createProduct, deleteProduct, updateProduct } from "../services/productsService";

export function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (product: ProductInput) => createProduct(product),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["products"]});
            toast.success("Product created");
        },
        onError: () => {
            toast.error("Could not create the product. Please try again")
        }
    });
}

export function useUpdateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, product }: { id: string; product: ProductInput }) => updateProduct(id, product),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Product updated");
        },
        onError: () => {
            toast.error("Could not update the product. Please try again.");
        },
    });
}

export function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["products"]});
            toast.success("Product deleted");
        },
        onError: () => {
            toast.error("Could not delete the product. Please try again...");
        },
    });
}