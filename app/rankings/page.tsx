import { getCitiesByOverallScore } from "@/lib/data/rankings"
import RankingList from "@/components/RankingList"

export const metadata = {
  title: "Rankings | Citiory",
  description: "Rank cities by overall score",
}

export default async function RankingsPage() {
  const cities = await getCitiesByOverallScore()
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "")

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Top Ranked Cities",
    itemListElement: cities.slice(0, 10).map((city, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteUrl}/city/${city.slug}`,
      name: city.name,
    })),
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How are cities ranked on this page?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cities are ranked by an overall score that balances affordability, safety, infrastructure, climate, and quality-of-life indicators.",
        },
      },
      {
        "@type": "Question",
        name: "Should I rely only on the overall ranking?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use this list as a starting point, then validate your shortlist using category rankings and full city profiles based on your priorities.",
        },
      },
      {
        "@type": "Question",
        name: "Can I compare top ranked cities directly?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. After shortlisting from rankings, use the compare pages to evaluate city pairs side by side before making final decisions.",
        },
      },
    ],
    url: `${siteUrl}/rankings`,
  }

  return (
    <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Rankings</h1>
      <p className="text-gray-600 mb-6 max-w-3xl">
        This ranking index orders cities by overall performance across affordability, safety, infrastructure, climate, and quality-of-life
        indicators. It is designed for fast shortlisting before you review deeper city-level details.
      </p>
      <RankingList cities={cities} />

      <section className="mt-10 sm:mt-12 prose prose-gray max-w-3xl">
        <h2>What These Rankings Mean</h2>
        <p>
          Higher-ranked cities balance multiple factors rather than excelling in just one metric. That helps avoid choices that look good
          on a single score but underperform in daily livability.
        </p>
        <p>
          Use this page as a starting point, then validate your top options on category pages such as digital nomad, safety, or budget-focused
          rankings based on your personal priorities.
        </p>
      </section>
    </main>
  )
}
