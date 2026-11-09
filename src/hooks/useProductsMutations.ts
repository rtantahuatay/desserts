import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "sonner";
import type { ProductInput } from "../interfaces/product";
import { createProduct, deleteProduct, updateProduct } from "../services/productsService";
import { useCartStore } from "../stores/cartStore";

export function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (product: ProductInput) => createProduct(product),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["products"]});
            toast.success("Product created");
        },
        onError: () => {
            toast.error("Could not create the product. Please try again.")
        }
    });
}

export function useUpdateProduct() {
    const queryClient = useQueryClient();
    const updateCartItem = useCartStore((state) => state.updateItem);

    return useMutation({
        mutationFn: ({ id, product }: { id: string; product: ProductInput }) => updateProduct(id, product),
        onSuccess: (updatedProduct) => {
            queryClient.setQueryData(["products", updatedProduct.id], updatedProduct);
            queryClient.invalidateQueries({ queryKey: ["products"] });
            updateCartItem(updatedProduct);
            toast.success("Product updated");
        },
        onError: () => {
            toast.error("Could not update the product. Please try again.");
        },
    });
}


export function useDeleteProduct() {
    const queryClient = useQueryClient();
    const removeCartItem = useCartStore((state) => state.removeItem);

    return useMutation({
        mutationFn: (id: string) => deleteProduct(id),
        onSuccess: (_data, id) => {
            queryClient.removeQueries({queryKey: ["products", id], exact: true});
            queryClient.invalidateQueries({queryKey: ["products"]});
            removeCartItem(id);
            toast.success("Product deleted");
        },
        onError: () => {
            toast.error("Could not delete the product. Please try again.")
        },
    });
}