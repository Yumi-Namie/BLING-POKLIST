import PokemonCard from '@/app/components/PokemonCard';
import { GetServerSideProps } from 'next';
import { PokemonData } from '@/app/interfaces/PokemonData';
import Button from '@/app/components/Button';

interface Props {
    pokemon?: PokemonData; // Tornar opcional para lidar com erros
}

const PokemonPage = ({ pokemon }: Props) => {
    if (!pokemon) {
        // Se não houver Pokémon, você pode optar por exibir uma mensagem de carregamento ou outro comportamento
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
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        
        if (!response.ok) {
            // Se a resposta não for OK (status não é 2xx), redirecionar para a página personalizada
            context.res.writeHead(302, { Location: '/not-found' });
            context.res.end();
            return { props: {} }; // Retorna props vazias, pois o redirecionamento já foi feito
        }

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
    } catch (error) {
        // Em caso de erro na solicitação, redirecionar para a página personalizada
        context.res.writeHead(302, { Location: '/not-found' });
        context.res.end();
        return { props: {} }; // Retorna props vazias, pois o redirecionamento já foi feito
    }
};

export default PokemonPage;
