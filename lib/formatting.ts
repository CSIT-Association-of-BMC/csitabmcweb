const ACRONYMS = new Set([
  "IT",
  "CSIT",
  "AI",
  "ML",
  "CTO",
  "CEO",
  "UI",
  "UX",
  "PR",
  "BMC",
  "TU",
]);

/**
 * Formats an organizational designation or role title into standardized Title Case.
 * Corrects lowercase strings (e.g. "vice-president" -> "Vice-President", "tech lead" -> "Tech Lead")
 * while strictly preserving hyphens and uppercase acronyms (e.g. "it lead" -> "IT Lead").
 */
export function formatDesignation(designation?: string | null): string {
  if (!designation || typeof designation !== "string") {
    return "";
  }

  const trimmed = designation.trim();
  if (!trimmed) {
    return "";
  }

  return trimmed
    .split(/\s+/)
    .map((word) => {
      return word
        .split("-")
        .map((subWord) => {
          if (!subWord) return "";
          const upper = subWord.toUpperCase();
          if (ACRONYMS.has(upper)) {
            return upper;
          }
          return subWord.charAt(0).toUpperCase() + subWord.slice(1).toLowerCase();
        })
        .join("-");
    })
    .join(" ");
}
