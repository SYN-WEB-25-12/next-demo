import authorRepository from "./author.repository";

export type Author = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  publishedPostCount: number;
  lastPublishedAt: Date | null;
};

async function getAuthors(): Promise<Author[]> {
  const rows = await authorRepository.findAllAuthors();

  return rows.map((row) => {
    const mostRecentPost = row.posts[0];
    return {
      id: row.id,
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      publishedPostCount: row._count.posts,
      lastPublishedAt: mostRecentPost?.createdAt ?? null,
    };
  });
}

export const authorsService = { getAuthors };
export default authorsService;
