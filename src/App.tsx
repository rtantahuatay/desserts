import { products } from "./data/products";

export default function App() {
  return (
    <main>
      <h1 className="text-[40px] font-bold">Desserts</h1>

      <ul>
        {}
        {}
        {products.map((product) => (
          <li key={product.id}>
            {}
            {product.name}: ${product.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </main>
  );
}