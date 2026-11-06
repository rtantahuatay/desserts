import { useState } from "react";
import { useProducts } from "../hooks/useProductsQueries";
import CartDrawer from "../components/CartDrawer";
import ConfirmOrderModal from "../components/ConfirmOrderModal";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import ProductFilters from "../components/ProductFilters";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import Pagination from "../components/Pagination";
import { PRODUCTS_PER_PAGE } from "../services/productsService";


export default function HomePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);

    const debouncedSearch = useDebouncedValue(search.trim(), 400);

    const { data, isPending, isError, isPlaceholderData, refetch } = useProducts({
        search: debouncedSearch, 
        category,
        page,
    });

    const products = data?.data ?? [];
    const totalPages = data?.pages ?? 1;

    const isEmpty = !isPending && !isError && products.length === 0;

    function handleSearchChange(value: string){
        setSearch(value);
        setPage(1);
    }

    function handleCategoryChange(value: string) {
        setCategory(value);
        setPage(1);
    }

    function handlePageChange(newPage: number) {
        setPage(newPage);
        window.scrollTo({top: 0, behavior: "smooth"});
    }

    return (
        <main className="mx-auto max-w-7xl p-6 lg:flex lg:items-start lg:gap-8 lg:p-10">
            <div className="lg:flex-1">
                <Header />

                <ProductFilters 
                search={search}
                category={category}
                onSearchChange={handleSearchChange}
                onCategoryChange={handleCategoryChange}
                />

                { isPending && <p role="status" className="sr-only" >Loading products...</p> }
                { isError && (
                    <div role="alert" className="mt-8 rounded-xl bg-white p-6 text-center">
                        <p className="font-semibold">Could not load the products.</p>
                        <button type="button" onClick={()=> refetch()} className="mt-4 rounded-full bg-brand px-6 py-3 font-semibold text-white
                                transition-colors hover:bg-brand-dark">
                            Try again
                        </button>
                    </div>
                )}

                { isEmpty && (
                    <p className="mt-8 rounded-xl bg-white p-6 text-center text-rose-500">
                        No products found.
                    </p>
                )}

                <section aria-label="Products" aria-busy={isPlaceholderData} 
                className={`mt-8 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-3 ${isPlaceholderData ? "opacity-50" : ""}`}>
                    { isPending && 
                        Array.from({length: PRODUCTS_PER_PAGE}, (_, index) => <ProductCardSkeleton key={index} /> )}

                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </section>

                { !isPending && !isError && !isEmpty && (
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        isLoading={isPlaceholderData}
                        onPageChange={handlePageChange}
                     />

                )}



            </div>

            <CartDrawer onConfirm={() => setIsModalOpen(true)} />
            <ConfirmOrderModal isOpen={isModalOpen} onClose={()=> setIsModalOpen(false)} />
        </main>
    );
}