import { City } from "@/types/city"

export function calculateNomadScore(city: City): number {
  return (
    city.scores.internet * 0.3 +
    city.scores.safety * 0.2 +
    city.scores.qualityOfLife * 0.3 +
    (10 - city.cost.single / 500) * 0.2
  )
}
