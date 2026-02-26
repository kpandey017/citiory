import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import RankingList from "@/components/RankingList"
import { getAllCities } from "@/lib/data/cities"
import { getAllKeywordLandings, getCitiesForKeywordLanding, getKeywordLandingBySlug, getRelatedKeywordLandings } from "@/lib/keyword-landings"

interface Params {
  slug: string
}

export function generateStaticParams() {
  return getAllKeywordLandings().map((landing) => ({ slug: landing.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const landing = getKeywordLandingBySlug(slug)
  if (!landing) return {}

  const canonical = `/keywords/${landing.slug}`

  return {
    title: landing.title,
    description: landing.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${landing.title} | Citiory`,
      description: landing.description,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: `${landing.title} | Citiory`,
      description: landing.description,
    },
  }
}

export default async function KeywordLandingPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const landing = getKeywordLandingBySlug(slug)
  if (!landing) notFound()

  const allCities = await getAllCities()
  const cities = getCitiesForKeywordLanding(landing, allCities, 15)
  const relatedKeywordPages = getRelatedKeywordLandings(landing, 4)

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "")
  const pageUrl = `${siteUrl}/keywords/${landing.slug}`

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: landing.title,
    itemListElement: cities.slice(0, 10).map((city, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteUrl}/city/${city.slug}`,
      name: city.name,
    })),
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Keyword Guides",
        item: `${siteUrl}/keywords`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: landing.title,
        item: pageUrl,
      },
    ],
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: landing.faq.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="mb-4 sm:mb-6">
        <Link href="/keywords" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          ← Back to Keyword Guides
        </Link>
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{landing.title}</h1>
      <p className="text-gray-600 mb-3 max-w-4xl">{landing.intro}</p>
      <p className="text-sm text-gray-700 mb-6">
        <span className="font-semibold">Primary keyword:</span> {landing.primaryKeyword}
      </p>

      <RankingList cities={cities} />

      <section className="mt-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">Related keyword pages</h2>
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          {relatedKeywordPages.map((relatedLanding) => (
            <Link
              key={relatedLanding.slug}
              href={`/keywords/${relatedLanding.slug}`}
              className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
            >
              <p className="font-medium text-gray-900 mb-1">{relatedLanding.title}</p>
              <p className="text-sm text-gray-600">{relatedLanding.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {landing.relatedTopicSlug ? (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <Link href={`/topics/${landing.relatedTopicSlug}`} className="text-blue-600 font-medium hover:text-blue-700">
            Explore related topic hub →
          </Link>
        </div>
      ) : null}
    </main>
  )
}
