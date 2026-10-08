import { Suspense } from "react";
import { PokemonMainDTO } from "../_types/Pokemon";
import PokemonItem from "./PokemonItem";
import PokemonPlaceholder from "./PokemonPlaceholder";

export default async function PokemonList() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon');
  const { results: pokemon }: { results: PokemonMainDTO[] } = await response.json();

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {pokemon?.map(({ url, name }) => (
        <div key={url} className="min-h-25 w-50 border m-2">
          <Suspense fallback={
            <PokemonPlaceholder name={name}/>
          } >
            <PokemonItem url={url} />
          </Suspense>
        </div>
      ))}
    </div>
  );
}
