import Link from "next/link";
import { getLocale } from "../lib/i18n/server";
import { t } from "../lib/i18n/translations";
import Hero from "../components/Hero";
import DailyQuoteModal from "../components/DailyQuoteModal";

const MODULE_KEYS = [
  "marketplace",
  "aiHunter",
  "neighborhood",
  "verification",
  "housemates",
  "diaspora",
  "services",
  "analytics",
] as const;

const MODULE_ROUTES: Record<(typeof MODULE_KEYS)[number], string> = {
  marketplace: "/marketplace",
  aiHunter: "/ai-hunter",
  neighborhood: "/neighborhoods",
  verification: "/verification",
  housemates: "/housemates",
  diaspora: "/diaspora",
  services: "/services",
  analytics: "/dashboard",
};

export default function HomePage() {
  const locale = getLocale();

  return (
    <div>
      <DailyQuoteModal heading={t(locale, "dailyQuote.heading")} continueLabel={t(locale, "dailyQuote.continue")} />
      <Hero />
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold text-emerald-800">{t(locale, "home.heading")}</h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">{t(locale, "home.subheading")}</p>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {MODULE_KEYS.map((key) => {
          const isAi = key === "aiHunter";
          return (
            <Link
              key={key}
              href={MODULE_ROUTES[key]}
              className={`block border rounded-lg p-4 bg-white transition ${
                isAi ? "card-highlight-accent" : "hover:shadow-md hover:border-emerald-300"
              }`}
            >
              <h3 className="font-semibold text-emerald-700 flex items-center gap-2">
                {t(locale, `home.modules.${key}.title`)}
                {isAi && <span className="badge-accent">AI</span>}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{t(locale, `home.modules.${key}.desc`)}</p>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
