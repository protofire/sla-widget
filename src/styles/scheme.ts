import { ThemeMode, ThemeVariant } from 'src/utils/types';

const sharedTokens = {
  '--monitor-border-radius': '8px',
  '--monitor-font-size': '14px',
  '--monitor-font-family': 'system-ui, sans-serif',
  '--monitor-primary-color': '#4caf50',
  '--monitor-warning-color': '#ff9800',
  '--monitor-error-color': '#f44336',
  '--monitor-unknown-color': '#9e9e9e',
  '--monitor-blue-color': '#2196f3',
};

const lightTheme = {
  '--monitor-background': '#ffffff',
  '--monitor-text': '#222222',
  '--monitor-select-background': '#ffffff',
  '--tooltip-bg': '#dddddd',
  '--tooltip-text': '#222222',
  '--tooltip-border': '1px solid #dddddd',
};

const darkTheme = {
  '--monitor-background': '#1b1f3a',
  '--monitor-text': '#dddddd',
  '--monitor-select-background': '#1b1f3a',
  '--tooltip-bg': '#141730',
  '--tooltip-text': '#dddddd',
  '--tooltip-border': '1px solid #555454',
};

const highContrastTheme = {
  '--monitor-background': '#000000',
  '--monitor-text': '#ffffff',
  '--monitor-select-background': '#000000',
  '--tooltip-bg': '#000000',
  '--tooltip-text': '#ffffff',
  '--tooltip-border': '1px solid #ffffff',
};

export const themeTokensMap: Record<ThemeVariant, Record<string, string>> = {
  light: { ...sharedTokens, ...lightTheme },
  dark: { ...sharedTokens, ...darkTheme },
  highContrast: { ...sharedTokens, ...highContrastTheme },
};

/**
 * Smart getter that resolves 'auto' based on user preference
 */
export function getThemeTokens(mode: ThemeMode): Record<string, string> {
  if (mode === 'auto') {
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    return themeTokensMap[prefersDark ? 'dark' : 'light'];
  }
  return themeTokensMap[mode];
}
