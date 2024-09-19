import PokemonCard from '@/app/components/PokemonCard';
import { GetServerSideProps } from 'next';
import { PokemonData } from '@/app/interfaces/PokemonData';
import Button from '@/app/components/Button';
import { fetchPokemonData } from '@/app/services/api'

interface Props {
    pokemon?: PokemonData;
}

const PokemonPage = ({ pokemon }: Props) => {
    if (!pokemon) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <PokemonCard
                name={pokemon.name}
                id={pokemon.id}
                height={pokemon.height}
                weight={pokemon.weight}
                abilities={pokemon.abilities}
                sprites={pokemon.sprites}
                stats={pokemon.stats}
            />
            <div className="mt-4 flex justify-center">
                <Button onClick={() => window.history.back()} label="Back" />
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { name } = context.params!;
    
    try {
        const data = await fetchPokemonData(name as string);

        const pokemon = {
            name: data.name,
            id: data.id,
            height: data.height,
            weight: data.weight,
            abilities: data.abilities,
            sprites: data.sprites,
            stats: data.stats,
        };

        return {
            props: {
                pokemon,
            },
        };
    } catch (error) {
        context.res.writeHead(302, { Location: '/not-found' });
        context.res.end();
        return { props: {} };
    }
};

export default PokemonPage;
