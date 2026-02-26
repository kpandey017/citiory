export interface BestCategory {
  slug: string
  title: string
  description: string
}

export const bestCategories: BestCategory[] = [
  {
    slug: "overall",
    title: "Best Overall Cities",
    description: "Cities ranked by the overall composite score.",
  },
  {
    slug: "cheapest",
    title: "Cheapest Cities",
    description: "Cities sorted by lowest estimated monthly cost for a single person.",
  },
  {
    slug: "safest",
    title: "Safest Cities",
    description: "Cities ranked by highest safety score and lower crime risk.",
  },
  {
    slug: "digital-nomads",
    title: "Best for Digital Nomads",
    description: "Cities ranked for remote work using internet, safety, and quality-of-life signals.",
  },
  {
    slug: "best-internet",
    title: "Best Internet",
    description: "Cities ranked by internet quality and speed indicators.",
  },
  {
    slug: "best-healthcare",
    title: "Best Healthcare",
    description: "Cities ranked by healthcare score.",
  },
  {
    slug: "best-climate",
    title: "Best Climate",
    description: "Cities ranked by climate score and livable weather profile.",
  },
  {
    slug: "lowest-pollution",
    title: "Lowest Pollution",
    description: "Cities ranked by cleaner-air pollution score.",
  },
  {
    slug: "best-job-market",
    title: "Best Job Market",
    description: "Cities ranked by job-market score.",
  },
]

export const categories = bestCategories.map((category) => category.slug)
