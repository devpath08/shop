// components/ProductList.tsx
import { createSignal, onCleanup } from 'solid-js';

interface Product {
  id: number;
  title: string;
  price: number;
}

export const ProductList = () => {
  const [products, setProducts] = createSignal<Product[]>([]);

  const fetchData = async (signal: AbortSignal) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products', { signal });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const abortController = new AbortController();

  onCleanup(() => {
    // Cleanup logic, if needed
    abortController.abort(); // Abort the fetch operation when the component is unmounted
  });

  fetchData(abortController.signal); // Pass the AbortSignal to the fetchData function

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products().map((product) => (
          <li key={product.id}>
            <strong>{product.title}</strong> - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Mount the component to an HTML element with id="app"
const root = document.getElementById('app');
if (root) {
  ProductList(); // SolidJS components are called as functions to mount them
}
