import NeighborhoodScore from "../../../components/NeighborhoodScore";
import TrustBadge from "../../../components/TrustBadge";
import { apiGet } from "../../../lib/api";
import { getLocale } from "../../../lib/i18n/server";
import { t } from "../../../lib/i18n/translations";

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const locale = getLocale();
  let property: any = null;
  try {
    property = await apiGet(`/properties/${params.id}`);
  } catch {
    property = null;
  }

  if (!property) {
    return <p className="text-gray-500">{t(locale, "propertyDetail.notFound")}</p>;
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{property.title}</h1>
        <TrustBadge score={property.trust_score} locale={locale} />
      </div>
      <p className="text-lg mt-2">{property.price} {property.currency}</p>
      {(property.bedrooms || property.bathrooms || property.area_sqm) && (
        <p className="text-sm text-gray-600 mt-1">
          {[
            property.bedrooms ? `${property.bedrooms} ${t(locale, "propertyDetail.bed")}` : null,
            property.bathrooms ? `${property.bathrooms} ${t(locale, "propertyDetail.bath")}` : null,
            property.area_sqm ? `${property.area_sqm} ${t(locale, "propertyDetail.sqm")}` : null,
          ].filter(Boolean).join(" · ")}
        </p>
      )}
      {property.address && <p className="text-sm text-gray-500 mt-1">{property.address}</p>}
      {property.description && <p className="mt-4">{property.description}</p>}

      {property.media && property.media.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {property.media.map((m: { id: string; url: string }) => (
            <img key={m.id} src={m.url} alt={property.title} className="w-full h-40 object-cover rounded-lg border" />
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-3">
        {property.contact_phone && (
          <a
            href={`tel:${property.contact_phone}`}
            className="bg-emerald-700 text-white rounded-lg px-4 py-2 text-sm inline-block"
          >
            {t(locale, "propertyDetail.call", { phone: property.contact_phone })}
          </a>
        )}
        {property.latitude != null && property.longitude != null && (
          <a
            href={`https://www.openstreetmap.org/?mlat=${property.latitude}&mlon=${property.longitude}#map=16/${property.latitude}/${property.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-emerald-700 text-emerald-700 rounded-lg px-4 py-2 text-sm inline-block"
          >
            {t(locale, "propertyDetail.viewOnMap")}
          </a>
        )}
      </div>

      <div className="mt-6">
        <NeighborhoodScore neighborhoodId={property.neighborhood_id} />
      </div>
    </div>
  );
}
