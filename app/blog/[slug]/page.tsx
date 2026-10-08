import { notFound } from "next/navigation";
import type { Post } from "../Post"
import postsUntyped from "../posts.json"

const posts = postsUntyped as Post[]

export default async function Page({ params }: { params: Promise<{slug: string}>}) {
    const { slug } = await params

    const post = posts.find((post) => post.slug === slug)

    if (!post) {
        notFound()
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </div>
    )
}