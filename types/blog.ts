export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  targetKeyword: string
  searchIntent: "informational" | "commercial"
  publishedAt: string
  updatedAt: string
  readingMinutes: number
  tags: string[]
  content: string[]
}
