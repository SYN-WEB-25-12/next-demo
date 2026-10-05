export default function Layout({ children }: LayoutProps<"/blog/[slug]">) {
    return (
        <div className="flex">
            <div className="w-full">
                {children}
            </div>
            <aside className="border-red-500 border-2 w-lg">
                <h3 className="text-lg">Latest Posts</h3>
                <ul>
                    <li>Post 1</li>
                    <li>Post 2</li>
                    <li>Post 3</li>
                </ul>
            </aside>
        </div>
    )
}