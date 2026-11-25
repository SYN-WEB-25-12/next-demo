import type { User } from "@/lib/generated/prisma/client";

export function formatAuthorName(
  user: Pick<User, "firstName" | "lastName" | "email"> | null | undefined
): string {
  if (!user) return "Unknown author";

  const fullName = [user.firstName, user.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  return fullName || user.email || "Unknown author";
}

/** Matches the service: unowned posts are open; owned posts are limited to that author. */
export function canManagePost(
  postUserId: number | null | undefined,
  currentUserId: number | null | undefined
): boolean {
  return !postUserId || postUserId === currentUserId;
}

/** Published posts are public. Unpublished posts stay visible only to whoever can manage them. */
export function isPostVisible(
  post: { published: boolean; userId: number | null | undefined },
  currentUserId: number | null | undefined
): boolean {
  return post.published || canManagePost(post.userId, currentUserId);
}

export const blogHelpers = {
  formatAuthorName,
  canManagePost,
  isPostVisible,
};

export default blogHelpers;
