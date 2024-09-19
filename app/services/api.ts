import { PokemonResponse } from '@/app/interfaces/PokemonResponse';
import { PokemonData } from '../interfaces/PokemonData';

// Base URL for the Pokémon API
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

// General fetch function
const fetchFromApi = async <T>(url: string): Promise<T> => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error fetching data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

// Fetch all Pokémon with limit and offset - from pokemon[0]
export const fetchAllPokemons = async (limit: number = 20, offset: number = 0): Promise<PokemonResponse> => {
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
    return await fetchFromApi(url);
};

// Fetch Pokémon details
export const fetchPokemonData = async (name: string): Promise<PokemonData> => {
    const url = `${BASE_URL}${name}`;
    return await fetchFromApi<PokemonData>(url);
};

// Fetch More Pokémons
export const fetchMorePokemons = async (url: string): Promise<PokemonResponse> => {
    return await fetchFromApi(url);
};
