import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from './cartSlice';
import { Card, CardHeader, CardTitle } from '../../components/ui/card';
import { Button, buttonVariants } from '../../components/ui/button';
import { Separator } from '../../components/ui/separator';
import { ScrollArea } from '../../components/ui/scroll-area';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';

const Cart = () => {
  const { cart: cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const totalPrice = useMemo(() => {
    return cartItems?.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }, [cartItems]);

  if (!cartItems || cartItems.length === 0) {
    return (
      <Card className='w-full max-w-4xl mx-auto p-8 text-center'>
        <div className='flex flex-col items-center justify-center gap-4 py-10'>
          <div className='bg-muted rounded-full p-4'>
            <ShoppingBag className='h-8 w-8 text-muted-foreground' />
          </div>
          <div className='space-y-2'>
            <h3 className='text-xl font-bold'>Your cart is empty</h3>
            <p className='text-muted-foreground'>
              Looks like you haven't added anything to your cart yet.
            </p>
          </div>
          <Link
            className={`mt-4 ${buttonVariants({ variant: 'secondary' })}`}
            to={'/'}
          >
            Start Shopping
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <Card className='w-full max-w-4xl mx-auto shadow-lg'>
      <CardHeader className='bg-muted/50 border-b px-6 py-4'>
        <CardTitle className='text-2xl font-bold'>
          Shopping Cart ({cartItems.length})
        </CardTitle>
      </CardHeader>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-6'>
        {/* Cart Items List */}
        <div className='lg:col-span-2'>
          <ScrollArea className='h-100 lg:h-125 w-full px-6 py-4'>
            <div className='space-y-6'>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className='flex gap-4 group'
                >
                  {/* Product Image */}
                  <div className='h-24 w-24 shrink-0 overflow-hidden rounded-md border bg-white'>
                    <img
                      src={item.image}
                      alt={item.title}
                      className='h-full w-full object-cover object-center'
                    />
                  </div>

                  {/* Product Details */}
                  <div className='flex flex-1 flex-col justify-between'>
                    <div>
                      <div className='flex justify-between'>
                        <h3 className='text-base font-semibold line-clamp-2 pr-4'>
                          {item.title}
                        </h3>
                        <p className='ml-4 text-base font-bold'>
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className='mt-1 text-sm text-muted-foreground'>
                        {item.category}
                      </p>
                    </div>

                    {/* Controls */}
                    <div className='flex items-center justify-between mt-4'>
                      <div className='flex items-center gap-2 rounded-md border'>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-8 w-8 rounded-none border-r'
                          onClick={() => dispatch(decrementQuantity(item))}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className='h-3 w-3' />
                        </Button>
                        <span className='w-8 text-center text-sm font-medium'>
                          {item.quantity}
                        </span>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-8 w-8 rounded-none border-l'
                          onClick={() => dispatch(incrementQuantity(item))}
                          disabled={item.quantity >= 100}
                        >
                          <Plus className='h-3 w-3' />
                        </Button>
                      </div>

                      <Button
                        variant='ghost'
                        size='sm'
                        className='text-muted-foreground hover:text-destructive hover:bg-destructive/10'
                        onClick={() => dispatch(removeFromCart(item))}
                      >
                        <Trash2 className='mr-2 h-4 w-4' />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Order Summary Sidebar */}
        <div className='bg-muted/30 p-6 lg:border-l'>
          <h3 className='text-lg font-bold'>Order Summary</h3>
          <Separator className='my-4' />

          <div className='space-y-3'>
            <div className='flex justify-between text-sm'>
              <span className='text-muted-foreground'>Subtotal</span>
              <span className='font-medium'>${totalPrice.toFixed(2)}</span>
            </div>
            <div className='flex justify-between text-sm'>
              <span className='text-muted-foreground'>Shipping</span>
              <span className='font-medium text-green-600'>Free</span>
            </div>
            <div className='flex justify-between text-sm'>
              <span className='text-muted-foreground'>Taxes</span>
              <span className='font-medium'>Calculated at checkout</span>
            </div>
          </div>

          <Separator className='my-6' />

          <div className='flex justify-between items-end mb-6'>
            <span className='text-base font-bold'>Total</span>
            <div className='text-right'>
              <span className='text-xs text-muted-foreground block'>USD</span>
              <span className='text-2xl font-bold'>
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          <Button
            className='w-full h-11 text-base font-semibold'
            size='lg'
          >
            Proceed to Checkout
          </Button>

          <p className='mt-4 text-xs text-center text-muted-foreground'>
            Secure checkout powered by Stripe
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Cart;
