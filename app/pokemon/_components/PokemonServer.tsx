import { setTimeout } from "timers/promises";
import { Pokemon } from "../_types/Pokemon";

export default async function PokemonServer() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon');
  const { results: pokemon }: { results: Pokemon[] } = await response.json();

  await setTimeout(4000) // Simuliere langsame UI.

  return (
    <div className="flex flex-col items-center justify-center">
      {pokemon?.map(({ name }) => (
        <p key={name}>{name}</p>
      ))}
    </div>
  );
}
