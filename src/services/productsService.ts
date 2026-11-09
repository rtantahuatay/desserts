import axios from "axios";
import type { PaginatedResponse, Product, ProductInput, ProductQueryParams } from "../interfaces/product";
import { api } from "./api";
import { create } from 'zustand';



export const PRODUCTS_PER_PAGE = 8;


function wait(milliseconds: number){
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function createProduct(product: ProductInput):Promise<Product> {
    const response = await api.post<Product>("/products", product);
    return response.data;    
}

export async function updateProduct(id:string, product: ProductInput): Promise<Product> {
    const response = await api.put<Product>(`/products/${id}`, product);
    return response.data;
}

export async function deleteProduct(id:string): Promise<void> {
    await api.delete(`/products/${id}`);
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
