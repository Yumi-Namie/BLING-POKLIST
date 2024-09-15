import PokemonList from '@/app/components/PokemonList';
import SearchBar from '@/app/components/SearchBar';
import { useEffect, useState } from 'react';
import { fetchAllPokemons } from '@/app/services/api';

const HomePage = () => {
    const [pokemons, setPokemons] = useState<string[]>([]); // All fetched Pokémon
    const [filteredPokemons, setFilteredPokemons] = useState<string[]>([]); // Pokémon after filtering
    const [nextUrl, setNextUrl] = useState<string | null>(null); // URL to load more data
    const [searchTerm, setSearchTerm] = useState<string>(''); // Search term
    const [loading, setLoading] = useState<boolean>(false); // Loading state
    const [isSearching, setIsSearching] = useState<boolean>(false); // Indicates if search is active

    useEffect(() => {
        const loadInitialData = async () => {
            setLoading(true);
            try {
                const data = await fetchAllPokemons(); // Default limit and offset
                const allFetchedPokemons = data.results.map(pokemon => pokemon.name);
                setPokemons(allFetchedPokemons);
                setFilteredPokemons(allFetchedPokemons);
                setNextUrl(data.next);
            } catch (error) {
                console.error('Error fetching Pokémon data:', error);
            } finally {
                setLoading(false);
            }
        };
        loadInitialData();
    }, []);

    useEffect(() => {
        if (searchTerm.length < 3) {
            // If the search term has less than 3 characters, show all Pokémon
            setFilteredPokemons(pokemons);
            setIsSearching(false);
        } else {
            // Activate search mode
            setIsSearching(true);
            const fetchSearchResults = async () => {
                setLoading(true);
                try {
                    // Fetch all Pokémon data to search through
                    const data = await fetchAllPokemons(1000, 0); // Arbitrary large limit for search
                    const filtered = data.results
                        .map(pokemon => pokemon.name)
                        .filter(pokemon =>
                            pokemon.toLowerCase().includes(searchTerm.toLowerCase())
                        );
                    setFilteredPokemons(filtered);
                } catch (error) {
                    console.error('Error fetching Pokémon data for search:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchSearchResults();
        }
    }, [searchTerm, pokemons]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    const loadMore = () => {
        if (nextUrl && !isSearching) {
            fetchMorePokemons(nextUrl);
        }
    };

    const fetchMorePokemons = async (url: string) => {
        setLoading(true);
        try {
            const data = await fetchAllPokemons(); // Fetch more data with default limit and offset
            const newPokemons = data.results.map(pokemon => pokemon.name);
            setPokemons(prev => [...prev, ...newPokemons]);
            setFilteredPokemons(prev => [...prev, ...newPokemons]);
            setNextUrl(data.next);
        } catch (error) {
            console.error('Error fetching more Pokémon data:', error);
        } finally {
            setLoading(false);
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
