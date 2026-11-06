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