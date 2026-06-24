"use client";
import { useEffect, useState } from "react";
import { getQuoteOfTheDay } from "../lib/quotes";

interface Props {
  heading: string;
  continueLabel: string;
}

/**
 * "Digital companion" pop-out version of the daily quote: opens automatically
 * as a centered modal with a blurred backdrop the moment the login/signup
 * page mounts, then dismisses via the Continue button (or Escape / backdrop
 * click) so the user lands on the form underneath. Quote selection logic is
 * untouched -- see lib/quotes.ts (UTC day-of-year mod list length).
 */
export default function DailyQuoteModal({ heading, continueLabel }: Props) {
  const [open, setOpen] = useState(true);
  const quote = getQuoteOfTheDay();

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="daily-quote-heading"
      className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-950/40 px-4 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-l-4 border-gold-400 pl-4">
          <p id="daily-quote-heading" className="text-xs font-semibold uppercase tracking-wide text-gold-600">
            {heading}
          </p>
          <p className="mt-2 text-base font-medium leading-relaxed text-emerald-900">
            &ldquo;{quote.en}&rdquo;
          </p>
          <p lang="am" className="mt-2 text-sm italic leading-snug text-emerald-700">
            {quote.am}
          </p>
        </div>
        <button type="button" onClick={() => setOpen(false)} className="btn-primary mt-6 w-full">
          {continueLabel}
        </button>
      </div>
    </div>
  );
}
