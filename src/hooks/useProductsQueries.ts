import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ProductQueryParams } from "../interfaces/product";
import { getProductById, getProducts, isNotFoundError } from "../services/productsService";

export function useProducts(params: ProductQueryParams){
    return useQuery({
        queryKey: ["products", params],
        queryFn: () => getProducts(params),
        placeholderData: keepPreviousData,
    });
}


export function useProduct(id: string) {
        return useQuery({
            queryKey: ["products", id],
            queryFn: () => getProductById(id),
            retry: (failureCount, error) => !isNotFoundError(error) && failureCount < 1,
        });
}


