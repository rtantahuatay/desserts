import axios from "axios";
import type { PaginatedResponse, Product, ProductQueryParams } from "../interfaces/product";
import { api } from "./api";


export const PRODUCTS_PER_PAGE = 8;


function wait(milliseconds: number){
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function getProducts({ search, category, page }: ProductQueryParams): Promise<PaginatedResponse<Product>> {

    
    await wait(1200);
    const response = await api.get<PaginatedResponse<Product>>("/products", {
        params: {
            "name:contains": search || undefined,
            category: category || undefined,
            _page: page,
            _per_page: PRODUCTS_PER_PAGE,
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
