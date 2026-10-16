import { createPost } from "./actions"
import { PostWithAuthorListItem } from "./PostWithAuthorListItem"
import service from "./service"

export default async function BlogPage() {
  const postsWithAuthor = await service.getPosts()

  return (
    <main>
      <h1>Blog</h1>

      <ul>
        {postsWithAuthor.map(postWithAuthor => (
          <PostWithAuthorListItem key={postWithAuthor.id} {...postWithAuthor} />
        ))}
      </ul>

      <hr className="my-8"/>
      <form action={createPost} className="flex flex-col">
        <input name="title" placeholder="Title" />
        <textarea name="content" placeholder="Content" />
        <button type="submit">Create</button>
      </form>

    </main>
  )
}