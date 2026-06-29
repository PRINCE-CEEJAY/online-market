import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from './cartSlice';

const Cart = () => {
  const { cart: cartItems } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();

  const totalPrice = cartItems?.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  if (cartItems?.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div
      style={{ border: '1px solid #ccc', padding: '1rem', marginTop: '1rem' }}
    >
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems?.map((item) => (
          <li
            key={item.id}
            style={{ marginBottom: '1rem' }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{ width: '50px', marginRight: '10px' }}
            />
            <span>{item.title}</span>
            <span> - ${item.price}</span>
            <div style={{ marginLeft: '10px' }}>
              <button onClick={() => dispatch(decrementQuantity(item))}>
                -
              </button>
              <span style={{ margin: '0 10px' }}>{item.quantity}</span>
              <button onClick={() => dispatch(incrementQuantity(item))}>
                +
              </button>
            </div>
            <button
              onClick={() => dispatch(removeFromCart(item))}
              style={{ marginLeft: '10px', color: 'red' }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <h3>Total: ${totalPrice?.toFixed(2)}</h3>
    </div>
  );
};

export default Cart;
