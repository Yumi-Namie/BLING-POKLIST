export interface PokemonListProps {
    pokemons: string[];
    loadMore: () => void;
    hasNext: boolean;
}