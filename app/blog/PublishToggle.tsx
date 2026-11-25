"use client";

import { publishPost, unpublishPost } from "./actions";

export const actionButtonBase =
  "inline-flex items-center justify-center rounded-md border px-3 py-1 text-xs font-medium transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1";

export function PostStatusBadge({ published }: { published: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${
        published
          ? "bg-green-50 text-green-700"
          : "bg-gray-100 text-gray-600"
      }`}
    >
      <span
        aria-hidden
        className={`size-1.5 rounded-full ${
          published ? "bg-green-500" : "bg-gray-400"
        }`}
      />
      {published ? "Published" : "Unpublished"}
    </span>
  );
}

export function PublishToggle({
  id,
  published,
}: {
  id: number;
  published: boolean;
}) {
  return (
    <button
      type="button"
      className={`${actionButtonBase} border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 focus-visible:ring-blue-500`}
      onClick={() => (published ? unpublishPost(id) : publishPost(id))}
    >
      {published ? "Unpublish" : "Publish"}
    </button>
  );
}
