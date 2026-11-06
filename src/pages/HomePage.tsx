import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";
import CartDrawer from "../components/CartDrawer";
import ConfirmOrderModal from "../components/ConfirmOrderModal";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import ProductFilters from "../components/ProductFilters";
import { useDebouncedValue } from "../hooks/useDebouncedValue";


export default function HomePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const debouncedSearch = useDebouncedValue(search.trim(), 400);

    const { data: products = [], isPending, isError, refetch } = useQuery({
        queryKey: ["products", {search: debouncedSearch, category}],
        queryFn: () => getProducts({search: debouncedSearch, category})
    });

    const isEmpty = !isPending && !isError && products.length === 0;

    return (
        <main className="mx-auto max-w-7xl p-6 lg:flex lg:items-start lg:gap-8 lg:p-10">
            <div className="lg:flex-1">
                <Header />

                <ProductFilters 
                search={search}
                category={category}
                onSearchChange={setSearch}
                onCategoryChange={setCategory}
                />

                { isPending && <p role="status" className="sr-only" >Loading products...</p> }
                { isError && (
                    <div role="alert" className="mt-8 rounded-xl bg-white p-6 text-center">
                        <p className="font-semibold">Could not load the products.</p>
                        <button type="button" onClick={()=> refetch()} className="mt-4 rounded-full bg-brand px-6 py-3 font-semibold text-white
                                transition-colors hover:bg-brand-dark">
                            Try again!
                        </button>
                    </div>
                )}

                { isEmpty && (
                    <p className="mt-8 rounded-xl bg-white p-6 text-center text-rose-500">
                        No products found.
                    </p>
                )}

                <section aria-label="Products" className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-3">
                    { isPending && 
                        Array.from({length: 9}, (_, index) => <ProductCardSkeleton key={index} /> )}

                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />

                    ))}
                </section>
            </div>

            <CartDrawer onConfirm={() => setIsModalOpen(true)} />
            <ConfirmOrderModal isOpen={isModalOpen} onClose={()=> setIsModalOpen(false)} />
        </main>
    );
}