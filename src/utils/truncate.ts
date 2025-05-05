/**
 * Truncates a string to a shorter form with ellipsis in the middle.
 *
 * Useful for displaying long IDs or hashes in compact UIs.
 *
 * @param str - Original string to truncate
 * @param start - Number of characters to keep at the beginning
 * @param end - Number of characters to keep at the end
 * @returns Truncated string in the format: "abc…xyz"
 */
export const truncate = (str: string, start = 6, end = 4): string =>
  str.length > start + end ? `${str.slice(0, start)}…${str.slice(-end)}` : str;
