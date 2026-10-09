import { PokemonMainDTO } from "../_types/Pokemon";
import PokemonCard from "./PokemonCard";

export default async function PokemonGrid() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon');
  const { results: pokemon }: { results: PokemonMainDTO[] } = await response.json();

  return (
    <div className="grid grid-cols-5 items-center justify-center gap-2">
      {pokemon?.map(({ url, name }) => (
        <PokemonCard key={url} url={url} name={name} />
      ))}
    </div>
  );
}
