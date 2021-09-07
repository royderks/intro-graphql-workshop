import { gql, useQuery } from '@apollo/client';
import Product from './Product';

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      title
      thumbnail
      price
    }
  }
`;

export default function App() {
  const { loading, data } = useQuery(GET_PRODUCTS);

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
            data.products.map((product) => (
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
