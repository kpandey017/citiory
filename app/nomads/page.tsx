import { getAllCities } from "@/lib/data/cities"
import { calculateNomadScore } from "@/lib/scoring"
import RankingList from "@/components/RankingList"

export const metadata = {
  title: "Digital Nomads | Citiory",
  description: "Top cities for digital nomads based on scores and cost",
}

export default async function NomadsPage() {
  const cities = await getAllCities()
  const sorted = [...cities].sort(
    (a, b) => calculateNomadScore(b) - calculateNomadScore(a)
  )
  return (
    <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Best Cities for Digital Nomads</h1>
      <RankingList cities={sorted} />
    </main>
  )
}
