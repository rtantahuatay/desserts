import { z } from "zod";
import type { ProductInput } from "../interfaces/product";


export const PRODUCT_PHOTOS = [
    { value: "waffle", label: "Waffle" },
    { value: "creme-brulee", label: "Crème Brûlée" },
    { value: "macaron", label: "Macaron" },
    { value: "tiramisu", label: "Tiramisu" },
    { value: "baklava", label: "Baklava" },
    { value: "meringue", label: "Meringue Pie" },
    { value: "cake", label: "Cake" },
    { value: "brownie", label: "Brownie" },
    { value: "panna-cotta", label: "Panna Cotta" },
];

export const productSchema = z.object({
    name: z 
    .string()
    .trim()
    .min(3, "The name must have at least 3 characters")
    .max(60, "The name can have up to 60 characters"),
    category: z.string().min(1, "Select a category"),
    price: z.number({error: "Enter a valid price"})
            .positive("The price must be greater than 0"),
    photo: z.string().min(1, "Select a photo"),
});

export type ProductFormValues = z.infer<typeof productSchema>;

export function toProductInput(values: ProductFormValues): ProductInput {
    const { photo, ...product } = values;
    
    return {
        ...product,
        image: {
            thumbnail: `/images/image-${photo}-thumbnail.jpg`,
            mobile: `/images/image-${photo}-mobile.jpg`,
            tablet: `/images/image-${photo}-tablet.jpg`,
            desktop: `/images/image-${photo}-desktop.jpg`,
        },
    };
}