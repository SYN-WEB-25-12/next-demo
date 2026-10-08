import { randomInt } from "crypto"
import { PokemonDetailDTO } from "../_types/Pokemon"
import { setTimeout } from "timers/promises"

export default async function PokemonItem({ url }: { url: string }) {
    const data = await fetch(url)
    const { name, weight, height } = await data.json() as PokemonDetailDTO

    await setTimeout(randomInt(1000))

    return (
        <>
            <h1 className="text-lg">{name}</h1>
            <p className="text-sm">Weight: {weight}</p>
            <p className="text-sm">Height: {height}</p>
        </>
    )
}