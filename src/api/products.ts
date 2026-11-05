import axios from "axios";
import type { Product } from "../types/product";

const api = axios.create({
    baseURL: "http://localhost:3000"
});

function wait(milliseconds: number){
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function getProducts(): Promise<Product[]> {
    await wait(1200);
    const response = await api.get<Product[]>("/products");
    return response.data;
}