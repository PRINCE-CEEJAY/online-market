import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const productSchema = z.object({
  title: z.string().min(1, 'Product name is required'),
  price: z
    .number({ invalid_type_error: 'Price is required' })
    .positive('Price must be greater than 0'),
  category: z.string().min(1, 'Please select a category'),
  image: z
    .any()
    .refine((file) => file instanceof File, 'Product image is required'),
  description: z.string().min(1, 'Description is required'),
  rating: z.object({
    rate: z.number().min(0).max(10, 'Rating must be between 0 and 10'),
    count: z.number().int().min(0, 'Review count cannot be negative'),
  }),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function CreateProduct() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      price: undefined,
      category: '',
      image: undefined,
      description: '',
      rating: { rate: 0, count: 0 },
    },
  });

  const imageFile = watch('image');

  useEffect(() => {
    if (imageFile instanceof File) {
      const url = URL.createObjectURL(imageFile);
      setPreviewUrl(url);

      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [imageFile]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      // Set value in react-hook-form and trigger validation
      setValue('image', file, { shouldValidate: true });
    }
  }

  function onSubmit(data: ProductFormValues) {
    console.log('Submitting Validated Data:', data);
    // data.image is an actual File object here, ready for your API

    // reset fields after submission
    reset();
  }

  return (
    <Card className='w-full max-w-2xl mx-auto shadow-lg'>
      <CardHeader className='space-y-1 text-center'>
        <CardTitle className='text-2xl font-bold tracking-tight'>
          Create Product
        </CardTitle>
        <CardDescription>
          Add a new item to your inventory. All fields are required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid gap-6'
        >
          {/* Title & Price Row */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='title'>Product Name</Label>
              <Input
                id='title'
                placeholder='e.g. Wireless Headphones'
                {...register('title')}
              />
              {errors.title && (
                <p className='text-xs text-destructive'>
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='price'>Price ($)</Label>
              <Input
                id='price'
                type='number'
                step='0.01'
                placeholder='0.00'
                {...register('price', { valueAsNumber: true })}
              />
              {errors.price && (
                <p className='text-xs text-destructive'>
                  {errors.price.message}
                </p>
              )}
            </div>
          </div>

          {/* Category (Radix Select requires manual registration value updates) */}
          <div className='space-y-2'>
            <Label htmlFor='category'>Category</Label>
            <Select
              value={watch('category')}
              onValueChange={(val) =>
                setValue('category', val, { shouldValidate: true })
              }
            >
              <SelectTrigger id='category'>
                <SelectValue placeholder='Select a category' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='jewelery'>Jewelery</SelectItem>
                <SelectItem value='electronics'>Electronics</SelectItem>
                <SelectItem value="men's clothing">Men's Clothing</SelectItem>
                <SelectItem value="women's clothing">
                  Women's Clothing
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.category && (
              <p className='text-xs text-destructive'>
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div className='space-y-2'>
            <Label htmlFor='image'>Product Image</Label>
            <div className='flex items-center gap-4'>
              {previewUrl && (
                <div className='relative h-20 w-20 shrink-0 overflow-hidden rounded-md border bg-muted'>
                  <img
                    src={previewUrl}
                    alt='Preview'
                    className='h-full w-full object-cover'
                  />
                </div>
              )}
              <div className='flex-1'>
                <Input
                  id='image'
                  type='file'
                  accept='image/*'
                  onChange={handleFileChange}
                  className='cursor-pointer'
                />
                <p className='mt-1 text-xs text-muted-foreground'>
                  Supported formats: JPG, PNG, WebP
                </p>
                {errors.image && (
                  <p className='text-xs text-destructive mt-1'>
                    {errors.image.message as string}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className='space-y-2'>
            <Label htmlFor='description'>Description</Label>
            <Input
              id='description'
              placeholder='Describe the product features...'
              {...register('description')}
            />
            {errors.description && (
              <p className='text-xs text-destructive'>
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Rating Group */}
          <div className='grid grid-cols-2 gap-4 p-4 rounded-md border bg-muted/50'>
            <div className='space-y-2'>
              <Label htmlFor='rate'>Rating (1-10)</Label>
              <Input
                id='rate'
                type='number'
                min='0'
                max='10'
                step='0.1'
                {...register('rating.rate', { valueAsNumber: true })}
              />
              {errors.rating?.rate && (
                <p className='text-xs text-destructive'>
                  {errors.rating.rate.message}
                </p>
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='count'>Review Count</Label>
              <Input
                id='count'
                type='number'
                min='0'
                {...register('rating.count', { valueAsNumber: true })}
              />
              {errors.rating?.count && (
                <p className='text-xs text-destructive'>
                  {errors.rating.count.message}
                </p>
              )}
            </div>
          </div>

          <Button
            type='submit'
            className='w-full text-base font-semibold'
          >
            Create Product
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
