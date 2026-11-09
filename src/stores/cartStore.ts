import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "../interfaces/cart";
import type { Product } from "../interfaces/product";


interface CartState {
    items: CartItem[];
    addItem: (product: Product) => void;
    updateItem: (product: Product) => void;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: [],

            addItem: (product) =>
                set((state) => ({
                    items: [
                        ...state.items,
                        {
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            thumbnail: product.image.thumbnail,
                            quantity: 1,
                        },
                    ],
                })),

            updateItem: (product) =>
                set((state) => ({
                    items: state.items.map((item) =>
                    item.id === product.id ? { ...item, name: product.name, price: product.price, thumbnail: product.image.thumbnail }
                    : item,
                ),

                })),

            increaseQuantity: (id) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
                    ),
                })),

            decreaseQuantity: (id) =>
                set((state) => ({
                    items: state.items
                        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
                        .filter((item) => item.quantity > 0),
                })),

            removeItem: (id) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                })),

            clearCart: () => set({ items: [] }),
        }),
        { name: "desserts-cart" },
    ),
);


export const selectCartCount = (state: CartState) =>
    state.items.reduce((count, item) => count + item.quantity, 0);

export const selectCartTotal = (state: CartState) =>
    state.items.reduce((total, item) => total + item.price * item.quantity, 0);


