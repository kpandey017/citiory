import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/data/blogs"
import { getAllCities } from "@/lib/data/cities"
import { blogClusters } from "@/config/blog-clusters"
import { buildFaqForPost, getBlogRefreshStatus, getRelatedCitiesForPost, getRelatedPosts } from "@/lib/blog-seo"

interface Params {
  slug: string
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return {}

  const url = `/blog/${post.slug}`

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title: `${post.title} | Citiory`,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Citiory`,
      description: post.excerpt,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) notFound()

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "")
  const postUrl = `${siteUrl}/blog/${post.slug}`
  const encodedTitle = encodeURIComponent(post.title)
  const encodedUrl = encodeURIComponent(postUrl)
  const xShareUrl = `https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
  const whatsappShareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
  const allPosts = await getAllBlogPosts()
  const allCities = await getAllCities()
  const relatedPosts = getRelatedPosts(post, allPosts, 3)
  const relatedCities = getRelatedCitiesForPost(post, allCities, 4)
  const relatedClusters = blogClusters.filter((cluster) => cluster.postSlugs.includes(post.slug))
  const refreshStatus = getBlogRefreshStatus(post.updatedAt)
  const faqItems = buildFaqForPost(post)

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: "Citiory Research Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Citiory",
    },
    mainEntityOfPage: postUrl,
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: post.title,
        item: postUrl,
      },
    ],
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <main className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="mb-4 sm:mb-6">
        <Link href="/blog" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          ← Back to Blog
        </Link>
      </div>

      <article className="bg-white border border-gray-200 rounded-xl p-5 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500 mb-3">
          <span>{post.publishedAt}</span>
          <span>•</span>
          <span>{post.readingMinutes} min read</span>
          <span>•</span>
          <span className="text-blue-600">{post.searchIntent}</span>
          <span>•</span>
          <span>Updated: {post.updatedAt}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">{post.title}</h1>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>

        <div className="mb-6 p-4 sm:p-5 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm sm:text-base text-gray-900 font-semibold mb-2">What you will get from this guide</p>
          <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base text-gray-700">
            {post.content.slice(0, 3).map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 sm:space-y-5 text-gray-800 leading-relaxed">
          {post.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-8 p-4 sm:p-5 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-sm sm:text-base text-blue-900 font-semibold mb-2">Trust & methodology</p>
          <p className="text-sm text-blue-900 mb-2">
            Written by the Citiory Research Team. This guide is reviewed every {refreshStatus.reviewEveryDays} days.
          </p>
          <p className="text-sm text-blue-900">
            Next review date: {refreshStatus.nextReviewAt.toISOString().split("T")[0]} ·
            <Link href="/methodology" className="ml-1 underline hover:no-underline">
              Read our methodology
            </Link>
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">Related guides</h2>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/30 transition-colors"
              >
                <p className="font-medium text-gray-900 mb-1">{related.title}</p>
                <p className="text-sm text-gray-600">{related.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">Related city pages</h2>
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
        </div>

        {relatedClusters.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">Pillar clusters</h2>
            <div className="space-y-2">
              {relatedClusters.map((cluster) => (
                <Link
                  key={cluster.slug}
                  href={`/guides/${cluster.slug}`}
                  className="block p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                >
                  <p className="font-medium text-gray-900">{cluster.title}</p>
                  <p className="text-sm text-gray-600">{cluster.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">FAQ</h2>
          <div className="space-y-3">
            {faqItems.map((faq) => (
              <details key={faq.question} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                <summary className="font-medium text-gray-900 cursor-pointer">{faq.question}</summary>
                <p className="text-gray-700 mt-2 text-sm sm:text-base">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm sm:text-base text-gray-900 font-semibold mb-3">Found this useful? Share it.</p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <a
              href={xShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-sm bg-black text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Share on X
            </a>
            <a
              href={linkedInShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-sm bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              Share on LinkedIn
            </a>
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Share on WhatsApp
            </a>
          </div>
        </div>
      </article>
    </main>
  )
}
