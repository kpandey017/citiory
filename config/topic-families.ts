export interface TopicFamily {
  slug: string
  title: string
  primaryKeyword: string
  secondaryKeywords: string[]
  intro: string
  bestFor: string
  whatYouWillLearn: string[]
  relatedGuideSlug: string
  postSlugs: string[]
}

export const topicFamilies: TopicFamily[] = [
  {
    slug: "remote-work-city-guides",
    title: "Remote Work City Guides",
    primaryKeyword: "best remote work cities",
    secondaryKeywords: [
      "best cities for remote workers on a budget",
      "cheapest cities with fast internet",
      "digital nomad city checklist",
    ],
    intro:
      "This topic hub helps remote workers shortlist cities using practical criteria: internet reliability, living costs, safety, and day-to-day productivity.",
    bestFor: "People working remotely who need affordable and reliable city options.",
    whatYouWillLearn: [
      "How to shortlist cities with strong internet and manageable monthly costs.",
      "How to avoid common digital nomad relocation mistakes.",
      "How to validate healthcare and backup connectivity before moving.",
    ],
    relatedGuideSlug: "remote-work-cities",
    postSlugs: [
      "best-cities-for-remote-workers-on-a-budget",
      "cheapest-cities-with-fast-internet",
      "best-cities-for-digital-nomads-in-asia",
      "digital-nomad-city-checklist-before-moving",
      "remote-work-cities-with-best-healthcare",
      "remote-work-relocation-budget-planner",
      "how-to-test-a-city-before-moving",
    ],
  },
  {
    slug: "safe-healthy-cities",
    title: "Safe & Healthy Cities",
    primaryKeyword: "safest healthy cities for expats",
    secondaryKeywords: [
      "safest cities in europe for expats",
      "best cities with clean air and good jobs",
      "remote work cities with best healthcare",
    ],
    intro:
      "This hub focuses on long-term livability by combining safety, pollution, healthcare quality, and practical relocation stability.",
    bestFor: "Expats and families who prioritize safety, healthcare access, and cleaner environments.",
    whatYouWillLearn: [
      "How to evaluate city safety beyond one headline number.",
      "How pollution and healthcare access affect long-term quality of life.",
      "How to balance job opportunities with healthy living conditions.",
    ],
    relatedGuideSlug: "safe-and-healthy-living",
    postSlugs: [
      "safest-cities-in-europe-for-expats",
      "best-cities-with-clean-air-and-good-jobs",
      "remote-work-cities-with-best-healthcare",
      "cost-of-living-vs-quality-of-life",
      "family-relocation-safety-health-checklist",
      "healthcare-access-vs-cost-by-city",
    ],
  },
  {
    slug: "city-relocation-frameworks",
    title: "City Relocation Frameworks",
    primaryKeyword: "city relocation decision framework",
    secondaryKeywords: [
      "how to choose between two cities for relocation",
      "cost of living vs quality of life",
      "best cities for software engineers relocation",
    ],
    intro:
      "Use these frameworks to compare city options with clear tradeoffs so your final move is based on evidence, not guesswork.",
    bestFor: "Anyone deciding between multiple cities and needing a structured comparison process.",
    whatYouWillLearn: [
      "How to set weighted criteria for city decisions.",
      "How to compare cost of living against quality of life without bias.",
      "How to finalize your move choice with confidence.",
    ],
    relatedGuideSlug: "relocation-decision-frameworks",
    postSlugs: [
      "how-to-choose-between-two-cities-for-relocation",
      "cost-of-living-vs-quality-of-life",
      "best-cities-for-software-engineers-relocation",
      "relocation-decision-scorecard-template",
      "mistakes-to-avoid-when-choosing-a-city",
    ],
  },
]
