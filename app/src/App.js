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
  );
}
