import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { blogClusters } from "@/config/blog-clusters"
import { topicFamilies } from "@/config/topic-families"
import { getAllBlogPosts } from "@/lib/data/blogs"

interface Params {
  slug: string
}

function getCluster(slug: string) {
  return blogClusters.find((cluster) => cluster.slug === slug)
}

export function generateStaticParams() {
  return blogClusters.map((cluster) => ({ slug: cluster.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const cluster = getCluster(slug)
  if (!cluster) return {}

  return {
    title: cluster.title,
    description: cluster.description,
    alternates: {
      canonical: `/guides/${cluster.slug}`,
    },
    openGraph: {
      title: `${cluster.title} | Citiory`,
      description: cluster.description,
      url: `/guides/${cluster.slug}`,
    },
  }
}

export default async function GuideClusterPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const cluster = getCluster(slug)
  if (!cluster) notFound()

  const allPosts = await getAllBlogPosts()
  const posts = allPosts.filter((post) => cluster.postSlugs.includes(post.slug))
  const relatedTopic = topicFamilies.find((topic) => topic.slug === cluster.relatedTopicSlug)
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "")
  const pageUrl = `${siteUrl}/guides/${cluster.slug}`

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: cluster.title,
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
        name: "Guides",
        item: `${siteUrl}/guides`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: cluster.title,
        item: pageUrl,
      },
    ],
  }

  return (
    <main className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="mb-4 sm:mb-6">
        <Link href="/guides" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          ← Back to Guides
        </Link>
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">{cluster.title}</h1>
      <p className="text-gray-600 mb-4">{cluster.description}</p>
      <p className="text-sm text-gray-700 mb-2">
        <span className="font-semibold">Best for:</span> {cluster.audience}
      </p>
      <p className="text-sm text-gray-700 mb-4">
        <span className="font-semibold">When to use:</span> {cluster.whenToUse}
      </p>

      <section className="bg-blue-50 border border-blue-100 rounded-xl p-4 sm:p-5 mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Start here</h2>
        <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1 mb-3">
          {cluster.quickSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p className="text-sm text-blue-700">Expected outcome: {cluster.outcome}</p>
      </section>

      {relatedTopic ? (
        <section className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Related topic hub</h2>
          <p className="text-sm text-gray-600 mb-2">Use this companion topic page to explore all connected articles and city links.</p>
          <Link href={`/topics/${relatedTopic.slug}`} className="text-blue-600 font-medium hover:text-blue-700">
            Open {relatedTopic.title} →
          </Link>
        </section>
      ) : null}

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">Guides in this plan</h2>
        <div className="grid gap-4 sm:gap-5">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block bg-white border border-gray-200 rounded-xl p-4 sm:p-5 hover:shadow-md transition-all"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-3">{post.excerpt}</p>
            <span className="text-blue-600 font-medium">
              Read guide →
            </span>
          </Link>
        ))}
        </div>
      </section>
    </main>
  )
}
