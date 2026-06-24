import { cookies } from "next/headers";
import type { Locale } from "./translations";
import { LOCALE_COOKIE } from "./cookie";

/**
 * Server-side locale resolution for Server Components (marketplace,
 * property detail, dashboard, home, root layout). Reads the same cookie
 * that LanguageSwitcher writes on the client, so switching language and
 * triggering a refresh re-renders these pages in the new language too.
 */
export function getLocale(): Locale {
  const value = cookies().get(LOCALE_COOKIE)?.value;
  return value === "am" ? "am" : "en";
}
