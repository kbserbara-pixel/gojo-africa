import PropertyCard from "../../components/PropertyCard";
import { apiGet } from "../../lib/api";
import { getLocale } from "../../lib/i18n/server";
import { t } from "../../lib/i18n/translations";

interface PropertyOut {
  id: string;
  title: string;
  price: number;
  currency: string;
  listing_type: string;
  trust_score: number;
  media?: { id: string; url: string }[];
}

export default async function MarketplacePage() {
  const locale = getLocale();
  let properties: PropertyOut[] = [];
  try {
    properties = await apiGet<PropertyOut[]>("/properties");
  } catch {
    // Backend not running yet -- render an empty state instead of crashing.
    properties = [];
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t(locale, "marketplacePage.title")}</h1>
      {properties.length === 0 && (
        <p className="text-gray-500">{t(locale, "marketplacePage.empty")}</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {properties.map((p) => (
          <PropertyCard key={p.id} property={p} locale={locale} />
        ))}
      </div>
    </div>
  );
}
