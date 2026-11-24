import postRepository from "./post.repository";

async function createPost(
  title: string,
  content: string,
  userId?: number | null
) {
  const trimmedTitle = title.trim();
  const trimmedContent = content.trim();

  if (!trimmedTitle || !trimmedContent) {
    throw new Error("Title and content are required.");
  }

  return await postRepository.createPost({
    title: trimmedTitle,
    content: trimmedContent,
    published: true,
    userId: userId ?? undefined,
  });
}

async function getPosts() {
  return await postRepository.findAllWithAuthor();
}

async function getPost(id: number) {
  return await postRepository.findByIdWithAuthor(id);
}

async function deletePost(id: number, authorId: number | null) {
  const post = await getPost(id);
  if (!post) return null;

  // If post has an author, only that author may delete it
  if (post.userId && post.userId !== authorId) {
    return null;
  }

  return await postRepository.deletePostById(id);
}

export const blogService = {
  createPost,
  getPosts,
  getPost,
  deletePost,
};

export default blogService;
