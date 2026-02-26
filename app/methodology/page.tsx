import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Methodology",
  description: "How Citiory calculates city rankings, validates sources, and updates data quality over time.",
  alternates: {
    canonical: "/methodology",
  },
}

export default function MethodologyPage() {
  return (
    <main className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Methodology</h1>
      <p className="text-gray-700 mb-6">
        Citiory rankings are based on structured city metrics and verified source references. We prioritize clarity, repeatability,
        and regular updates over one-time snapshots.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">How scores are calculated</h2>
        <p className="text-gray-700">
          Overall city score is the arithmetic mean of safety, pollution, internet, quality of life, job market, healthcare,
          and climate scores. Category rankings then sort cities by the most relevant metric for that category.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Source policy</h2>
        <p className="text-gray-700 mb-2">
          Every city metric is linked to a source reference with provider and as-of date. We avoid synthetic placeholder values in
          published city records.
        </p>
        <p className="text-gray-700">
          When city-level values are unavailable, we clearly note proxies and keep provenance visible in city data.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Refresh cadence</h2>
        <p className="text-gray-700">
          Blog content is reviewed every 30 days. City source records are refreshed as new updates are available from upstream providers.
        </p>
      </section>

      <div className="pt-4 border-t border-gray-200">
        <Link href="/blog" className="text-blue-600 font-medium hover:text-blue-700">
          Explore guides and blog articles →
        </Link>
      </div>
    </main>
  )
}
