const WORDS_PER_MINUTE = 225;

export function countWords(text: string): number {
  const stripped = text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]+`/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_~-]/g, " ")
    .trim();
  if (!stripped) return 0;
  return stripped.split(/\s+/).filter(Boolean).length;
}

export function formatReadingTime(minutes: number): string {
  const m = Math.max(1, Math.ceil(minutes));
  return `${m} min read`;
}

export function readingTimeFromText(text: string): string {
  const words = countWords(text);
  const minutes = words / WORDS_PER_MINUTE;
  return formatReadingTime(minutes);
}
