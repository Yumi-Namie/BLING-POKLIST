import '../app/styles/globals.css';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Head from 'next/head';

interface RootLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function RootLayout({ children, className }: RootLayoutProps) {
  return (
    <>
      <Head>
        <title>Pokémon List</title>
        <meta
          name="description"
          content="Browse a list of Pokémon and find detailed information about each one."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/pokeball.png" />
        <meta
          name="author"
          content="Icons made by Those Icons from Flaticon"
        />
      </Head>
      <div className={`antialiased flex flex-col min-h-screen bg-background text-foreground ${className}`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
}
