import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "./api/products";
import CartDrawer from "./components/CartDrawer";
import ConfirmOrderModal from "./components/ConfirmOrderModal";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";


export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: products = [], isPending, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <main className="mx-auto max-w-7xl p-6 lg:flex lg:items-start lg:gap-8 lg:p-10">
      <div className="lg:flex-1">
        <Header />

        { isPending && <p className="mt-8">Loading products...</p> }
        { isError && <p className="mt-8">Could not load the products.</p> }

       <section aria-label="Products" className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </div>

      <CartDrawer onConfirm={() => setIsModalOpen(true)} />
      <ConfirmOrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}