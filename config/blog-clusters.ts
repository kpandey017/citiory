export interface BlogCluster {
  slug: string
  title: string
  description: string
  targetKeyword: string
  audience: string
  whenToUse: string
  outcome: string
  quickSteps: string[]
  relatedTopicSlug: string
  postSlugs: string[]
}

export const blogClusters: BlogCluster[] = [
  {
    slug: "remote-work-cities",
    title: "Remote Work Cities",
    description:
      "Practical reading path to pick a city where you can work reliably, stay within budget, and avoid common relocation mistakes.",
    targetKeyword: "best remote work cities",
    audience: "Remote workers and freelancers planning a move in the next 3-6 months.",
    whenToUse: "Use this if your top priorities are internet reliability, monthly budget, and day-to-day convenience.",
    outcome: "You finish with a short list of cities and a checklist for your move.",
    quickSteps: [
      "Start with budget-friendly city options.",
      "Validate internet and healthcare reliability.",
      "Use the pre-move checklist before booking.",
    ],
    relatedTopicSlug: "remote-work-city-guides",
    postSlugs: [
      "best-cities-for-remote-workers-on-a-budget",
      "best-cities-for-digital-nomads-in-asia",
      "cheapest-cities-with-fast-internet",
      "digital-nomad-city-checklist-before-moving",
      "remote-work-cities-with-best-healthcare",
      "remote-work-relocation-budget-planner",
      "how-to-test-a-city-before-moving",
    ],
  },
  {
    slug: "safe-and-healthy-living",
    title: "Safe and Healthy City Living",
    description:
      "Decision guide for balancing safety, healthcare quality, and air quality when choosing a city for long-term living.",
    targetKeyword: "safest healthy cities for expats",
    audience: "Families, couples, and professionals prioritizing stability and health outcomes.",
    whenToUse: "Use this if safety and health matter more than nightlife or short-term travel convenience.",
    outcome: "You get a realistic shortlist that fits your health and safety standards.",
    quickSteps: [
      "Compare safety and crime indicators first.",
      "Review healthcare quality and access.",
      "Check pollution and long-term livability tradeoffs.",
    ],
    relatedTopicSlug: "safe-healthy-cities",
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
    slug: "relocation-decision-frameworks",
    title: "Relocation Decision Frameworks",
    description:
      "Step-by-step frameworks for comparing cities objectively so you can decide faster with less uncertainty.",
    targetKeyword: "city relocation decision framework",
    audience: "People deciding between two or more city options for work or lifestyle reasons.",
    whenToUse: "Use this when you are stuck between options and need a clear comparison method.",
    outcome: "You leave with one recommended city and a clear reason behind the choice.",
    quickSteps: [
      "Define your top decision criteria.",
      "Score each city against those criteria.",
      "Pressure-test your top choice with real cost and quality-of-life data.",
    ],
    relatedTopicSlug: "city-relocation-frameworks",
    postSlugs: [
      "how-to-choose-between-two-cities-for-relocation",
      "cost-of-living-vs-quality-of-life",
      "best-cities-for-software-engineers-relocation",
      "relocation-decision-scorecard-template",
      "mistakes-to-avoid-when-choosing-a-city",
    ],
  },
]
