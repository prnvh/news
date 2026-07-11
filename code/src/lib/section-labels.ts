const RESEARCH_NOTE_LABELS: Record<string, string> = {
  "what problem is the paper trying to solve": "Problem",
  "what is the core idea": "Core idea",
  "what method did they use": "Method",
  "what result matters": "Results that matter",
  "what assumptions does it make": "Assumptions",
  "what does it connect to": "Connects to",
  "what confused me": "Confusions",
  "what could be built from it": "Could build",
  "how does it change the field map": "Impact on field map",
};

const BRIEF_LABELS: Record<string, string> = {
  "what it is": "What it is",
  "why it matters": "Why it matters",
  "how it works": "How it works",
  "what to connect it to": "Connects to",
  "where it fits in the map": "Impact on field map",
};

function normalizeHeading(value: string): string {
  return value
    .toLowerCase()
    .replace(/[?!.:,;'"()]/g, "")
    .trim();
}

export function shortSectionLabel(
  heading: string,
  articleType?: "brief" | "research-note" | "essay" | "field-map",
): string {
  const normalized = normalizeHeading(heading);
  const map =
    articleType === "brief"
      ? BRIEF_LABELS
      : articleType === "research-note"
        ? RESEARCH_NOTE_LABELS
        : { ...RESEARCH_NOTE_LABELS, ...BRIEF_LABELS };

  return map[normalized] ?? heading.replace(/\?$/, "").trim();
}
