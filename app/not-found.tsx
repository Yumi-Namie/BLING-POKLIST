'use client'; 

import Image from 'next/image';
import Button from './components/Button';
import { useRouter } from 'next/navigation';

const Custom404 = () => {
  const { push } = useRouter();

  const handleHomeNavigation = () => {
    push('/');
  };

  return (
    <div >
      <h1 >Oops! Page Not Found</h1>
      <Image
        src="/pokeball.png"
        alt="Pokeball"
        width={100}
        height={100}
        className="mb-4"
      />
      <p>Sorry, the page you are looking for does not exist.</p>
      <Button onClick={handleHomeNavigation} label="Home" />
    </div>
  );
};

export default Custom404;
