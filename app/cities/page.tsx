import { getAllCities } from "@/lib/data/cities"
import CityList from "@/components/CityList"

export const metadata = {
  title: "Cities | Citiory",
  description: "Browse all cities featured on Citiory",
}

export default async function CitiesPage() {
  const cities = await getAllCities()
  return (
    <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">All Cities</h1>
      <CityList cities={cities} />
    </main>
  )
}
