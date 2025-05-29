import { HIDE_KEY, HIDE_MINUTES } from './constants';

export function setHideForMinutes(minutes = HIDE_MINUTES) {
  localStorage.setItem(HIDE_KEY, String(Date.now() + minutes * 60_000));
}
