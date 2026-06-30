import { Link } from 'react-router-dom';
import { buttonVariants } from '../components/ui/button';
import { ArrowLeft, BabyIcon } from 'lucide-react';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-evenly overflow-hidden h-[80vh]'>
      <BabyIcon
        size={150}
        className='animate-bounce'
      />
      <h1 className='text-center text-4xl font-extrabold animate-pulse text-red-500'>
        Sorry the page you requested does note exist
      </h1>
      <Link
        to={'/'}
        className={` px-8 py-2 ${buttonVariants()}`}
      >
        <ArrowLeft /> Go Back
      </Link>
    </div>
  );
}
