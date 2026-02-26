import { City } from "@/types/city"

export function filterByCategory(cities: City[], category: string): City[] {
  switch (category) {
    case "overall":
      return [...cities].sort((a, b) => b.scores.overall - a.scores.overall)
    case "cheapest":
      return [...cities].sort((a, b) => a.cost.single - b.cost.single)
    case "safest":
      return [...cities].sort((a, b) => b.scores.safety - a.scores.safety)
    case "digital-nomads":
      return [...cities].sort(
        (a, b) => calculateNomadScore(b) - calculateNomadScore(a)
      )
    case "best-internet":
      return [...cities].sort((a, b) => b.scores.internet - a.scores.internet)
    case "best-healthcare":
      return [...cities].sort((a, b) => b.scores.healthcare - a.scores.healthcare)
    case "best-climate":
      return [...cities].sort((a, b) => b.scores.climate - a.scores.climate)
    case "lowest-pollution":
      return [...cities].sort((a, b) => b.scores.pollution - a.scores.pollution)
    case "best-job-market":
      return [...cities].sort((a, b) => b.scores.job - a.scores.job)
    default:
      return cities
  }
}

// ensure we import calculateNomadScore
import { calculateNomadScore } from "./scoring"
