import { useGetProductsQuery } from '@/services/firebaseApi';

export default function AdminProducts() {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  if (isLoading) return console.log('loading from firebase...');

  if (isError) return null;

  console.log(products);

  return (
    <div>
      <h1>Products</h1>
    </div>
  );
}
