export interface MetricSource {
  provider: string
  url?: string
  asOf: string
  notes?: string
}

export interface City {
  slug: string
  name: string
  country: string
  continent: string
  population: number
  literacyRate: number
  description: string
  why_people_love: string[]
  specialty: string
  famous_companies: string[]
  famous_people: string[]
  languages: string[]
  scores: {
    overall: number
    safety: number
    pollution: number
    internet: number
    qualityOfLife: number
    job: number
    healthcare: number
    climate: number
  }
  cost: {
    single: number
    couple: number
    rentCenter: number
    rentOutside: number
    food: number
    transport: number
    utilities: number
  }
  environment: {
    airQualityIndex: number
    pollutionLevel: string
    climateType: string
    avgTempC: number
  }
  infrastructure: {
    internetSpeedMbps: number
  }
  crime: {
    homicideRate: number
    robberyRate: number
    theftRate: number
    assaultRate: number
    overallCrimeIndex: number
    safetyRating: string
  }
  sources: {
    population: MetricSource
    literacyRate: MetricSource
    scores: {
      safety: MetricSource
      pollution: MetricSource
      internet: MetricSource
      qualityOfLife: MetricSource
      job: MetricSource
      healthcare: MetricSource
      climate: MetricSource
      overall: MetricSource
    }
    cost: {
      single: MetricSource
      couple: MetricSource
      rentCenter: MetricSource
      rentOutside: MetricSource
      food: MetricSource
      transport: MetricSource
      utilities: MetricSource
    }
    environment: {
      airQualityIndex: MetricSource
      pollutionLevel: MetricSource
      climateType: MetricSource
      avgTempC: MetricSource
    }
    infrastructure: {
      internetSpeedMbps: MetricSource
    }
    crime: {
      homicideRate: MetricSource
      robberyRate: MetricSource
      theftRate: MetricSource
      assaultRate: MetricSource
      overallCrimeIndex: MetricSource
      safetyRating: MetricSource
    }
  }
}