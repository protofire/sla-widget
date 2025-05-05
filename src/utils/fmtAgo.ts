/**
 * Converts a timestamp (in milliseconds) to a human-readable relative time string.
 *
 * Examples:
 *   - "45s ago" if < 1 minute
 *   - "3m ago" if < 1 hour
 *   - "2h ago" if < 1 day
 *   - "5d ago" otherwise
 *
 * @param ts - Timestamp in milliseconds
 * @returns Readable time-difference string, or "—" if invalid
 */
export const fmtAgo = (ts: number): string => {
  if (!ts) return '—';
  const sec = Math.floor((Date.now() - ts) / 1000);
  if (sec < 60) return `${sec}s ago`;

  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;

  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;

  const d = Math.floor(hr / 24);
  return `${d}d ago`;
};
