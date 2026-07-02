import { useGetProductsQuery } from '@/services/firebaseApi';

export default function AdminProducts() {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  if (isLoading) return <h1>'loading from firebase...'</h1>;

  if (isError) return <h1>Error</h1>;

  if (products) {
    return (
      <div>
        <h1>Products</h1>
      </div>
    );
  }
}
