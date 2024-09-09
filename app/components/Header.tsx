import Link from 'next/link';

const Header = () => {

    return (
    <header className="bg-pokeRed text-white py-4 px-8">
        <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
            <h1> PokeList </h1>
        </Link>
        </div>
    </header>
    );
};

export default Header;
