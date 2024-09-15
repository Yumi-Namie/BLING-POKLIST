'use client';

import Image from 'next/image';
import Button from './components/Button';
import { useRouter } from 'next/navigation';

const Custom404 = () => {
  const router = useRouter();

  const handleHomeNavigation = () => {
    router.push('/');
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-pokeGray text-center p-6'>
      <h1 className='text-4xl font-bold mb-4'>Oops! Page Not Found</h1>
      <div className="flex items-center justify-center mb-4">
        <Image
          src="/pokeball.png"
          alt="Pokeball"
          width={100}
          height={100}
        />
      </div>
      <p className='text-lg mb-4'>Sorry, the page you are looking for does not exist.</p>
      <Button onClick={handleHomeNavigation} label="Go to Home" />
    </div>
  );
};

export default Custom404;
