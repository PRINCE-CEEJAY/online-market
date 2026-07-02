import AdminProducts from './AdminProducts';
import CreateProduct from './CreateProduct';

export default function AdminPanel() {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <CreateProduct />
      <AdminProducts />
    </div>
  );
}
