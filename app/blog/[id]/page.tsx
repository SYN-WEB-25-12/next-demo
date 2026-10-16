import { notFound } from "next/navigation";
import service from "../service"

export default async function Page({ params }: { params: Promise<{id: string}>}) {
    const { id: idString } = await params

    const id = Number(idString)

    if (isNaN(id)) {
        notFound()
    }

    const post = await service.getPost(id)

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