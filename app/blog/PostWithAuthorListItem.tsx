"use client";

import { Post, User } from "@/lib/generated/prisma/client";
import { deletePost } from "./actions";
import { formatAuthorName } from "./blog.helpers";
import { actionButtonBase, PostStatusBadge, PublishToggle } from "./PublishToggle";
import Link from "next/link";

type Props = Post & { user: User | null };

export function PostWithAuthorListItem({
  id,
  title,
  content,
  published,
  user,
  canManage = false,
}: Props & { canManage?: boolean }) {
  const authorName = formatAuthorName(user);

  return (
    <li className="my-2 flex flex-col gap-3 rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex flex-col gap-1">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-semibold">
            <Link href={`/blog/${id}`} className="text-gray-900 transition-colors hover:text-blue-600 hover:underline">
              {title}
            </Link>
          </h2>
          {canManage ? <PostStatusBadge published={published} /> : null}
        </div>
        <p className="text-sm text-gray-700">{content}</p>
        <p className="text-xs italic text-gray-500">By {authorName}</p>
      </div>

      {canManage ? (
        <div className="flex flex-wrap items-center gap-2 border-t border-gray-100 pt-3">
          <PublishToggle id={id} published={published} />
          <button
            type="button"
            className={`${actionButtonBase} border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50 focus-visible:ring-red-500`}
            onClick={() => deletePost(id)}
          >
            Delete
          </button>
        </div>
      ) : null}
    </li>
  );
}
