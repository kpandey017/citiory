import { NextResponse } from "next/server"
import { getAllReviews } from "@/lib/data/reviews"

export async function GET() {
  const reviews = await getAllReviews()
  return NextResponse.json(reviews)
}
