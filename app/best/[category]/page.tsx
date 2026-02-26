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
    </main>
  )
}
