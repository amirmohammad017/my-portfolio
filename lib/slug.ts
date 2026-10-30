export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9\u0600-\u06FF]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export async function uniqueSlug(
  base: string,
  exists: (slug: string) => Promise<boolean>,
) {
  const root = slugify(base) || `post-${Date.now()}`;
  let candidate = root;
  let counter = 1;

  while (await exists(candidate)) {
    counter += 1;
    candidate = `${root}-${counter}`;
  }

  return candidate;
}
