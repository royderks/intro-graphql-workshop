import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import Product from './Product';

const GET_PRODUCTS = gql`
  query GetProducts($limit: Int) {
    products(limit: $limit) {
      id
      title
      thumbnail
      price
      category {
        title
      }
    }
  }
`;

export const GET_CART = gql`
  query GetCart {
    cart {
      count
    }
  }
`;

export default function App() {
  const [limit, setLimit] = useState(null);
  const { loading, data } = useQuery(GET_PRODUCTS, {
    variables: { limit },
  });
  const { loading: loadingCart, data: cartData } = useQuery(GET_CART);

  return (
    <>
      <nav className='navbar navbar-light bg-light mb-4'>
        <div className='container-fluid'>
          <h2 className='navbar-brand'>My Shop</h2>
          {!loadingCart && <span>🛒 &nbsp; Cart ({cartData.cart.count})</span>}
        </div>
      </nav>
      <div className='container'>
        <h2>Products</h2>
        <div className='row mb-4'>
          <label>
            Limit results:&nbsp;
            <select
              name='limit'
              onChange={(e) => setLimit(parseInt(e.target.value))}
            >
              <option>Default</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
            </select>
          </label>
        </div>
        <div className='row'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            data.products.map((product) => (
              <Product
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                thumbnail={product.thumbnail}
                category={product.category}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
