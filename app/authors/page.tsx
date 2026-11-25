import service from "./service";
import { AuthorListItem } from "./AuthorListItem";

export default async function AuthorsPage() {
  const authors = await service.getAuthors();

  return (
    <main className="max-w-4xl">
      <h1 className="text-4xl font-bold tracking-tight mb-6">Authors</h1>

      {authors.length === 0 ? (
        <p className="text-sm text-gray-500">No authors yet.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map((author) => (
            <AuthorListItem key={author.id} author={author} />
          ))}
        </ul>
      )}
    </main>
  );
}
