import { getLocale } from "../../lib/i18n/server";
import { t } from "../../lib/i18n/translations";

export default function DashboardPage() {
  const locale = getLocale();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t(locale, "dashboardPage.title")}</h1>
      <p className="text-gray-600">
        {t(locale, "dashboardPage.description")}
        <code className="mx-1">/analytics/trends/:neighborhood_id</code> and
        <code className="mx-1">/analytics/predict-price/:neighborhood_id</code>.
      </p>
    </div>
  );
}
