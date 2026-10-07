import Link from "next/link";

export default function Blog() {
    return (
        <ul>
            <Link href="/blog/post-1">Post 1</Link>
            <Link href="/blog/post-2">Post 2</Link>
            <Link href="/blog/post-3">Post 3</Link>
        </ul>
    )
}