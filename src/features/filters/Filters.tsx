import { ArrowDownAz, ArrowDownZA } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { setCategory, setSortPrice } from './filterSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';

export default function Filters({
  productCount,
}: {
  productCount: number | undefined;
}) {
  const dispatch = useAppDispatch();
  const { category } = useAppSelector((state) => state.filters);

  function sortAsc() {
    dispatch(setSortPrice('asc'));
  }

  function sortDesc() {
    dispatch(setSortPrice('desc'));
  }

  return (
    <Card className='w-full'>
      <CardTitle className='text-center text-xl font-bold'>
        Sort and Filter
      </CardTitle>
      <CardDescription className='text-center italic'>
        Filter the categories of the displayed products as well as sort in
        ascending or descending price
      </CardDescription>
      <CardContent className='flex items-center justify-evenly'>
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
        <section className='flex items-center gap-6 '>
          <Button
            className='cursor-pointer py-6 px-1 scale-150 '
            variant={'outline'}
            onClick={sortAsc}
          >
            <ArrowDownAz size={50} />
          </Button>
          <Button
            className='cursor-pointer py-6 px-1 scale-150 '
            variant={'outline'}
            onClick={sortDesc}
          >
            <ArrowDownZA />
          </Button>
        </section>
      </CardContent>
    </Card>
  );
}
