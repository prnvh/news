/** Strip YYYY-MM-DD- prefix from content filenames. */
export function slugFromFilename(filename: string): string {
  const base = filename.replace(/\.(mdx?|md)$/i, "");
  const match = base.match(/^\d{4}-\d{2}-\d{2}-(.+)$/);
  return match ? match[1] : base;
}

export function resolveSlug(
  filename: string,
  frontmatterSlug?: string,
): string {
  if (frontmatterSlug?.trim()) return frontmatterSlug.trim();
  return slugFromFilename(filename);
}
