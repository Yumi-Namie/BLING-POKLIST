import Image from 'next/image';
import { PokemonData } from '../interfaces/PokemonData';

const PokemonCard = ({
    name,
    id,
    height,
    weight,
    abilities,
    sprites,
    stats,
    }: PokemonData) => (
    <div className="bg-white border-4 border-pokeGray shadow-lg rounded-lg  max-w-sm mx-auto my-8">
    <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-center text-pokeGray">{name}</h1>
        <div className="flex flex-row justify-center mb-4 space-x-4">
        <Image
            src={sprites.front_default || '/default-image.png'}
            alt={`${name} front`}
            width={128}
            height={128}
            className="object-cover"
        />
        <Image
            src={sprites.front_shiny || '/default-image.png'}
            alt={`${name} shiny`}
            width={128}
            height={128}
            className="object-cover"
        />
        </div>
        <div className="mb-4 text-left text-pokeGray">
            <p className="mb-2"><strong>ID:</strong> {id}</p>
            <p className="mb-2"><strong>Height:</strong> {height}</p>
            <p className="mb-2"><strong>Weight:</strong> {weight}</p>
        </div>
        <div className="text-left text-pokeGray">
            <p className="mb-2"><strong>Abilities:</strong></p>
            <ul className="list-disc pl-5">
                {abilities.map((ability, index) => (
                <li key={index}>{ability.ability.name}</li>
                ))}
            </ul>
        </div>
        <div className="text-left text-pokeGray">
            <p className="m-2"><strong>Stats:</strong></p>
            <ul className="list-disc pl-5">
                {stats.map((stat, index) => (
                    <li key={index}>
                        {stat.stat.name} : {stat.base_stat}
                    </li>
                ))}
            </ul>
        </div>

    </div>
    </div>
);

export default PokemonCard;
