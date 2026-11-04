import Header from "./components/Header";
import { products } from "./data/products";
import ProductCard from "./components/ProductCard";

export default function App() {
  return (
    <main className="mx-auto max-w-7xl p-6 lg:p-10">   
      <Header />
      <section aria-label="Products" className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-3" >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}