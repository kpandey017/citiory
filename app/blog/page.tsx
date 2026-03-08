import Link from "next/link"
import type { Metadata } from "next"
import { getAllBlogPosts } from "@/lib/data/blogs"
import { getBlogRefreshStatus } from "@/lib/blog-seo"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Keyword-focused city guides, relocation frameworks, and digital nomad planning articles.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Citiory Blog",
    description:
      "Keyword-focused city guides, relocation frameworks, and digital nomad planning articles.",
    url: "/blog",
  },
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts()
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "")

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is covered in the Citiory blog?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The blog covers city selection frameworks, relocation planning strategies, and practical guides for remote workers and expats.",
        },
      },
      {
        "@type": "Question",
        name: "How should I start reading if I am new?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Start with foundational planning articles, then move to city-specific posts and comparison-focused resources.",
        },
      },
      {
        "@type": "Question",
        name: "Are blog posts aligned with city ranking data?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Blog content is designed to support the same decision flow used in ranking pages, topic hubs, and city profiles.",
        },
      },
    ],
    url: `${siteUrl}/blog`,
  }

  return (
    <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Blog</h1>
      <p className="text-gray-600 mb-6 sm:mb-8 max-w-3xl">
        Simple, practical city guides for real people planning a move. Every article is written to help you decide faster with less guesswork.
      </p>

      <div className="grid gap-4 sm:gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block bg-white border border-gray-200 rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all"
          >
            {(() => {
              const refresh = getBlogRefreshStatus(post.updatedAt)
              return (
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-xs text-gray-500">Updated {refresh.daysSinceUpdate} days ago</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      refresh.needsRefresh ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"
                    }`}
                  >
                    {refresh.needsRefresh ? "Refresh due" : "Fresh"}
                  </span>
                </div>
              )
            })()}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500 mb-2">
              <span>{post.publishedAt}</span>
              <span>•</span>
              <span>{post.readingMinutes} min read</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-semibold text-gray-900 mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-xs sm:text-sm text-gray-700 font-medium mb-1">Quick takeaways</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                {post.content.slice(0, 2).map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs sm:text-sm">
                  #{tag}
                </span>
              ))}
            </div>
            <span className="text-blue-600 font-medium">
              Read article →
            </span>
          </Link>
        ))}
      </div>

      <section className="mt-10 sm:mt-12 prose prose-gray max-w-3xl">
        <h2>What You Can Learn From The Citiory Blog</h2>
        <p>
          This blog focuses on city selection strategy, relocation planning, and practical frameworks for comparing destinations with real-world
          constraints like budget, visa pathways, and remote-work needs.
        </p>
        <p>
          If you are new to the platform, start with foundational guides, then move to city-specific posts and comparison pages to finalize
          your shortlist.
        </p>
      </section>
    </main>
  )
}
