import axios from "axios";
import type { Product } from "../types/product";

const api = axios.create({
    baseURL: "http://localhost:3000"
});

function wait(milliseconds: number){
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

type ProductFilters = {
    search: string;
    category: string;
};

export async function getProducts({ search, category }: ProductFilters): Promise<Product[]> {
    await wait(1200);
    const response = await api.get<Product[]>("/products", {
        params: {
            "name:contains": search || undefined,
            category: category || undefined,
        },
    });
    return response.data;
}