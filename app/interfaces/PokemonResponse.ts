export interface PokemonResponse {
    results: { name: string }[];
    next: string | null;
}