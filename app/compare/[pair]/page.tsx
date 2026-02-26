import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import CompareTable from "@/components/CompareTable"
import { getAllCities } from "@/lib/data/cities"
import { getComparableCityPairs, parseComparePairSlug } from "@/lib/compare-seo"

interface Params {
  pair: string
}

export async function generateStaticParams() {
  const allCities = await getAllCities()
  const pairs = getComparableCityPairs(allCities, 180)
  return pairs.map((pair) => ({ pair: `${pair.citySlugA}-vs-${pair.citySlugB}` }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { pair } = await params
  const parsed = parseComparePairSlug(pair)
  if (!parsed) return {}

  const allCities = await getAllCities()
  const cityA = allCities.find((city) => city.slug === parsed.citySlugA)
  const cityB = allCities.find((city) => city.slug === parsed.citySlugB)
  if (!cityA || !cityB) return {}

  const title = `${cityA.name} vs ${cityB.name}`
  const description = `Compare ${cityA.name} and ${cityB.name} for cost of living, safety, internet, healthcare, jobs, climate, and quality of life.`
  const canonical = `/compare/${pair}`

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${title} | Citiory`,
      description,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Citiory`,
      description,
    },
  }
}

export default async function ComparePairPage({ params }: { params: Promise<Params> }) {
  const { pair } = await params
  const parsed = parseComparePairSlug(pair)
  if (!parsed) notFound()

  const allCities = await getAllCities()
  const cityA = allCities.find((city) => city.slug === parsed.citySlugA)
  const cityB = allCities.find((city) => city.slug === parsed.citySlugB)

  if (!cityA || !cityB) notFound()

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "")
  const pageUrl = `${siteUrl}/compare/${pair}`

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Compare Cities",
        item: `${siteUrl}/compare`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: `${cityA.name} vs ${cityB.name}`,
        item: pageUrl,
      },
    ],
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Which city is cheaper: ${cityA.name} or ${cityB.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:
            cityA.cost.single <= cityB.cost.single
              ? `${cityA.name} has a lower estimated monthly cost for a single person (${cityA.cost.single}) than ${cityB.name} (${cityB.cost.single}).`
              : `${cityB.name} has a lower estimated monthly cost for a single person (${cityB.cost.single}) than ${cityA.name} (${cityA.cost.single}).`,
        },
      },
      {
        "@type": "Question",
        name: `Which city has higher internet performance: ${cityA.name} or ${cityB.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:
            cityA.infrastructure.internetSpeedMbps >= cityB.infrastructure.internetSpeedMbps
              ? `${cityA.name} has higher average internet speed (${cityA.infrastructure.internetSpeedMbps} Mbps) compared with ${cityB.name} (${cityB.infrastructure.internetSpeedMbps} Mbps).`
              : `${cityB.name} has higher average internet speed (${cityB.infrastructure.internetSpeedMbps} Mbps) compared with ${cityA.name} (${cityA.infrastructure.internetSpeedMbps} Mbps).`,
        },
      },
      {
        "@type": "Question",
        name: `How do ${cityA.name} and ${cityB.name} compare overall?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:
            cityA.scores.overall >= cityB.scores.overall
              ? `${cityA.name} currently has a higher overall score (${cityA.scores.overall}) than ${cityB.name} (${cityB.scores.overall}).`
              : `${cityB.name} currently has a higher overall score (${cityB.scores.overall}) than ${cityA.name} (${cityA.scores.overall}).`,
        },
      },
    ],
  }

  return (
    <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="mb-4 sm:mb-6">
        <Link href="/compare" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          ← Back to Compare Cities
        </Link>
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{cityA.name} vs {cityB.name}</h1>
      <p className="text-gray-600 mb-4 sm:mb-6 max-w-3xl">
        Side-by-side comparison across affordability, safety, internet quality, healthcare, jobs, and livability.
      </p>

      <CompareTable cityA={cityA} cityB={cityB} />
    </main>
  )
}