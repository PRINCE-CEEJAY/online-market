import { Routes, Route } from 'react-router-dom';
import Home from './features/home/Home';
import Cart from './features/cart/Cart';
import Users from './features/users/Users';
import NotFound from './features/NotFound';
import ProductDetail from './features/products/ProductDetail';
export default function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={<Home />}
      />
      <Route
        path='/products/detail'
        element={<ProductDetail />}
      />
      <Route
        path='/users'
        element={<Users />}
      />
      <Route
        path='/cart'
        element={<Cart />}
      />
      <Route
        path='*'
        element={<NotFound />}
      />
    </Routes>
  );
}
