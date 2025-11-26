import { cookies } from "next/headers";
import { DEFAULT_THEME, THEME_COOKIE, ThemePreference, isTheme } from "./config";

export async function getServerTheme(): Promise<ThemePreference> {
  const cookieStore = await cookies();
  const stored = cookieStore.get(THEME_COOKIE)?.value;
  if (isTheme(stored)) {
    return stored;
  }
  return DEFAULT_THEME;
}
