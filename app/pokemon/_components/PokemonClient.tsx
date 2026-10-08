"use client"

import { useEffect, useState } from "react";
import { Pokemon } from "../_types/Pokemon";

export default function PokemonClient() {
    const [pokemon, setPokemon] = useState<Pokemon[]>([])

    useEffect(() => {
        (async () => {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon');
            const { results: pokemon }: { results: Pokemon[] } = await response.json();
              // Simuliere langsame UI.
            await new Promise((resolve) => {
                setTimeout(resolve, 4000);
            });
            setPokemon(pokemon)
        })()
    }, [])



  return (
    <div className="flex flex-col items-center justify-center">
      {pokemon?.map(({ name }) => (
        <p key={name}>{name}</p>
      ))}
    </div>
  );
}
