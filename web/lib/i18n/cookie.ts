/**
 * Shared between server.ts (Server Components, uses next/headers) and
 * LanguageContext.tsx (a Client Component). Kept in its own file with NO
 * next/headers import so Client Components can read the cookie name
 * without accidentally pulling server-only code into the client bundle.
 */
export const LOCALE_COOKIE = "nf_locale";
