import { getAllCities } from "./cities"
import { City } from "@/types/city"

export async function getCitiesByOverallScore(): Promise<City[]> {
  const cities = await getAllCities()
  return [...cities].sort((a, b) => b.scores.overall - a.scores.overall)
}
