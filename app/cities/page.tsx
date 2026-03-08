import { getAllCities } from "@/lib/data/cities"
import CityList from "@/components/CityList"

export const metadata = {
  title: "Cities | Citiory",
  description: "Browse all cities featured on Citiory",
}

export default async function CitiesPage() {
  const cities = await getAllCities()
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "")

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What data can I compare for each city?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Each city profile includes core indicators such as cost of living, safety, climate comfort, internet quality, and healthcare-related scoring.",
        },
      },
      {
        "@type": "Question",
        name: "How should I shortlist cities on this page?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Start by selecting three to five cities that match your budget and work needs, then verify tradeoffs on detailed city pages and comparison routes.",
        },
      },
      {
        "@type": "Question",
        name: "Is this city list updated for consistent comparisons?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, city entries use a standardized model so metrics remain consistent across profiles, rankings, and side-by-side comparisons.",
        },
      },
    ],
    url: `${siteUrl}/cities`,
  }

  return (
    <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">All Cities</h1>
      <p className="text-gray-600 mb-6 max-w-3xl">
        Explore city profiles with standardized data for cost of living, safety, climate comfort, internet quality, and healthcare.
        Use this page to quickly shortlist locations before opening detailed city pages or side-by-side comparisons.
      </p>
      <CityList cities={cities} />

      <section className="mt-10 sm:mt-12 prose prose-gray max-w-3xl">
        <h2>How To Use This City Directory</h2>
        <p>
          Each city in this list links to a full profile with consistent scoring dimensions. That makes it easier to compare locations
          objectively without switching between different data formats.
        </p>
        <p>
          If you are planning a move, start by selecting three to five cities that match your budget and work style, then verify tradeoffs
          using the compare view and ranking pages.
        </p>
      </section>
    </main>
  )
}
