import PokemonList from '@/app/components/PokemonList';
import SearchBar from '@/app/components/SearchBar';
import { PokemonResponse } from '@/app/interfaces/PokemonResponse';
import { useEffect, useState } from 'react';

const HomePage = () => {
    const [pokemons, setPokemons] = useState<string[]>([]); // All fetched Pokémon
    const [filteredPokemons, setFilteredPokemons] = useState<string[]>([]); // Pokémon after filtering
    const [nextUrl, setNextUrl] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);

    useEffect(() => {
    fetchPokemons('https://pokeapi.co/api/v2/pokemon/');
    }, []);

    useEffect(() => {
    if (searchTerm === '') {
        // Clear search mode
        setFilteredPokemons(pokemons);
        setIsSearching(false);
    } else {
        // Enable search mode and fetch Pokémon based on search term
        setIsSearching(true);
        fetchPokemons(`https://pokeapi.co/api/v2/pokemon/?limit=1000&offset=0`, true);
    }
    }, [searchTerm]);

    const fetchPokemons = async (url: string, isSearch = false) => {
    setLoading(true);
    try {
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        const data: PokemonResponse = await response.json();
        const allFetchedPokemons = data.results.map(pokemon => pokemon.name);
        
        if (isSearch) {
        // If it's a search, filter from the newly fetched data
        const filtered = allFetchedPokemons.filter(pokemon =>
            pokemon.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPokemons(filtered);
        } else {
        // If it's not a search, update the complete list and filtered list
        setPokemons(prev => [...prev, ...allFetchedPokemons]);
        setFilteredPokemons(prev => [...prev, ...allFetchedPokemons]);
        }

        setNextUrl(data.next);
    } catch (error) {
        console.error('Error fetching Pokemon data:', error);
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
            hasNext={hasMorePokemons} />
        {loading && <p>Loading...</p>}
        </div>
    );
    };

    export default HomePage;
