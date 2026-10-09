import { Suspense } from "react";
import PokemonContent from "./PokemonContent";
import PokemonPlaceholder from "./PokemonPlaceholder";
import { ErrorBoundary } from "react-error-boundary";
import PokemonError from "../error"

export default function PokemonCard({ url, name }: { url: string, name: string}) {
    return (
        <div className="h-25 border p-2 rounded-xl">
            <ErrorBoundary fallback={<PokemonError/>}>
                <Suspense fallback={<PokemonPlaceholder name={name}/>} >
                    <PokemonContent url={url} />
                </Suspense>            
          </ErrorBoundary>
        </div>
    )
}