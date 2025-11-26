import { cookies } from "next/headers";
import { DEFAULT_THEME, THEME_COOKIE, ThemePreference, isTheme } from "./config";

export function getServerTheme(): ThemePreference {
  const stored = cookies().get(THEME_COOKIE)?.value;
  if (isTheme(stored)) {
    return stored;
  }
  return DEFAULT_THEME;
}
