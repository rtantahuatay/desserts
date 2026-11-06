import axios from "axios";
import type { Product, ProductSearchParams } from "../interfaces/product";
import { api } from "./api";


function wait(milliseconds: number){
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function getProducts({ search, category }: ProductSearchParams): Promise<Product[]> {
    await wait(1200);
    const response = await api.get<Product[]>("/products", {
        params: {
            "name:contains": search || undefined,
            category: category || undefined,
        },
    });
    return response.data;
}

export async function getProductById(id: string): Promise<Product> {
    await wait(1200);
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
    
}

export function isNotFoundError(error: unknown) {
    return axios.isAxiosError(error) && error.response?.status === 404;
}
