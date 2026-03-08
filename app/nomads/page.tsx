import { getAllCities } from "@/lib/data/cities"
import { calculateNomadScore } from "@/lib/scoring"
import RankingList from "@/components/RankingList"

export const metadata = {
  title: "Digital Nomads | Citiory",
  description: "Top cities for digital nomads based on scores and cost",
}

export default async function NomadsPage() {
  const cities = await getAllCities()
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "")
  const sorted = [...cities].sort(
    (a, b) => calculateNomadScore(b) - calculateNomadScore(a)
  )

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What makes a city good for digital nomads?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Strong internet, manageable living costs, safety, healthcare access, and daily convenience are key factors in the nomad score.",
        },
      },
      {
        "@type": "Question",
        name: "How should I choose between top nomad cities?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Start with your non-negotiables like budget or time zone, then compare your finalists on city profiles and the side-by-side compare page.",
        },
      },
      {
        "@type": "Question",
        name: "Does this ranking focus only on low cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Cost matters, but the ranking balances multiple dimensions so cities are evaluated for sustainable remote-work livability.",
        },
      },
    ],
    url: `${siteUrl}/nomads`,
  }

  return (
    <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Best Cities for Digital Nomads</h1>
      <p className="text-gray-600 mb-6 max-w-3xl">
        Discover destinations optimized for remote workers with a balanced mix of affordability, reliable internet, safety, and lifestyle
        quality. This list helps you identify cities where long-term nomad living is practical, not just trendy.
      </p>
      <RankingList cities={sorted} />

      <section className="mt-10 sm:mt-12 prose prose-gray max-w-3xl">
        <h2>Choosing A Nomad-Friendly City</h2>
        <p>
          Start with your non-negotiables such as time zone compatibility, monthly budget, or healthcare access. Then compare your top
          options for climate and everyday convenience.
        </p>
        <p>
          After shortlisting cities here, open each city page to review detailed data points and use the compare tool for direct side-by-side
          decisions.
        </p>
      </section>
    </main>
  )
}
