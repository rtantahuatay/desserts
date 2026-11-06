import { useQuery } from "@tanstack/react-query";
import type { ProductSearchParams } from "../interfaces/product";
import { getProductById, getProducts, isNotFoundError } from "../services/productsService";

export function useProducts(params: ProductSearchParams){
    return useQuery({
        queryKey: ["products", params],
        queryFn: () => getProducts(params),
    });

}


export function useProduct(id: string) {
        return useQuery({
            queryKey: ["products", id],
            queryFn: () => getProductById(id),
            retry: (failureCount, error) => !isNotFoundError(error) && failureCount < 1,
        });
}

