import "../styles/globals.css";
import Link from "next/link";
import AuthNav from "../components/AuthNav";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { LanguageProvider } from "../lib/i18n/LanguageContext";
import { getLocale } from "../lib/i18n/server";
import { t } from "../lib/i18n/translations";

export const metadata = {
  title: "Gojo Africa",
  description: "The trusted housing ecosystem for Africa.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = getLocale();

  return (
    <html lang={locale}>
      <body>
        <LanguageProvider initialLocale={locale}>
          <header className="flex items-center justify-between px-8 py-4 border-b">
            <Link href="/" className="font-bold text-xl text-emerald-700">Gojo Africa</Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/marketplace">{t(locale, "nav.marketplace")}</Link>
              <Link href="/ai-hunter">{t(locale, "nav.aiHunter")}</Link>
              <Link href="/dashboard">{t(locale, "nav.analytics")}</Link>
              <AuthNav />
              <LanguageSwitcher />
            </nav>
          </header>
          <main className="px-8 py-6">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}
