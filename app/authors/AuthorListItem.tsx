import type { Author } from "./service";
import { formatDate } from "./authors.helpers";

type Props = { author: Author };

export function AuthorListItem({ author }: Props) {
  return (
    <li className="my-2 p-3 border border-gray-200 rounded">
      <h2 className="text-lg font-semibold">
        {author.firstName} {author.lastName}
      </h2>
      <p className="text-sm text-gray-700 my-1">
        {author.publishedPostCount} published post
        {author.publishedPostCount === 1 ? "" : "s"}
      </p>
      <p className="text-xs italic text-gray-500">
        Most recent: {formatDate(author.lastPublishedAt)}
      </p>
    </li>
  );
}
