import Link from "next/link";
import service from "../service"
import sessionService from "@/lib/session";
import { isPostVisible } from "../blog.helpers";

export default async function Layout({ children }: LayoutProps<"/blog/[id]">) {
    const [posts, session] = await Promise.all([
        service.getPosts(),
        sessionService.getCurrent(),
    ]);
    const visiblePosts = posts.filter((post) =>
        isPostVisible(post, session?.userId)
    );
    
    return (
        <div className="flex">
            <div className="w-full">
                {children}
            </div>
            <aside className="bg-blue-100 w-lg p-4">
                <h3 className="text-lg pb-4">Latest Posts</h3>
                <ul className="flex flex-col gap-1">
                {
                    visiblePosts.map(({id, title}) => (
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