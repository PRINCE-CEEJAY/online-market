import { ArrowUpDown } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { setCategory } from './filterSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';

export default function Filters({
  productCount,
}: {
  productCount: number | undefined;
}) {
  const dispatch = useAppDispatch();
  const { category } = useAppSelector((state) => state.filters);

  return (
    <Card className='w-full'>
      <CardTitle className='text-center text-xl font-bold'>
        Sort and Filter
      </CardTitle>
      <CardDescription className='text-center italic'>
        Filter the categories of the displayed products as well as sort in
        ascending or descending price
      </CardDescription>
      <CardContent className='flex items-center justify-between'>
        <select
          className='w-sm p-2 rounded-md font-bold cursor-pointer bg-secondary'
          value={category}
          onChange={(e) => dispatch(setCategory(e.target.value))}
        >
          <option value={'all'}>All</option>
          <option value={"men's clothing"}>mens' clothing</option>
          <option value={"women's clothing"}>Women's clothing</option>
          <option value={'jewelery'}>Jewelery</option>
          <option value={'electronics'}>electronics</option>
        </select>
        <h1 className='text-center text-xl font-bold'>
          Product Count: {productCount}
        </h1>
        <Button
          className='cursor-pointer w-32'
          variant={'outline'}
        >
          <ArrowUpDown />
        </Button>
      </CardContent>
    </Card>
  );
}
