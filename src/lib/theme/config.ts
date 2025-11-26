export type ThemePreference = "light" | "dark";

export const THEME_COOKIE = "theme";
export const DEFAULT_THEME: ThemePreference = "light";

export function isTheme(value: string | undefined): value is ThemePreference {
  return value === "light" || value === "dark";
}
