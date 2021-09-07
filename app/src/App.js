import { useEffect, useState } from 'react';
import Product from './Product';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await fetch('http://localhost:4000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query {
              products {
                id
                title
                thumbnail
                price
              }
            }
        `,
        }),
      });

      const { data } = await result.json();

      setProducts(data.products);
      setLoading(false);
    }

    fetchData();
  }, [products.length]);

  return (
    <>
      <nav className='navbar navbar-light bg-light mb-4'>
        <div className='container-fluid'>
          <h2 className='navbar-brand'>My Shop</h2>
          <span>🛒 &nbsp; Cart (0)</span>
        </div>
      </nav>
      <div class='container'>
        <h2>Products</h2>
        <div className='row'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            products.map((product) => (
              <Product
                key={product.id}
                title={product.title}
                price={product.price}
                thumbnail={product.thumbnail}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
