import { getAllCities } from "@/lib/data/cities"
import CompareTable from "@/components/CompareTable"
import Link from "next/link"
import type { Metadata } from "next"
import { buildComparePairSlug, getComparableCityPairs } from "@/lib/compare-seo"

interface Props {
  searchParams: Promise<{ cityA?: string; cityB?: string }>
}

export const metadata: Metadata = {
  title: "Compare Cities | Citiory",
  description: "Compare two cities side by side for cost of living, safety, climate, internet, jobs, and healthcare.",
  alternates: {
    canonical: "/compare",
  },
}

export default async function ComparePage({ searchParams }: Props) {
  const { cityA, cityB } = await searchParams
  const allCities = await getAllCities()
  const popularPairs = getComparableCityPairs(allCities, 12)
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "")

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Popular City Comparisons",
    itemListElement: popularPairs.map((pair, index) => {
      const firstCity = allCities.find((city) => city.slug === pair.citySlugA)
      const secondCity = allCities.find((city) => city.slug === pair.citySlugB)

      return {
        "@type": "ListItem",
        position: index + 1,
        name: firstCity && secondCity ? `${firstCity.name} vs ${secondCity.name}` : `${pair.citySlugA} vs ${pair.citySlugB}`,
        url: `${siteUrl}/compare/${buildComparePairSlug(pair.citySlugA, pair.citySlugB)}`,
      }
    }),
  }

  if (allCities.length < 2) {
    return (
      <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Compare Cities</h1>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 sm:p-6">
          <p className="text-gray-700">Add at least two cities to enable comparisons.</p>
          <Link href="/cities" className="inline-block mt-3 text-blue-600 hover:text-blue-700 font-medium">
            Browse Cities →
          </Link>
        </div>
      </main>
    )
  }

  const defaultCityA = allCities[0]
  const defaultCityB = allCities.find((city) => city.slug !== defaultCityA.slug) ?? allCities[1]

  const cityDataA = allCities.find((city) => city.slug === cityA) ?? defaultCityA
  let cityDataB = allCities.find((city) => city.slug === cityB) ?? defaultCityB

  if (cityDataA.slug === cityDataB.slug) {
    cityDataB = allCities.find((city) => city.slug !== cityDataA.slug) ?? defaultCityB
  }

  return (
    <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Compare Cities</h1>

      <form method="get" className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 md:p-6 mb-6 shadow-sm">
        <div className="grid md:grid-cols-3 gap-3 sm:gap-4 items-end">
          <div>
            <label htmlFor="cityA" className="block text-sm font-medium text-gray-700 mb-2">
              City A
            </label>
            <select
              id="cityA"
              name="cityA"
              defaultValue={cityDataA.slug}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {allCities.map((city) => (
                <option key={`a-${city.slug}`} value={city.slug}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="cityB" className="block text-sm font-medium text-gray-700 mb-2">
              City B
            </label>
            <select
              id="cityB"
              name="cityB"
              defaultValue={cityDataB.slug}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {allCities.map((city) => (
                <option key={`b-${city.slug}`} value={city.slug}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full md:w-auto inline-flex items-center justify-center rounded-lg bg-blue-600 text-white px-4 py-2.5 text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Compare
          </button>
        </div>

        <p className="text-xs sm:text-sm text-gray-500 mt-3">Pick any two cities and click Compare. No URL editing needed.</p>
      </form>

      <CompareTable cityA={cityDataA} cityB={cityDataB} />

      <section className="mt-8 sm:mt-10">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">Popular city comparisons</h2>
        <div className="flex flex-wrap gap-2">
          {popularPairs.map((pair) => {
            const firstCity = allCities.find((city) => city.slug === pair.citySlugA)
            const secondCity = allCities.find((city) => city.slug === pair.citySlugB)
            if (!firstCity || !secondCity) return null

            const pairSlug = buildComparePairSlug(firstCity.slug, secondCity.slug)

            return (
              <Link
                key={pairSlug}
                href={`/compare/${pairSlug}`}
                className="px-3 py-2 text-sm bg-gray-100 text-gray-800 rounded-lg hover:bg-blue-100 hover:text-blue-800 transition-colors"
              >
                {firstCity.name} vs {secondCity.name}
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}
