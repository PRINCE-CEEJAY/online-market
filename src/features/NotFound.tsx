import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <h1 className='text-center text-4xl font-extrabold animate-pulse text-red-800'>
        Sorry the page you requested does note exist
      </h1>
      <Button onClick={() => navigate('/')}>Return Home</Button>
    </div>
  );
}
