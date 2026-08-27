export type ThemeName = "day" | "night";

export const THEME_STORAGE_KEY = "sky-theme";

export function readStoredTheme(): ThemeName | null {
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY);
    return v === "day" || v === "night" ? v : null;
  } catch {
    return null;
  }
}

export function applyTheme(name: ThemeName): void {
  document.documentElement.dataset.theme = name;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, name);
  } catch {
    // storage unavailable — theme choice just won't persist
  }
}
