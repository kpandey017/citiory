import { blogs } from "@/config/blogs"
import { BlogPost } from "@/types/blog"

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return [...blogs].sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  })
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return blogs.find((post) => post.slug === slug)
}
