import NeighborhoodScore from "../../components/NeighborhoodScore";
import { apiGet } from "../../lib/api";
import { getLocale } from "../../lib/i18n/server";
import { t } from "../../lib/i18n/translations";

interface NeighborhoodOut {
  id: string;
  name: string;
  city: string;
}

export default async function NeighborhoodsPage() {
  const locale = getLocale();
  let neighborhoods: NeighborhoodOut[] = [];
  try {
    neighborhoods = await apiGet<NeighborhoodOut[]>("/neighborhoods");
  } catch {
    // Backend not running yet -- render an empty state instead of crashing.
    neighborhoods = [];
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t(locale, "neighborhoodsPage.title")}</h1>
      {neighborhoods.length === 0 && (
        <p className="text-gray-500">{t(locale, "neighborhoodsPage.empty")}</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {neighborhoods.map((n) => (
          <NeighborhoodScore key={n.id} neighborhoodId={n.id} />
        ))}
      </div>
    </div>
  );
}
