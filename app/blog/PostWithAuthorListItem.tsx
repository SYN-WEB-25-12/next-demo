"use client"

import { Post, User } from "@/lib/generated/prisma/client"
import { deletePost } from "./actions"
import Link from "next/link"

type Props = Post & { user: User | null }

export function PostWithAuthorListItem({id, title, content, user}: Props) {
    const authorName = [user?.firstName, user?.lastName].join(" ") ?? "Unknown"

    return (
        <li key={id} className="my-2 p-2">
            <h2 className="text-lg">
                <Link href={`./${id}`}>{title}</Link>
            </h2>
            <p className="text-sm">{content}</p>
            <p className="italic">{authorName}</p>
            <button className="text-red-500 text-xs" onClick={() => deletePost(id)}>Delete</button>
        </li>
    )
}