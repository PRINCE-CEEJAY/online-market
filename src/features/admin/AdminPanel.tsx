import CreateProduct from '../products/CreateProduct';

export default function AdminPanel() {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <CreateProduct />
    </div>
  );
}
