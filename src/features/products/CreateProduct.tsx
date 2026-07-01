import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { Product } from '@/types/types';
import { useState } from 'react';

export default function CreateProduct() {
  const [productInput, setProductInput] = useState<Omit<Product, 'id'>>({
    title: '',
    price: 0,
    category: '',
    image: '',
    description: '',
    rating: { rate: 0, count: 0 },
  });

  function handleSubmision() {
    console.log(productInput);
  }
  return (
    <Card className='max-w-md mx-auto p-4'>
      <CardTitle>
        <h1>Create Product</h1>
      </CardTitle>
      <CardDescription>
        Create a new a unique product that will be added to the api fetched data
      </CardDescription>
      <CardContent>
        <form
          className='w-full flex flex-col items-center'
          onSubmit={handleSubmision}
        >
          <Input
            type='text'
            placeholder='Enter Product Name'
            value={productInput.title}
            onChange={(e) =>
              setProductInput((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <Input
            type='number'
            placeholder='Enter Product Price'
            value={productInput.price}
            onChange={(e) =>
              setProductInput((prev) => ({
                ...prev,
                price: Number(e.target.value),
              }))
            }
          />
          {/*TODO: category - a select element */}
          <select
            value={productInput.category}
            onChange={(e) =>
              setProductInput((prev) => ({
                ...prev,
                category: e.target.value,
              }))
            }
          >
            <option></option>
          </select>

          <section>
            <Input
              type='file'
              placeholder='Select a file'
              value={productInput.image}
              onChange={(e) =>
                setProductInput((prev) => ({
                  ...prev,
                  image: URL.createObjectURL(e.target.files[0]),
                }))
              }
            />
            <div>
              <img
                src={productInput.image}
                alt={productInput.title}
                width={100}
                height={100}
                className='rounded-full'
              />
            </div>
          </section>

          <Input
            type='text'
            placeholder='Describe the product'
            value={productInput.description}
            onChange={(e) =>
              setProductInput((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
          <Input
            type='number'
            placeholder='Enter Rating Count'
            value={productInput.rating.count}
            onChange={(e) =>
              setProductInput((prev) => ({
                ...prev,
                count: Number(e.target.value),
              }))
            }
          />
          <Input
            type='number'
            placeholder='Specify rate from 1 to 10'
            value={productInput.rating.rate}
            onChange={(e) =>
              setProductInput((prev) => ({
                ...prev,
                rate: Number(e.target.value),
              }))
            }
          />
        </form>
      </CardContent>
    </Card>
  );
}
