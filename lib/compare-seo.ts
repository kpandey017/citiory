import type { City } from "@/types/city"

const PAIR_SEPARATOR = "-vs-"

export function buildComparePairSlug(citySlugA: string, citySlugB: string): string {
  return [citySlugA, citySlugB].sort((a, b) => a.localeCompare(b)).join(PAIR_SEPARATOR)
}

export function parseComparePairSlug(pair: string): { citySlugA: string; citySlugB: string } | null {
  const chunks = pair.split(PAIR_SEPARATOR)
  if (chunks.length !== 2) return null

  const [citySlugA, citySlugB] = chunks
  if (!citySlugA || !citySlugB || citySlugA === citySlugB) return null

  return { citySlugA, citySlugB }
}

export function getComparableCityPairs(cities: City[], maxPairs = 180): Array<{ citySlugA: string; citySlugB: string }> {
  if (cities.length < 2 || maxPairs <= 0) return []

  const rankedCities = [...cities].sort((a, b) => b.scores.overall - a.scores.overall)
  const pairs: Array<{ citySlugA: string; citySlugB: string }> = []
  const seen = new Set<string>()

  const addPair = (cityA: City, cityB: City) => {
    const pair = buildComparePairSlug(cityA.slug, cityB.slug)
    if (seen.has(pair)) return
    seen.add(pair)
    const parsed = parseComparePairSlug(pair)
    if (!parsed) return
    pairs.push(parsed)
  }

  for (let i = 0; i < rankedCities.length && pairs.length < maxPairs; i += 1) {
    for (let j = i + 1; j < rankedCities.length && pairs.length < maxPairs; j += 1) {
      if (rankedCities[i].continent === rankedCities[j].continent) {
        addPair(rankedCities[i], rankedCities[j])
      }
    }
  }

  for (let i = 0; i < rankedCities.length && pairs.length < maxPairs; i += 1) {
    for (let j = i + 1; j < rankedCities.length && pairs.length < maxPairs; j += 1) {
      addPair(rankedCities[i], rankedCities[j])
    }
  }

  return pairs
}