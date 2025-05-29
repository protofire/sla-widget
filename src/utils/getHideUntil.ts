import { HIDE_KEY } from './constants';

export function getHideUntil(): number {
  const ts = Number(localStorage.getItem(HIDE_KEY) || 0);
  return isNaN(ts) ? 0 : ts;
}
