import service from "./service";
import { AuthorListItem } from "./AuthorListItem";

export default async function AuthorsPage() {
  const authors = await service.getAuthors();

  return (
    <main className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Authors</h1>

      {authors.length === 0 ? (
        <p className="text-sm text-gray-500">No authors yet.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {authors.map((author) => (
            <AuthorListItem key={author.id} author={author} />
          ))}
        </ul>
      )}
    </main>
  );
}
