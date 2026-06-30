import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Search,
  User,
  Menu,
  ShoppingBasketIcon,
} from 'lucide-react';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';
import { ModeToggle } from './mode-toggle';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { useDebouncedSearch } from '../hooks/useDebouncedSearch';
import { setSearch } from '../features/filters/filterSlice';
const categories = [
  { title: 'New Arrivals', to: '/new' },
  { title: 'Best Sellers', to: '/bestsellers' },
  // { title: 'Men', to: '/men' },
  // { title: 'Women', to: '/women' },
  // { title: 'Accessories', to: '/accessories' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { cart: cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebouncedSearch(searchInput);

  const totalCart = cartItems?.length || 0;

  useEffect(() => {
    dispatch(setSearch(debouncedSearch));
  }, [dispatch, debouncedSearch]);

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>
      {/* Promo Banner */}
      <div className='bg-primary text-primary-foreground py-2 text-center text-sm font-medium'>
        Free shipping on orders over $75
      </div>

      <div className='container flex h-16 items-center justify-between'>
        {/* Mobile Menu */}
        <Sheet
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <SheetTrigger asChild>
            <Button
              variant='ghost'
              className='mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden'
            >
              <Menu className='h-6 w-6' />
              <span className='sr-only'>Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side='left'
            className='pr-0'
          >
            <Link
              to='/'
              className='flex items-center'
              onClick={() => setIsOpen(false)}
            >
              <span className='font-bold'>
                <ShoppingBasketIcon size={50} />
              </span>
            </Link>
            <nav className='mt-8 flex flex-col gap-4'>
              {categories.map((cat) => (
                <Link
                  key={cat.to}
                  to={cat.to}
                  className='text-lg font-medium'
                >
                  {cat.title}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link
          to='/'
          className='flex items-center space-x-2'
        >
          <span className='font-bold text-xl hidden md:flex items-center'>
            <ShoppingBasketIcon size={50} />
            <h1 className='fancy'>Cee-Shopify</h1>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className='hidden md:flex mx-4'>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid w-100 gap-3 p-4 md:w-125 md:grid-cols-2 lg:w-150'>
                  {categories.map((cat) => (
                    <li key={cat.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={cat.to}
                          className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                        >
                          <div className='text-sm font-medium leading-none'>
                            {cat.title}
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Search Bar */}
        <div className='hidden md:flex flex-1 items-center justify-center px-4 max-w-sm'>
          <div className='relative w-full'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type='search'
              placeholder='Search products...'
              className='w-full pl-8'
            />
          </div>
        </div>

        {/* Actions */}
        <div className='flex items-center gap-2'>
          <ModeToggle />
          <Button
            variant='ghost'
            size='icon'
          >
            <User className='h-5 w-5' />
          </Button>

          <Button
            variant='ghost'
            size='icon'
            className='relative'
            onClick={() => navigate('/cart')}
          >
            <ShoppingCart className='h-5 w-5' />
            <Badge className='absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs'>
              {totalCart}
            </Badge>
          </Button>
        </div>
      </div>
    </header>
  );
}
