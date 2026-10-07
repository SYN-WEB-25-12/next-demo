import Link from "next/link";

export default function Layout({ children }: LayoutProps<"/blog/[slug]">) {
    return (
        <div className="flex">
            <div className="w-full">
                {children}
            </div>
            <aside className="bg-blue-100 w-lg p-4">
                <h3 className="text-lg pb-4">Latest Posts</h3>
                <ul className="flex flex-col gap-1">
                    <Link href="post-1">Post 1</Link>
                    <Link href="post-2">Post 2</Link>
                    <Link href="post-3">Post 3</Link>
                </ul>
            </aside>
        </div>
    )
}