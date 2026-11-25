import { createPost } from "./actions";
import { canManagePost, isPostVisible } from "./blog.helpers";
import { PostWithAuthorListItem } from "./PostWithAuthorListItem";
import service from "./service";
import sessionService from "@/lib/session";
import Link from "next/link";

export default async function BlogPage() {
  const postsWithAuthor = await service.getPosts();
  const session = await sessionService.getCurrent();

  return (
    <main className="max-w-2xl">
      <h1 className="text-4xl font-bold tracking-tight mb-6">Blog</h1>

      <ul className="flex flex-col gap-2">
        {postsWithAuthor
          .filter((postWithAuthor) =>
            isPostVisible(postWithAuthor, session?.userId)
          )
          .map((postWithAuthor) => (
          <PostWithAuthorListItem
            key={postWithAuthor.id}
            {...postWithAuthor}
            canManage={canManagePost(postWithAuthor.userId, session?.userId)}
          />
        ))}
      </ul>

      <section className="mt-12 rounded-xl bg-gray-50/80 p-5 ring-1 ring-gray-200/70">
      <h2 className="text-lg font-semibold mb-4">New Post</h2>
      <form action={createPost} className="flex flex-col gap-3">
        <input
          name="title"
          placeholder="Title"
          required
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
        <textarea
          name="content"
          placeholder="Content"
          required
          rows={4}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" name="published" defaultChecked />
          Published
        </label>
        <div className="flex items-center justify-between gap-4">
          {session ? (
            <p className="text-sm text-gray-600">
              Posting as <strong>{session.firstName} {session.lastName}</strong> ({session.email})
            </p>
          ) : (
            <p className="text-sm text-amber-700">
              You are not logged in. <Link href="/auth" className="underline font-medium">Log in</Link> to attribute this post to your account.
            </p>
          )}
          <button
            type="submit"
            className="shrink-0 rounded-md bg-gray-900 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gray-700 cursor-pointer"
          >
            Create
          </button>
        </div>
      </form>
      </section>
    </main>
  );
}
