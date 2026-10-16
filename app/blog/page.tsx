import { createPost } from "./actions"
import service from "./service"

export default async function BlogPage() {
  const postsWithAuthor = await service.getPosts()

  return (
    <main>
      <h1>Blog</h1>

      <form action={createPost}>
        <input name="title" placeholder="Title" />
        <textarea name="content" placeholder="Content" />
        <button type="submit">Create</button>
      </form>

      <ul>
        {postsWithAuthor.map(post => {
          const author = post.user
          const authorName = [author?.firstName, author?.lastName].join(" ") ?? "Unknown"
          return (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <small>{authorName}</small>
            </li>
          )
        })}
      </ul>
    </main>
  )
}