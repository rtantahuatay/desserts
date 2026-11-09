export type ProductImage = {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
};

export type Product = {
    id: string;
    name: string;
    category: string;
    price: number;
    image: ProductImage;
};

export interface ProductSearchParams {
    search: string;
    category: string;
}

export interface ProductQueryParams extends ProductSearchParams {
    page: number;
}

export interface PaginatedResponse<T> {
    first: number;
    prev: number | null; 
    next: number | null;
    last: number;
    pages: number;
    items: number;
    data: T[];
}

export type ProductInput = Omit<Product, "id">;