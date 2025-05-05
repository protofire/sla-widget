export const truncate = (str: string, start = 6, end = 4) =>
  str.length <= start + end ? str : `${str.slice(0, start)}…${str.slice(-end)}`;
