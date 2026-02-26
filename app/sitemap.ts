import type { MetadataRoute } from "next"
import { cities } from "@/config/cities"
import { categories } from "@/config/categories"
import { blogs } from "@/config/blogs"
import { blogClusters } from "@/config/blog-clusters"
import { topicFamilies } from "@/config/topic-families"
import { getComparableCityPairs, buildComparePairSlug } from "@/lib/compare-seo"
import { keywordLandings } from "@/config/keyword-landings"

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.citiory.com").replace(/\/$/, "")

function getLatestPostDateBySlugs(slugs: string[]): Date {
  const matchedDates = blogs
    .filter((post) => slugs.includes(post.slug))
    .map((post) => new Date(post.updatedAt || post.publishedAt).getTime())

  if (matchedDates.length === 0) return new Date()
  return new Date(Math.max(...matchedDates))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes = [
    "",
    "/cities",
    "/best",
    "/blog",
    "/guides",
    "/topics",
    "/methodology",
    "/compare",
    "/rankings",
    "/nomads",
    "/keywords",
  ]

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }))

  const cityEntries: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${siteUrl}/city/${city.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  const bestCategoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteUrl}/best/${category}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }))

  const blogEntries: MetadataRoute.Sitemap = blogs.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const guideEntries: MetadataRoute.Sitemap = blogClusters.map((cluster) => ({
    url: `${siteUrl}/guides/${cluster.slug}`,
    lastModified: getLatestPostDateBySlugs(cluster.postSlugs),
    changeFrequency: "monthly",
    priority: 0.65,
  }))

  const topicEntries: MetadataRoute.Sitemap = topicFamilies.map((topic) => ({
    url: `${siteUrl}/topics/${topic.slug}`,
    lastModified: getLatestPostDateBySlugs(topic.postSlugs),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const compareEntries: MetadataRoute.Sitemap = getComparableCityPairs(cities, 180).map((pair) => ({
    url: `${siteUrl}/compare/${buildComparePairSlug(pair.citySlugA, pair.citySlugB)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.65,
  }))

  const keywordEntries: MetadataRoute.Sitemap = keywordLandings.map((landing) => ({
    url: `${siteUrl}/keywords/${landing.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.68,
  }))

  return [...staticEntries, ...cityEntries, ...bestCategoryEntries, ...blogEntries, ...guideEntries, ...topicEntries, ...compareEntries, ...keywordEntries]
}
