/**
 * Formats a given duration in seconds into a human-readable string
 * representing hours, minutes, and seconds.
 *
 * @param seconds - The duration in seconds to format.
 * @returns A formatted string in the format of "{h}h {m}m {s}s",
 *          where hours, minutes, and seconds are included only if
 *          they are greater than zero. If the duration is zero,
 *          it returns "0s".
 *
 * @example
 * ```typescript
 * formatLatency(3661); // "1h 1m 1s"
 * formatLatency(60);   // "1m"
 * formatLatency(0);    // "0s"
 * ```
 */
export function fmtLatency(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const parts = [];
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  if (s > 0 || parts.length === 0) parts.push(`${s}s`);

  return parts.join(' ');
}
