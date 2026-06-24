"use client";
import { LOCALES } from "../lib/i18n/translations";
import { useLanguage } from "../lib/i18n/LanguageContext";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-1 text-sm border rounded-full p-0.5">
      {LOCALES.map((l) => (
        <button
          key={l.code}
          onClick={() => setLocale(l.code)}
          aria-pressed={locale === l.code}
          className={`px-2.5 py-1 rounded-full transition ${
            locale === l.code ? "bg-emerald-700 text-white" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
