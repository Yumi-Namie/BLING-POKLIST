import { PokemonListProps } from '../interfaces/PokemonListProps';
import Button from './Button';

const PokemonList = ({ pokemons, loadMore, hasNext }: PokemonListProps) => {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="flex flex-col items-center min-h-screen">
        <div className="container px-4">
            
            <div className="flex flex-col gap-4">
            {pokemons.map((pokemon) => (
                <a
                key={pokemon}
                href={`/details/${pokemon}`}
                className="block border p-4 rounded-md text-center bg-pokeGray hover:bg-pokeBlue-500 text-white text-lg "
                >
                {pokemon}
                </a>
            ))}
            </div>
            {hasNext && (
            <div className="mt-6 flex justify-center items-center space-x-4">
                {/* Load More Button */}
                <Button onClick={loadMore} label="Load More" />

                {/* Scroll to Top Button */}
                <button
                onClick={scrollToTop}
                className="mt-4 flex items-center justify-center hover:text-pokeGray text-blue-400 transition-colors"
                >
                {/* Arrow Up Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="1 1 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 15l-7.5-7.5L4.5 15"
                    />
                </svg>
                </button>
            </div>
            )}
        </div>
        </div>
    );
};

export default PokemonList;
