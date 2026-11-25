import type { Author } from "./service";
import { formatDate, getInitials } from "./authors.helpers";

type Props = { author: Author };

export function AuthorListItem({ author }: Props) {
  const { firstName, lastName, publishedPostCount, lastPublishedAt } = author;

  return (
    <li className="flex flex-col items-center gap-4 rounded-lg border border-gray-200 bg-white/70 p-5 text-center shadow-sm">
      <div
        aria-hidden
        className="flex size-16 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xl font-semibold text-gray-600 ring-1 ring-gray-200"
      >
        {getInitials(firstName, lastName)}
      </div>

      <div className="flex min-w-0 flex-col gap-0.5">
        <h2 className="truncate text-lg font-semibold text-gray-900">
          {firstName} {lastName}
        </h2>
        <p className="text-xs text-gray-500">
          {lastPublishedAt
            ? `Last published ${formatDate(lastPublishedAt)}`
            : "No published posts yet"}
        </p>
      </div>

      <div className="mt-auto flex w-full items-baseline justify-center gap-1.5 border-t border-gray-100 pt-3">
        <span className="text-lg font-semibold text-gray-900">
          {publishedPostCount}
        </span>
        <span className="text-xs uppercase tracking-wide text-gray-500">
          {publishedPostCount === 1 ? "Post" : "Posts"}
        </span>
      </div>
    </li>
  );
}
