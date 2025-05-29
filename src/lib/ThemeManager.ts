import { ThemeMode } from '../utils/types';
import { getThemeTokens } from '../styles/scheme';

export class ThemeManager {
  private mode: ThemeMode = 'auto';
  private mediaQuery: MediaQueryList | null = null;
  private listener: (() => void) | null = null;
  private currentCssHash: string | null = null;

  constructor(mode: ThemeMode = 'auto') {
    this.mode = mode;
  }

  applyTheme(target: ShadowRoot) {
    const tokens = getThemeTokens(this.mode);
    const cssHash = JSON.stringify(tokens);

    if (this.currentCssHash === cssHash) return;
    this.currentCssHash = cssHash;

    const root = target.host as HTMLElement;
    for (const [key, val] of Object.entries(tokens)) {
      root.style.setProperty(key, val);
    }
  }

  setMode(mode: ThemeMode, target: ShadowRoot) {
    this.cleanup();
    this.mode = mode;
    this.applyTheme(target);
    this.setupAutoMode(target);
  }

  setupAutoMode(target: ShadowRoot) {
    if (this.mode !== 'auto') return;

    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.listener = () => this.applyTheme(target);
    this.mediaQuery.addEventListener('change', this.listener);
  }

  cleanup() {
    if (this.mediaQuery && this.listener) {
      this.mediaQuery.removeEventListener('change', this.listener);
    }
    this.listener = null;
    this.mediaQuery = null;
  }
}
