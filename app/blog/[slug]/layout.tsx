import Link from "next/link";
import posts from "../posts.json"

export default function Layout({ children }: LayoutProps<"/blog/[slug]">) {
    return (
        <div className="flex">
            <div className="w-full">
                {children}
            </div>
            <aside className="bg-blue-100 w-lg p-4">
                <h3 className="text-lg pb-4">Latest Posts</h3>
                <ul className="flex flex-col gap-1">
                {
                    posts.map(({slug, title}) => (
                        <li key={slug}>
                            <Link href={`/blog/${slug}`}>{title}</Link>
                        </li>
                    ))
                }
                </ul>
            </aside>
        </div>
    )
}