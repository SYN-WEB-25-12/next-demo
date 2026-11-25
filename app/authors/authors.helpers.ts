export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getInitials(
  firstName?: string | null,
  lastName?: string | null,
): string {
  return `${firstName?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`.toUpperCase();
}

export const authorsHelpers = { formatDate, getInitials };
export default authorsHelpers;
