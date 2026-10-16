import { notFound } from "next/navigation";
import service from "../service"
import Link from "next/link";

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
            <Link href="../" className="text-blue-600">Back</Link>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </div>
    )
}