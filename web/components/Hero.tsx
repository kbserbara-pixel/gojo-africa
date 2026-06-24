import Image from "next/image";
import Link from "next/link";

/**
 * Homepage hero: a light emerald-to-white gradient background (replacing
 * the earlier dark photo-scrim treatment) with the gojo photo presented as
 * a contained, shadowed card rather than a full-bleed dark-overlaid
 * background. Bilingual welcome headline sits beside the photo on desktop
 * and stacks above it on mobile. The gold "Try AI House Hunter" CTA is the
 * one accent-colored element here, so it pops against the green primary
 * button next to it.
 *
 * Photo lives at `web/public/images/hero-gojo.png` -- Next/Image needs it
 * inside the `public/` folder to serve it at that URL path.
 */
export default function Hero() {
  return (
    <section className="w-full rounded-2xl bg-gradient-to-b from-emerald-50 via-white to-white mb-12">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-6 py-10 sm:px-10 md:grid-cols-2 md:py-14">
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold leading-tight text-emerald-900 sm:text-4xl md:text-5xl">
            Welcome to Gojo Africa
          </h1>
          <p className="mt-1 text-lg font-semibold text-emerald-700 sm:text-xl md:text-2xl">
            Your Gateway to Ethiopian Housing
          </p>
          <p
            lang="am"
            className="mt-4 text-base font-semibold leading-snug text-emerald-800 sm:text-lg md:text-xl"
          >
            እንኳን ወደ ጎጆ አፍሪካ በደህና መጡ — ለኢትዮጵያ ቤቶች መዳረሻዎ
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <Link href="/marketplace" className="btn-primary">
              Browse Properties
            </Link>
            <Link href="/ai-hunter" className="btn-accent">
              Try AI House Hunter
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-emerald-900/5">
          <Image
            src="/images/hero-gojo.png"
            alt="A traditional thatched-roof gojo home in Ethiopia, with three women in traditional dress standing at the entrance"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
