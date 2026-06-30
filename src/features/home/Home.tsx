import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '../../components/ui/carousel';
import { useGetProductsQuery } from '../../services/api';
import ProductList from '../products/ProductList';

export default function Home() {
  const navigate = useNavigate();
  const { data: products = [] } = useGetProductsQuery();
  const featuredProducts = products.slice(0, 6);
  const [api, setApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!api) return;

    const autoplayId = window.setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => window.clearInterval(autoplayId);
  }, [api]);

  return (
    <div className='space-y-8 p-4'>
      <section className='rounded-3xl bg-linear-to-r from-primary/10 via-background to-secondary/10 p-3'>
        <div className='mb-4 px-2'>
          <p className='text-sm font-semibold text-primary'>
            Shopping spotlight
          </p>
          <h2 className='text-2xl font-bold tracking-tight'>Trending picks</h2>
        </div>

        <Carousel
          setApi={setApi}
          opts={{ loop: true }}
          className='w-full'
        >
          <CarouselContent className='-ml-2'>
            {featuredProducts.map((product) => (
              <CarouselItem
                key={product.id}
                className='pl-2 md:basis-1/2 lg:basis-1/3'
              >
                <Card className='overflow-hidden border-0 shadow-md'>
                  <div className='relative aspect-4/3 bg-muted'>
                    <img
                      src={product.image}
                      alt={product.title}
                      className='h-full w-full object-contain p-4'
                    />
                    <div className='absolute inset-0 bg-linear-to-t from-black/65 via-black/20 to-transparent' />

                    <div className='absolute inset-x-0 bottom-0 p-4 text-white'>
                      <Badge className='mb-2 bg-white/90 text-foreground capitalize'>
                        {product.category}
                      </Badge>
                      <h3 className='text-lg font-semibold leading-tight'>
                        {product.title}
                      </h3>
                      <p className='mt-1 line-clamp-2 text-sm text-white/80'>
                        {product.description}
                      </p>

                      <div className='mt-4 flex items-center justify-between gap-3'>
                        <span className='text-lg font-bold'>
                          ${product.price}
                        </span>
                        <Button
                          size='sm'
                          onClick={() =>
                            navigate('/products/detail', { state: product })
                          }
                        >
                          Shop now
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className='left-2' />
          <CarouselNext className='right-2' />
        </Carousel>
      </section>

      <ProductList />
    </div>
  );
}
