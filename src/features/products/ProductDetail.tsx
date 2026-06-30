import { useLocation } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { addToCart } from '../cart/cartSlice';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { Button } from '../../components/ui/button';

export default function ProductDetail() {
  const dispatch = useAppDispatch();
  const { state: product } = useLocation() || {};
  return (
    <Card className='min-h-screen w-full flex flex-col items-center text-center'>
      <CardTitle>
        <h1 className='fancy'>{product.title}</h1>
      </CardTitle>
      <div className='relative aspect-square overflow-hidden light:bg-gray-200 dark:bg-transparent'>
        <img
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className='object-contain w-full h-full p-4 transition-transform duration-300 hover:scale-105'
        />
      </div>

      <CardHeader className='space-y-1'>
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

      <CardFooter className='flex items-center justify-between pt-4 border-t w-sm'>
        <span className='text-2xl font-bold'>${product.price}</span>
        <Button onClick={() => dispatch(addToCart(product))}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
