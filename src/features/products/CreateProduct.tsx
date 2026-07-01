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
import type { Product } from '@/types/types';
import { useState, useEffect } from 'react';
import { zod } from 'zod';
import { useForm } from 'react-hook-form';
import { Resolver } from 'react-hook-form';

export default function CreateProduct() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [productInput, setProductInput] = useState<Omit<Product, 'id'>>({
    title: '',
    price: 0,
    category: '',
    image: '',
    description: '',
    rating: { rate: 0, count: 0 },
  });

  // Cleanup memory on unmount or when file changes
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      // Revoke old URL before setting new one to avoid leaks
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
      // In a real app, you'd likely store the File object itself, not just the URL
      setProductInput((prev) => ({ ...prev, image: file.name }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('Submitting:', productInput);
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
          onSubmit={handleSubmit}
          className='grid gap-6'
        >
          {/* Title & Price Row */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='title'>Product Name</Label>
              <Input
                id='title'
                placeholder='e.g. Wireless Headphones'
                value={productInput.title}
                onChange={(e) =>
                  setProductInput((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='price'>Price ($)</Label>
              <Input
                id='price'
                type='number'
                placeholder='0.00'
                value={productInput.price}
                onChange={(e) =>
                  setProductInput((prev) => ({
                    ...prev,
                    price: Number(e.target.value),
                  }))
                }
              />
            </div>
          </div>

          {/* Category */}
          <div className='space-y-2'>
            <Label htmlFor='category'>Category</Label>
            <Select
              value={productInput.category}
              onValueChange={(val) =>
                setProductInput((prev) => ({ ...prev, category: val }))
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
          </div>

          {/* Image Upload */}
          <div className='space-y-2'>
            <Label>Product Image</Label>
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
              </div>
            </div>
          </div>

          {/* Description */}
          <div className='space-y-2'>
            <Label htmlFor='description'>Description</Label>
            <Input
              id='description'
              placeholder='Describe the product features...'
              value={productInput.description}
              onChange={(e) =>
                setProductInput((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
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
                value={productInput.rating.rate}
                onChange={(e) =>
                  setProductInput((prev) => ({
                    ...prev,
                    rating: { ...prev.rating, rate: Number(e.target.value) },
                  }))
                }
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='count'>Review Count</Label>
              <Input
                id='count'
                type='number'
                min='0'
                value={productInput.rating.count}
                onChange={(e) =>
                  setProductInput((prev) => ({
                    ...prev,
                    rating: { ...prev.rating, count: Number(e.target.value) },
                  }))
                }
              />
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
