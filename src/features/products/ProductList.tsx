import { useMemo } from 'react';
import { useGetProductsQuery } from '../../services/api';
import { ProductCard } from './ProductCard';
import { useAppSelector } from '../../hooks/redux-hooks';
import Filters from '../filters/Filters';

export default function ProductList() {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const { search, category, sort } = useAppSelector((state) => state.filters);

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let result = products;

    if (search || category.toLowerCase() !== 'all') {
      result = products.filter((item) => {
        const matchesSearch =
          !search || item.title.toLowerCase().includes(search.toLowerCase());
        const matchesCategory =
          category.toLowerCase() === 'all' ||
          item.category.toLowerCase() === category.toLowerCase();
        return matchesSearch && matchesCategory;
      });
    }

    if (sort && sort !== '') {
      return result.toSorted((a, b) =>
        sort === 'asc' ? a.price - b.price : b.price - a.price,
      );
    }

    //no sort selected so returning the filtered products as is
    return result;
  }, [search, products, category, sort]);

  if (isLoading)
    return (
      <h1 className='h-screen w-screen text-4xl text-center font-bold text-blue-600'>
        Loading ...
      </h1>
    );

  if (isError)
    return (
      <h1 className='h-screen w-screen text-4xl font-bold text-center text-red-600'>
        An error occured while fetching the products
      </h1>
    );

  return (
    <div className='h-full w-full flex flex-col justify-center items-center'>
      <Filters productCount={filteredProducts?.length} />
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6'>
        {filteredProducts?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}
