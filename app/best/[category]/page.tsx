import { getAllCities } from "@/lib/data/cities"
import { filterByCategory } from "@/lib/filters"
import RankingList from "@/components/RankingList"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"

interface Params {
  category: string
}

import { categories, bestCategories } from "@/config/categories"

function getCategoryMeta(slug: string) {
  return bestCategories.find((category) => category.slug === slug)
}

function getCategorySeoContent(slug: string) {
  const contentBySlug: Record<string, { summary: string; bestFor: string; nextStep: string }> = {
    overall: {
      summary: "This ranking balances major city factors so you can compare destinations on all-around livability rather than a single metric.",
      bestFor: "People who want a broad shortlist before drilling into specific priorities.",
      nextStep: "Review the top cities here, then validate tradeoffs with city profiles and side-by-side comparisons.",
    },
    cheapest: {
      summary: "This list prioritizes cities with lower estimated monthly living costs while still considering practical day-to-day livability.",
      bestFor: "Remote workers, students, and relocators managing strict monthly budgets.",
      nextStep: "Open top low-cost cities and confirm internet quality, safety, and healthcare before deciding.",
    },
    safest: {
      summary: "This ranking highlights destinations with stronger safety outcomes and lower perceived risk for daily life.",
      bestFor: "Families, solo travelers, and long-stay residents prioritizing personal security.",
      nextStep: "Shortlist by safety first, then compare cost, climate, and work infrastructure.",
    },
    "digital-nomads": {
      summary: "This list focuses on remote-work readiness using internet reliability, livability signals, and practical long-stay conditions.",
      bestFor: "Freelancers and distributed teams choosing a city for productive remote work.",
      nextStep: "Check finalists for time zone fit, monthly budget, and visa feasibility.",
    },
    "best-internet": {
      summary: "This ranking surfaces cities with stronger connectivity indicators for consistent online work and communication.",
      bestFor: "Developers, creators, and professionals who depend on stable high-speed internet.",
      nextStep: "Pair internet score with affordability and safety to find sustainable options.",
    },
    "best-healthcare": {
      summary: "This list prioritizes cities with better healthcare scoring and access signals for long-term quality of life.",
      bestFor: "Relocators who prioritize medical access, long-term wellbeing, and care reliability.",
      nextStep: "Compare healthcare leaders with your budget and climate preferences before finalizing.",
    },
    "best-climate": {
      summary: "This ranking emphasizes livable weather patterns and climate comfort for everyday routines and long stays.",
      bestFor: "People optimizing for seasonal comfort and year-round outdoor livability.",
      nextStep: "Use climate as your first filter, then evaluate cost, safety, and work factors.",
    },
    "lowest-pollution": {
      summary: "This list highlights cities with cleaner-air indicators to support healthier daily living conditions.",
      bestFor: "People sensitive to air quality or prioritizing cleaner environmental conditions.",
      nextStep: "Cross-check low-pollution cities with healthcare quality and affordability.",
    },
    "best-job-market": {
      summary: "This ranking surfaces cities with stronger job-market signals for people seeking better career opportunities.",
      bestFor: "Professionals and relocators targeting employment growth and stronger hiring ecosystems.",
      nextStep: "Validate top job-market cities for living cost, safety, and long-term fit.",
    },
  }

  return (
    contentBySlug[slug] ?? {
      summary: "This category ranking helps you compare cities by a focused relocation priority.",
      bestFor: "Anyone narrowing options based on a specific city-selection goal.",
      nextStep: "Use this shortlist, then verify details in city profiles and compare pages.",
    }
  )
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ category: cat }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category } = await params
  const categoryMeta = getCategoryMeta(category)

  if (!categoryMeta) {
    return {
      title: "Best Cities",
      description: "Explore top city rankings by category.",
    }
  }

  const title = categoryMeta.title
  const description = categoryMeta.description
  const canonical = `/best/${categoryMeta.slug}`

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${title} | Citiory`,
      description,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Citiory`,
      description,
    },
  }
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { category } = await params
  const categoryMeta = getCategoryMeta(category)
  if (!category || !categoryMeta) notFound()

  const all = await getAllCities()
  const filtered = filterByCategory(all, category)
  if (!filtered.length) notFound()
  const seoContent = getCategorySeoContent(categoryMeta.slug)

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "")
  const pageUrl = `${siteUrl}/best/${categoryMeta.slug}`
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: categoryMeta.title,
    itemListElement: filtered.slice(0, 10).map((city, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteUrl}/city/${city.slug}`,
      name: city.name,
    })),
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Best Cities",
        item: `${siteUrl}/best`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryMeta.title,
        item: pageUrl,
      },
    ],
  }

  return (
    <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="mb-4 sm:mb-6">
        <Link href="/best" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          ← Back to Best Categories
        </Link>
      </div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{categoryMeta.title}</h1>
      <p className="text-gray-600 mb-4 sm:mb-6">{categoryMeta.description}</p>
      <RankingList cities={filtered} />

      <section className="mt-10 sm:mt-12 prose prose-gray max-w-3xl">
        <h2>How To Use This {categoryMeta.title} Ranking</h2>
        <p>{seoContent.summary}</p>
        <p>
          <strong>Best for:</strong> {seoContent.bestFor}
        </p>
        <p>
          <strong>Next step:</strong> {seoContent.nextStep}
        </p>
      </section>

      <section className="mt-8 prose prose-gray max-w-3xl">
        <h2>Why This Category Matters</h2>
        <p>
          Category rankings help you avoid generic city lists by focusing on one decision priority at a time. This approach makes your
          shortlist more relevant and easier to compare.
        </p>
        <p>
          Once you have a shortlist, open individual city pages for deeper context and use compare tools to confirm tradeoffs before making
          relocation decisions.
        </p>
      </section>
    </main>
  )
}
