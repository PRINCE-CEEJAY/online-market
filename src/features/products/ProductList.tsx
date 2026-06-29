import { useSelector } from 'react-redux';
import { useGetProductsQuery } from '../../services/api';
import { ProductCard } from './ProductCard';
export default function ProductList() {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const { cart } = useSelector((state) => state.cart);
  console.log(cart);

  if (isLoading)
    return (
      <h1 className='text-4xl text-center font-bold text-blue-600'>
        Loading ...
      </h1>
    );

  if (isError)
    return (
      <h1 className='text-4xl font-bold text-center text-red-600'>
        An error occured while fetching the products
      </h1>
    );
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6'>
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}
