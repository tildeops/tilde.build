/**
 * Escape a string for safe interpolation into an HTML template (e.g. the
 * transactional emails sent from the contact / quote API routes). Shared so
 * both routes stay in sync.
 */
export function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
