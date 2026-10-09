export default function Layout({ children }: LayoutProps<"/pokemon">) {
    return (
        <>
            <h2 className="text-4xl pb-4">Pokemons</h2>
            {children}
        </>
    )
}