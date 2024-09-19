export interface PokemonData {
    name: string;
    id: number;
    height: number;
    weight: number;
    abilities: { ability: { name: string } }[];
    sprites: {
        front_default: string;
        front_shiny: string;
    };
    stats: Stat[];
}

interface Stat {
    base_stat: number;
    stat: {
        name: string;
        url: string;
    };
}
