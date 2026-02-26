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

  return (
    <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Rankings</h1>
      <RankingList cities={cities} />
    </main>
  )
}
