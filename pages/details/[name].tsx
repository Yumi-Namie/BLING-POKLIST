import PokemonCard from '@/app/components/PokemonCard';
import { GetServerSideProps } from 'next';
import { PokemonData } from '@/app/interfaces/PokemonData';
import Button from '@/app/components/Button';


interface Props {
    pokemon: PokemonData;
}

const PokemonPage = ({ pokemon }: Props) => {
    return (
    <div className="container mx-auto px-4 py-8">
        <PokemonCard
        name={pokemon.name}
        id={pokemon.id}
        height={pokemon.height}
        weight={pokemon.weight}
        abilities={pokemon.abilities}
        sprites={pokemon.sprites}
        />
        <div className="mt-4 flex justify-center">
            <Button 
            onClick={() => window.history.back()} 
            label="Back" 
            />
        </div>
    </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { name } = context.params!;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();

const pokemon = {
    name: data.name,
    id: data.id,
    height: data.height,
    weight: data.weight,
    abilities: data.abilities,
    sprites: data.sprites,
};

return {
    props: {
        pokemon,
    },
};
};

export default PokemonPage;
