import { getLocale } from "../../lib/i18n/server";
import { t } from "../../lib/i18n/translations";

const SECTION_KEYS = [
  "collect",
  "use",
  "location",
  "sharing",
  "security",
  "rights",
  "children",
  "changes",
  "contact",
] as const;

export default function PrivacyPage() {
  const locale = getLocale();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-1">{t(locale, "legalPrivacyPage.title")}</h1>
      <p className="text-sm text-gray-500 mb-6">{t(locale, "legalPrivacyPage.updated")}</p>
      <p className="text-gray-700 mb-8">{t(locale, "legalPrivacyPage.intro")}</p>
      <div className="space-y-6">
        {SECTION_KEYS.map((key) => (
          <section key={key}>
            <h2 className="text-lg font-semibold mb-2">{t(locale, `legalPrivacyPage.sections.${key}.title`)}</h2>
            <p className="text-gray-700">{t(locale, `legalPrivacyPage.sections.${key}.body`)}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
