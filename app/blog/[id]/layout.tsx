import Link from "next/link";
import service from "../service"

export default async function Layout({ children }: LayoutProps<"/blog/[id]">) {
    const posts = await service.getPosts()
    
    return (
        <div className="flex">
            <div className="w-full">
                {children}
            </div>
            <aside className="bg-blue-100 w-lg p-4">
                <h3 className="text-lg pb-4">Latest Posts</h3>
                <ul className="flex flex-col gap-1">
                {
                    posts.map(({id, title}) => (
                        <li key={id}>
                            <Link href={`/blog/${id}`}>{title}</Link>
                        </li>
                    ))
                }
                </ul>
            </aside>
        </div>
    )
}