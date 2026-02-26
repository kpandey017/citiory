import { keywordLandings, type KeywordLanding } from "@/config/keyword-landings"
import type { City } from "@/types/city"
import { calculateNomadScore } from "@/lib/scoring"

export function getAllKeywordLandings(): KeywordLanding[] {
  return keywordLandings
}

export function getKeywordLandingBySlug(slug: string): KeywordLanding | undefined {
  return keywordLandings.find((landing) => landing.slug === slug)
}

export function getRelatedKeywordLandings(current: KeywordLanding, limit = 4): KeywordLanding[] {
  const scored = keywordLandings
    .filter((landing) => landing.slug !== current.slug)
    .map((landing) => {
      let score = 0

      if (landing.mode === current.mode) score += 3
      if (landing.relatedTopicSlug && current.relatedTopicSlug && landing.relatedTopicSlug === current.relatedTopicSlug) {
        score += 2
      }

      return { landing, score }
    })
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, limit).map((entry) => entry.landing)
}

function rankForMode(city: City, mode: KeywordLanding["mode"]): number {
  if (mode === "remote-budget") {
    return calculateNomadScore(city) + city.scores.internet + city.scores.qualityOfLife
  }
  if (mode === "cheap-fast-internet") {
    return city.scores.internet * 2 + city.scores.safety + city.scores.qualityOfLife - city.cost.single / 300
  }
  if (mode === "safe-healthcare") {
    return city.scores.safety * 2 + city.scores.healthcare * 2 + city.scores.qualityOfLife
  }
  if (mode === "clean-air-jobs") {
    return city.scores.pollution * 2 + city.scores.job * 2 + city.scores.qualityOfLife
  }

  return city.scores.job * 2 + city.scores.internet * 2 + city.scores.qualityOfLife + city.scores.safety
}

function includeForMode(city: City, mode: KeywordLanding["mode"]): boolean {
  if (mode === "remote-budget") {
    return city.cost.single <= 2000 && city.scores.internet >= 7.5 && city.scores.qualityOfLife >= 7.0
  }
  if (mode === "cheap-fast-internet") {
    return city.continent === "Europe" && city.scores.internet >= 8.5
  }
  if (mode === "safe-healthcare") {
    return city.scores.safety >= 7.4 && city.scores.healthcare >= 7.8
  }
  if (mode === "clean-air-jobs") {
    return city.scores.pollution >= 7.0 && city.scores.job >= 7.2
  }

  return city.scores.job >= 7.5 && city.scores.internet >= 8.0 && city.scores.qualityOfLife >= 7.4
}

export function getCitiesForKeywordLanding(landing: KeywordLanding, cities: City[], limit = 15): City[] {
  const matching = cities.filter((city) => includeForMode(city, landing.mode))
  const source = matching.length >= 6 ? matching : cities

  return [...source]
    .sort((a, b) => rankForMode(b, landing.mode) - rankForMode(a, landing.mode))
    .slice(0, limit)
}
