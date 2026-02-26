import { BlogPost } from "@/types/blog"
import { City } from "@/types/city"

const STOP_WORDS = new Set([
  "the",
  "and",
  "for",
  "with",
  "from",
  "into",
  "your",
  "best",
  "cities",
  "city",
  "guide",
  "how",
  "2026",
])

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token && !STOP_WORDS.has(token))
}

export function getRelatedPosts(currentPost: BlogPost, posts: BlogPost[], limit = 3): BlogPost[] {
  const currentTokens = new Set([
    ...tokenize(currentPost.title),
    ...tokenize(currentPost.targetKeyword),
    ...currentPost.tags.map((tag) => tag.toLowerCase()),
  ])

  return posts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      const postTokens = new Set([
        ...tokenize(post.title),
        ...tokenize(post.targetKeyword),
        ...post.tags.map((tag) => tag.toLowerCase()),
      ])

      let overlap = 0
      currentTokens.forEach((token) => {
        if (postTokens.has(token)) overlap += 1
      })

      return { post, score: overlap }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.post)
}

export function getRelatedCitiesForPost(post: BlogPost, allCities: City[], limit = 4): City[] {
  const text = `${post.title} ${post.excerpt} ${post.content.join(" ")}`.toLowerCase()

  const directMatches = allCities.filter((city) => {
    return text.includes(city.name.toLowerCase()) || text.includes(city.country.toLowerCase())
  })

  if (directMatches.length >= limit) {
    return directMatches.slice(0, limit)
  }

  const fallbackByTags = allCities
    .map((city) => {
      let score = 0
      if (post.tags.includes("digital nomad") || post.tags.includes("remote work")) {
        score += city.scores.internet + city.scores.qualityOfLife
      }
      if (post.tags.includes("budget") || post.tags.includes("cost of living")) {
        score += 10 - Math.min(city.cost.single / 500, 10)
      }
      if (post.tags.includes("healthcare")) {
        score += city.scores.healthcare
      }
      if (post.tags.includes("safety")) {
        score += city.scores.safety
      }
      return { city, score }
    })
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.city)

  const merged = [...directMatches]
  fallbackByTags.forEach((city) => {
    if (!merged.find((item) => item.slug === city.slug) && merged.length < limit) {
      merged.push(city)
    }
  })

  return merged.slice(0, limit)
}

export function getRelatedPostsForCity(city: City, posts: BlogPost[], limit = 4): BlogPost[] {
  const cityName = city.name.toLowerCase()
  const country = city.country.toLowerCase()

  const scored = posts.map((post) => {
    const text = `${post.title} ${post.excerpt} ${post.targetKeyword} ${post.content.join(" ")}`.toLowerCase()
    let score = 0

    if (text.includes(cityName)) score += 5
    if (text.includes(country)) score += 3

    if (post.tags.includes("remote work") || post.tags.includes("digital nomad")) {
      score += city.scores.internet + city.scores.qualityOfLife > 16 ? 2 : 0
    }
    if (post.tags.includes("budget") || post.tags.includes("cost of living")) {
      score += city.cost.single <= 1700 ? 2 : 0
    }
    if (post.tags.includes("safety")) {
      score += city.scores.safety >= 7.5 ? 2 : 0
    }
    if (post.tags.includes("healthcare")) {
      score += city.scores.healthcare >= 7.5 ? 2 : 0
    }

    return { post, score }
  })

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.post)
}

export function getBlogRefreshStatus(updatedAt: string, reviewEveryDays = 30) {
  const updated = new Date(updatedAt)
  const now = new Date()
  const msSinceUpdate = now.getTime() - updated.getTime()
  const daysSinceUpdate = Math.floor(msSinceUpdate / (1000 * 60 * 60 * 24))
  const needsRefresh = daysSinceUpdate >= reviewEveryDays
  const nextReviewAt = new Date(updated.getTime() + reviewEveryDays * 24 * 60 * 60 * 1000)

  return {
    daysSinceUpdate,
    needsRefresh,
    nextReviewAt,
    reviewEveryDays,
  }
}

export function buildFaqForPost(post: BlogPost) {
  return [
    {
      question: `How should I use this ${post.targetKeyword} guide?`,
      answer:
        "Start with the framework in the article, shortlist 2 to 3 city options, and then validate neighborhood-level costs and daily workflow fit before making a final decision.",
    },
    {
      question: "How often should this information be rechecked?",
      answer:
        "Review core assumptions monthly because rents, transport costs, and local conditions can change quickly, especially in fast-moving city markets.",
    },
    {
      question: "What is the biggest mistake people make while choosing cities?",
      answer:
        "Most people optimize for one metric only, such as rent, and ignore reliability factors like healthcare, safety, or internet stability that strongly affect long-term quality of life.",
    },
  ]
}
