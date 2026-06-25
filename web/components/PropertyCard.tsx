import TrustBadge from "./TrustBadge";
import { Locale, t } from "../lib/i18n/translations";

interface Props {
  property: {
    id: string;
    title: string;
    price: number;
    currency: string;
    listing_type: string;
    trust_score: number;
    media?: { id: string; url: string }[];
  };
  locale?: Locale;
}

export default function PropertyCard({ property, locale = "en" }: Props) {
  const thumbnail = property.media?.[0]?.url;
  return (
    <a href={`/property/${property.id}`} className="block border rounded-lg overflow-hidden bg-white hover:shadow-md transition">
      {thumbnail && <img src={thumbnail} alt={property.title} className="w-full h-36 object-cover" />}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold">{property.title}</h3>
          <TrustBadge score={property.trust_score} locale={locale} />
        </div>
        <p className="text-sm text-gray-500 mt-1">{t(locale, `listingTypes.${property.listing_type}`)}</p>
        <p className="font-medium mt-2">{property.price} {property.currency}</p>
      </div>
    </a>
  );
}
