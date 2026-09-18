export type Theme = 'light' | 'dark';

export const THEME_KEY = 'mb-theme';

/**
 * The stored choice. Day mode is the default for everyone who hasn't picked
 * night mode, whatever their OS is set to (and when storage is blocked).
 */
export const readTheme = (): Theme => {
  try {
    return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
};

export const storeTheme = (theme: Theme) => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* private mode — the choice just won't survive a reload */
  }
};

/** Applies the theme to <html> and keeps the mobile browser chrome in step. */
export const applyTheme = (theme: Theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'dark' ? '#0e1720' : '#f4eee0');
  return theme;
};
