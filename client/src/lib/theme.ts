export type Theme = 'light' | 'dark' | 'system';

export const THEME_KEY = 'mb-theme';

/** What the OS is asking for right now. */
export const systemTheme = (): 'light' | 'dark' =>
  window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

/** The stored preference, or 'system' when none has been made (or storage is blocked). */
export const readTheme = (): Theme => {
  try {
    const v = localStorage.getItem(THEME_KEY);
    return v === 'light' || v === 'dark' ? v : 'system';
  } catch {
    return 'system';
  }
};

export const storeTheme = (theme: Theme) => {
  try {
    if (theme === 'system') localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* private mode — the choice just won't survive a reload */
  }
};

/**
 * Applies the theme to <html>. 'system' removes the attribute entirely so the
 * prefers-color-scheme media query takes over, which is what keeps the toggle
 * honest when the OS flips at sunset.
 */
export const applyTheme = (theme: Theme) => {
  const root = document.documentElement;

  if (theme === 'system') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', theme);

  const effective = theme === 'system' ? systemTheme() : theme;

  // Keep the mobile browser chrome in step with the page.
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', effective === 'dark' ? '#0e1720' : '#f4eee0');

  return effective;
};
