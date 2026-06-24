import { Locale, t } from "../lib/i18n/translations";

export default function TrustBadge({ score, locale = "en" }: { score: number; locale?: Locale }) {
  const color = score >= 70 ? "bg-emerald-100 text-emerald-700" : score >= 40 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700";
  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${color}`}>
      {t(locale, "trustBadge.label", { score: Math.round(score) })}
    </span>
  );
}
