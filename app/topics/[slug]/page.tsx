import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { topicFamilies } from "@/config/topic-families"
import { blogClusters } from "@/config/blog-clusters"
import { getAllBlogPosts } from "@/lib/data/blogs"
import { getAllCities } from "@/lib/data/cities"
import { getRelatedCitiesForPost } from "@/lib/blog-seo"

interface Params {
  slug: string
}

function getTopic(slug: string) {
  return topicFamilies.find((topic) => topic.slug === slug)
}

export function generateStaticParams() {
  return topicFamilies.map((topic) => ({ slug: topic.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const topic = getTopic(slug)
  if (!topic) return {}

  return {
    title: topic.title,
    description: topic.intro,
    alternates: {
      canonical: `/topics/${topic.slug}`,
    },
    openGraph: {
      title: `${topic.title} | Citiory`,
      description: topic.intro,
      url: `/topics/${topic.slug}`,
    },
  }
}

export default async function TopicPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const topic = getTopic(slug)
  if (!topic) notFound()

  const allPosts = await getAllBlogPosts()
  const allCities = await getAllCities()
  const posts = allPosts.filter((post) => topic.postSlugs.includes(post.slug))
  const relatedGuide = blogClusters.find((cluster) => cluster.slug === topic.relatedGuideSlug)

  const relatedCities = posts
    .flatMap((post) => getRelatedCitiesForPost(post, allCities, 3))
    .filter((city, index, array) => array.findIndex((item) => item.slug === city.slug) === index)
    .slice(0, 8)

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "")
  const pageUrl = `${siteUrl}/topics/${topic.slug}`
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: topic.title,
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteUrl}/blog/${post.slug}`,
      name: post.title,
    })),
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Topics",
        item: `${siteUrl}/topics`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: topic.title,
        item: pageUrl,
      },
    ],
  }

  return (
    <main className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="mb-4 sm:mb-6">
        <Link href="/topics" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          ← Back to Topics
        </Link>
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">{topic.title}</h1>
      <p className="text-gray-600 mb-4 max-w-4xl">{topic.intro}</p>
      <p className="text-sm text-gray-700 mb-2">
        <span className="font-semibold">Best for:</span> {topic.bestFor}
      </p>

      <section className="bg-blue-50 border border-blue-100 rounded-xl p-4 sm:p-5 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">What you will learn</h2>
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
          {topic.whatYouWillLearn.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      {relatedGuide ? (
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Start with this guide plan</h2>
          <p className="text-gray-600 text-sm sm:text-base mb-2">{relatedGuide.description}</p>
          <Link href={`/guides/${relatedGuide.slug}`} className="text-blue-600 font-medium hover:text-blue-700">
            Open {relatedGuide.title} →
          </Link>
        </section>
      ) : null}

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">Articles in this topic</h2>
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-white border border-gray-200 rounded-xl p-4 sm:p-5 hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-3">{post.excerpt}</p>
              <span className="text-blue-600 font-medium">
                Read article →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">Cities to explore next</h2>
        <div className="flex flex-wrap gap-2">
          {relatedCities.map((city) => (
            <Link
              key={city.slug}
              href={`/city/${city.slug}`}
              className="px-3 py-2 text-sm bg-gray-100 text-gray-800 rounded-lg hover:bg-blue-100 hover:text-blue-800 transition-colors"
            >
              {city.name}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">Related searches</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          {topic.secondaryKeywords.map((keyword) => (
            <li key={keyword}>{keyword}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}
