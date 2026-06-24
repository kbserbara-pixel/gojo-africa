"use client";
import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Locale, t as translate } from "./translations";
import { LOCALE_COOKIE } from "./cookie";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string, vars?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * Wraps the app (mounted once in app/layout.tsx) so any Client Component,
 * however deeply nested, can read/change the current language. Server
 * Components (marketplace, property detail, dashboard, home) can't see
 * this context -- they read the same locale independently via
 * lib/i18n/server.ts's getLocale(), which reads the same cookie.
 */
export function LanguageProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const router = useRouter();

  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState(next);
      document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000`;
      // Re-fetch Server Components (marketplace, property detail, dashboard,
      // home, layout nav) so they pick up the new locale cookie too.
      router.refresh();
    },
    [router]
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      t: (path, vars) => translate(locale, path, vars),
    }),
    [locale, setLocale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage() must be used within a <LanguageProvider>");
  }
  return ctx;
}
