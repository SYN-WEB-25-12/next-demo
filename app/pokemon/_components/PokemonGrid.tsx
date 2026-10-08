import { Suspense } from "react";
import { PokemonMainDTO } from "../_types/Pokemon";
import PokemonItem from "./PokemonItem";
import PokemonPlaceholder from "./PokemonPlaceholder";
import ErrorBoundary from "../../_components/ErrorBoundary";

export default async function PokemonList() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon');
  const { results: pokemon }: { results: PokemonMainDTO[] } = await response.json();

  return (
    <div className="grid grid-cols-5 items-center justify-center gap-2">
      {pokemon?.map(({ url, name }) => (
        <div key={url} className="min-h-25 w-50 border m-2 p-2">
          <ErrorBoundary title="Pokemon Error">
            <Suspense fallback={
              <PokemonPlaceholder name={name}/>
            } >
              <PokemonItem url={url} />
            </Suspense>
          </ErrorBoundary>
        </div>
      ))}
    </div>
  );
}
