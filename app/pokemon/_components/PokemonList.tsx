import { PokemonMainDTO } from "../_types/Pokemon";
import PokemonItem from "./PokemonItem";

export default async function PokemonList() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon');
  const { results: pokemon }: { results: PokemonMainDTO[] } = await response.json();

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {pokemon?.map(({ url }) => (
        <PokemonItem key={url} url={url} />
      ))}
    </div>
  );
}
