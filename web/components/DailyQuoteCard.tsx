import { getQuoteOfTheDay } from "../lib/quotes";

interface Props {
  /**
   * Heading label (e.g. result of t("dailyQuote.heading")). Passed in so
   * this stays a plain presentational component -- the locale-aware lookup
   * stays with the page, which already has useLanguage().
   */
  heading: string;
}

/**
 * Minimalist "digital companion" card for the login/signup pages: one
 * curated quote per day, the same for every user, shown in English and
 * Amharic together (matching the homepage hero's bilingual treatment).
 * Styled to feel like a quiet moment before the day's tasks, not another
 * marketing module -- soft card, no imagery, a single gold accent line.
 */
export default function DailyQuoteCard({ heading }: Props) {
  const quote = getQuoteOfTheDay();

  return (
    <div className="mb-6 rounded-2xl border border-emerald-100 bg-white/70 p-5 shadow-sm">
      <div className="border-l-4 border-gold-400 pl-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">{heading}</p>
        <p className="mt-2 text-base font-medium leading-relaxed text-emerald-900">
          &ldquo;{quote.en}&rdquo;
        </p>
        <p lang="am" className="mt-2 text-sm italic leading-snug text-emerald-700">
          {quote.am}
        </p>
      </div>
    </div>
  );
}
