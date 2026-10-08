import { randomInt } from "crypto"
import { PokemonDetailDTO } from "../_types/Pokemon"
import { setTimeout } from "timers/promises"

export default async function PokemonItem({ url }: { url: string }) {
    const data = await fetch(url)
    const { name, weight, height } = await data.json() as PokemonDetailDTO

    const r = randomInt(1000)
    await setTimeout(r)

    if (r % 5 === 0) {
        throw Error("This pokemon causes an error.")
    }

    return (
        <>
            <h4 className="text-lg">{name}</h4>
            <p className="text-sm">Weight: {weight}</p>
            <p className="text-sm">Height: {height}</p>
        </>
    )
}