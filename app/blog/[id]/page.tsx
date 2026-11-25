import { notFound } from "next/navigation";
import service from "../service";
import { formatAuthorName } from "../blog.helpers";
import { PublishToggle } from "../PublishToggle";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idString } = await params;

  const id = Number(idString);

  if (isNaN(id)) {
    notFound();
  }

  const post = await service.getPost(id);

  if (!post) {
    notFound();
  }

  const authorName = formatAuthorName(post.user);

  return (
    <div className="max-w-2xl">
      <Link href="/blog" className="text-blue-600 hover:underline text-sm">
        &larr; Back to posts
      </Link>
      <h1 className="text-2xl font-bold mt-4">{post.title}</h1>
      <p className="text-sm italic text-gray-500">By {authorName}</p>
      <div className="mb-4">
        <PublishToggle id={post.id} published={post.published} />
      </div>
      <p className="text-base leading-relaxed text-gray-800 whitespace-pre-wrap">
        {post.content}
      </p>
    </div>
  );
}
