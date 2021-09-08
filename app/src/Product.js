import { gql, useMutation } from '@apollo/client';
// import { GET_CART } from './App';

const ADD_TO_CART = gql`
  mutation AddToCart($productId: Int!) {
    addToCart(productId: $productId) {
      count
      products {
        title
        price
      }
    }
  }
`;

export default function Product({ id, title, thumbnail, price, category }) {
const [addToCart] = useMutation(ADD_TO_CART, {
  refetchQueries: [
    // GET_CART,
    'GetCart'
  ],
})

  return (
    <div className='col-3'>
      <div className='card'>
        <img src={thumbnail} alt={title} className='card-img-top' />

        <div className='card-body'>
          <h3 className='card-title'>{title}</h3>
          <p>{`$ ${price}`}</p>
          {category?.title && (
            <p>
              <i>{category.title}</i>
            </p>
          )}
          <button type="button" class="btn btn-primary" onClick={() => addToCart({
            variables: { productId: id }
          })}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}
