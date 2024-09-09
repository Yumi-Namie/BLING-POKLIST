import Image from 'next/image';
import { PokemonData } from '../interfaces/PokemonData';

    const PokemonDetail = ({
    name,
    id,
    abilities,
    sprites,
    height,
    weight
    }: PokemonData) => (
    <div className="container mx-auto px-1 py-8">
    <h1 className="text-2xl font-bold mb-4 text-center">{name}</h1>
    <div className="flex flex-row items-center mb-4">
        <Image
        src={sprites.front_default || '/default-image.png'}
        alt={`${name} front`}
        width={128}
        height={128}
        className="mb-4 object-cover"
        />
        <Image
        src={sprites.front_shiny || '/default-image.png'}
        alt={`${name} shiny`}
        width={128}
        height={128}
        className="object-cover"
        />
    </div>
    <div className="mb-4 text-center">
        <p className="mb-2"><strong>ID:</strong> {id}</p>
        <p className="mb-2"><strong>Height:</strong> {height}</p>
        <p className="mb-2"><strong>Weight:</strong> {weight}</p>
    </div>
    <div>
        <p className="mb-2 text-center"><strong>Abilities:</strong></p>
        <ul className="list-disc pl-5">
        {abilities.map((ability, index) => (
            <li key={index}>{ability.ability.name}</li>
        ))}
        </ul>
    </div>
    </div>
    );

export default PokemonDetail;
