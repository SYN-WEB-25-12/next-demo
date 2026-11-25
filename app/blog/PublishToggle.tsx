"use client";

import { publishPost, unpublishPost } from "./actions";

export function PublishToggle({
  id,
  published,
}: {
  id: number;
  published: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2 mt-2">
      <span className="text-xs text-gray-500">
        {published ? "Published" : "Unpublished"}
      </span>
      <button
        type="button"
        className="text-blue-600 text-xs hover:underline cursor-pointer"
        onClick={() => (published ? unpublishPost(id) : publishPost(id))}
      >
        {published ? "Unpublish" : "Publish"}
      </button>
    </span>
  );
}
