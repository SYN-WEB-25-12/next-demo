"use client";

import { Post, User } from "@/lib/generated/prisma/client";
import { deletePost } from "./actions";
import { formatAuthorName } from "./blog.helpers";
import Link from "next/link";

type Props = Post & { user: User | null };

export function PostWithAuthorListItem({ id, title, content, user }: Props) {
  const authorName = formatAuthorName(user);

  return (
    <li className="my-2 p-3 border border-gray-200 rounded">
      <h2 className="text-lg font-semibold">
        <Link href={`/blog/${id}`} className="hover:underline text-blue-600">
          {title}
        </Link>
      </h2>
      <p className="text-sm text-gray-700 my-1">{content}</p>
      <p className="text-xs italic text-gray-500">By {authorName}</p>
      <button
        className="text-red-500 text-xs mt-2 hover:underline cursor-pointer block"
        onClick={() => deletePost(id)}
      >
        Delete
      </button>
    </li>
  );
}
