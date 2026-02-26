import { cities } from "@/config/cities"
import { City } from "@/types/city"

export async function getAllCities(): Promise<City[]> {
  return cities
}

export async function getCityBySlug(slug: string): Promise<City | undefined> {
  return cities.find((city) => city.slug === slug)
}
