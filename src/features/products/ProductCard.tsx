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
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { Button } from '../../components/ui/button';
export function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);

  function handleAddToCart(product: Product) {
    dispatch(addToCart(product));
    // toast message
  }

  return (
    <Card
      className='w-full max-w-sm overflow-hidden flex flex-col h-full'
      onClick={() => navigate('/products/detail', { state: product })}
    >
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
        <Button
          ref={ref}
          onClick={(e) => {
            // console.log(product);
            e.stopPropagation();
            return handleAddToCart(product);
          }}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
