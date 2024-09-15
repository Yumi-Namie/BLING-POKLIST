import PokemonList from '@/app/components/PokemonList';
import SearchBar from '@/app/components/SearchBar';
import { PokemonResponse } from '@/app/interfaces/PokemonResponse';
import { useEffect, useState } from 'react';

const HomePage = () => {
    const [pokemons, setPokemons] = useState<string[]>([]); // All fetched Pokémon
    const [filteredPokemons, setFilteredPokemons] = useState<string[]>([]); // Pokémon after filtering
    const [nextUrl, setNextUrl] = useState<string | null>(null); // URL to load more data
    const [searchTerm, setSearchTerm] = useState<string>(''); // Search term
    const [loading, setLoading] = useState<boolean>(false); // Loading state
    const [isSearching, setIsSearching] = useState<boolean>(false); // Indicates if search is active

    useEffect(() => {
        fetchPokemons('https://pokeapi.co/api/v2/pokemon/');
    }, []);

    useEffect(() => {
        if (searchTerm.length < 3) {
            // If the search term has less than 3 characters, show all Pokémon
            setFilteredPokemons(pokemons);
            setIsSearching(false);
        } else {
            // Activate search mode
            setIsSearching(true);
            fetchPokemons(`https://pokeapi.co/api/v2/pokemon/?limit=1000&offset=0`, true, searchTerm);
        }
    }, [searchTerm, pokemons]);

    const fetchPokemons = async (url: string, isSearch = false, searchTerm = '') => {
        setLoading(true);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error fetching data');
            }
            const data: PokemonResponse = await response.json();
            const allFetchedPokemons = data.results.map(pokemon => pokemon.name);

            if (isSearch) {
                // If it's a search, filter the data based on the search term
                const filtered = allFetchedPokemons.filter(pokemon =>
                    pokemon.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setFilteredPokemons(filtered);
            } else {
                // If it's not a search, update the complete list and the filtered list
                setPokemons(prev => [...prev, ...allFetchedPokemons]);
                setFilteredPokemons(prev => [...prev, ...allFetchedPokemons]);
            }

            setNextUrl(data.next);
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    const loadMore = () => {
        if (nextUrl && !isSearching) {
            fetchPokemons(nextUrl);
        }
    };

    const hasMorePokemons = nextUrl !== null && !isSearching;

    return (
        <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold mb-6 text-center">Pokémon List</h1>
            <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
            <PokemonList
                pokemons={filteredPokemons}
                loadMore={loadMore}
                hasNext={hasMorePokemons}
            />
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default HomePage;
