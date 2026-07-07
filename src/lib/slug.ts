import { customAlphabet } from "nanoid";

const randomSuffix = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 6);

export function generateSlug(recipientName: string) {
  const base = recipientName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 30);

  return `${base || "card"}-${randomSuffix()}`;
}
