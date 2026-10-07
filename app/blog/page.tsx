import Link from "next/link";
import posts from "./posts.json"

export default function Blog() {
    return (
        <>
            <h2 className="text-2xl pb-4">Blog</h2>
            <ul>
                {
                    posts.map(({slug, title}) => (
                        <li key={slug}>
                            <Link href={slug}>{title}</Link>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}