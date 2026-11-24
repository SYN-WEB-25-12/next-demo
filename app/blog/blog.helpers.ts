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

export const blogHelpers = {
  formatAuthorName,
};

export default blogHelpers;
