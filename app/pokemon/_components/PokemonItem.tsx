import { PokemonDetailDTO } from "../_types/Pokemon"

export default async function PokemonItem({ url }: { url: string }) {
    const data = await fetch(url)
    const { name, weight, height } = await data.json() as PokemonDetailDTO

    return (
        <div className="border p-2 min-w-2xs">
            <h1 className="text-lg">{name}</h1>
            <p className="text-sm">Weight: {weight}</p>
            <p className="text-sm">Height: {height}</p>
        </div>
    )
}