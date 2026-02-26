import { reviews } from "@/config/reviews"
import { Review } from "@/types/review"

export async function getAllReviews(): Promise<Review[]> {
  return reviews
}

export async function getReviewsByCitySlug(citySlug: string): Promise<Review[]> {
  return reviews.filter((r) => r.citySlug === citySlug)
}
