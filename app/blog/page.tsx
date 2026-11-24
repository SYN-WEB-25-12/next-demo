import { createPost } from "./actions";
import { PostWithAuthorListItem } from "./PostWithAuthorListItem";
import service from "./service";
import sessionService from "@/lib/session";
import Link from "next/link";

export default async function BlogPage() {
  const postsWithAuthor = await service.getPosts();
  const session = await sessionService.getCurrent();

  return (
    <main className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Blog</h1>

      <ul className="flex flex-col gap-2">
        {postsWithAuthor.map((postWithAuthor) => (
          <PostWithAuthorListItem key={postWithAuthor.id} {...postWithAuthor} />
        ))}
      </ul>

      <hr className="my-8" />
      <h2 className="text-xl font-semibold mb-2">Create New Post</h2>
      {session ? (
        <p className="text-sm text-gray-600 mb-3">
          Posting as <strong>{session.firstName} {session.lastName}</strong> ({session.email})
        </p>
      ) : (
        <p className="text-sm text-amber-600 mb-3">
          You are not logged in. <Link href="/auth" className="underline font-medium">Log in</Link> to attribute this post to your account.
        </p>
      )}
      <form action={createPost} className="flex flex-col gap-2">
        <input
          name="title"
          placeholder="Title"
          required
          className="border border-gray-300 rounded px-3 py-1.5"
        />
        <textarea
          name="content"
          placeholder="Content"
          required
          rows={4}
          className="border border-gray-300 rounded px-3 py-1.5"
        />
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" name="published" defaultChecked />
          Published
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-1.5 hover:bg-blue-700 self-start cursor-pointer"
        >
          Create
        </button>
      </form>
    </main>
  );
}
