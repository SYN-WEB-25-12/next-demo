import { Post, User } from "@/lib/generated/prisma/client"

type Props = Post & { user: User | null }

export function PostWithAuthorListItem({id, title, content, user}: Props) {
    const authorName = [user?.firstName, user?.lastName].join(" ") ?? "Unknown"

    return (
        <li key={id} className="my-2 p-2">
            <h2 className="text-lg">{title}</h2>
            <p className="text-sm">{content}</p>
            <small className="italic">{authorName}</small>
        </li>
    )
}