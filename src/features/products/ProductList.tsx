import { useGetProductsQuery } from '../../services/api';
export default function ProductList() {
  const { data: products } = useGetProductsQuery();

  console.log(products);
  return <div>Product List</div>;
}
