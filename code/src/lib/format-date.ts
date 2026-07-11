export function formatRelativeDate(date: Date, prefix = "Published"): string {
  const now = Date.now();
  const diffMs = now - date.getTime();
  const days = Math.max(0, Math.round(diffMs / 86_400_000));

  const label = (value: string) => (prefix ? `${prefix} ${value}` : value);

  if (days === 0) return label("today");
  if (days === 1) return label("1 day ago");
  if (days < 7) return label(`${days} days ago`);

  const weeks = Math.round(days / 7);
  if (weeks === 1) return label("1 week ago");
  if (weeks < 5) return label(`${weeks} weeks ago`);

  const months = Math.round(days / 30);
  if (months === 1) return label("1 month ago");
  if (months < 12) return label(`${months} months ago`);

  const years = Math.round(days / 365);
  if (years === 1) return label("1 year ago");
  return label(`${years} years ago`);
}
