import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import type { Product } from '../../types/types';
import { addToCart } from '../cart/cartSlice';
import { useAppDispatch } from '../../hooks/redux-hooks';
export function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();

  function handleAddToCart(product: Product) {
    dispatch(addToCart(product));
    // toast message
  }

  return (
    <Card className='w-full max-w-sm overflow-hidden flex flex-col h-full'>
      <div className='relative aspect-square w-full overflow-hidden light:bg-gray-200 dark:bg-transparent'>
        <img
          src={product.image}
          alt={product.title}
          className='object-contain w-full h-full p-4 transition-transform duration-300 hover:scale-105'
        />
      </div>

      <CardHeader className='space-y-1'>
        <div className='flex justify-between items-start gap-2'>
          <CardTitle className='text-lg font-semibold line-clamp-2 leading-tight'>
            {product.title}
          </CardTitle>
        </div>
        <Badge
          variant='secondary'
          className='w-fit capitalize text-xs'
        >
          {product.category}
        </Badge>
      </CardHeader>

      <CardContent className='grow'>
        <p className='text-sm text-muted-foreground line-clamp-3'>
          {product.description}
        </p>
      </CardContent>

      <CardFooter className='flex items-center justify-between pt-4 border-t'>
        <span className='text-2xl font-bold'>${product.price}</span>
        <button
          className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 cursor-pointer'
          onClick={() => {
            console.log(product);
            return handleAddToCart(product);
          }}
        >
          Add to Cart
        </button>
      </CardFooter>
    </Card>
  );
}
