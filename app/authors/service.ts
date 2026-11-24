import authorRepository from "./author.repository";

export type Author = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  publishedPostCount: number;
  lastPublishedAt: Date;
};

async function getAuthors(): Promise<Author[]> {
  const rows = await authorRepository.findActiveAuthors();

  return rows.map((row) => {
    // where: { posts: { some: { published: true } } } guarantees at least
    // one matching post, so posts[0] is safe despite the array type.
    const mostRecentPost = row.posts[0];
    return {
      id: row.id,
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      publishedPostCount: row._count.posts,
      lastPublishedAt: mostRecentPost.createdAt,
    };
  });
}

export const authorsService = { getAuthors };
export default authorsService;
