import Header from "./components/Header";
import { products } from "./data/products";

export default function App() {
  return (
    <main className="mx-auto max-w-7xl p-6 lg:p-10">   
      <Header />
      <ul className="mt-8">
        {products.map((product) => (
          <li key={product.id}>
            {product.name}: ${product.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </main>
  );
}