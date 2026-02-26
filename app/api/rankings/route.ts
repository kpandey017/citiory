import { NextResponse } from "next/server"
import { getCitiesByOverallScore } from "@/lib/data/rankings"

export async function GET() {
  const cities = await getCitiesByOverallScore()
  return NextResponse.json(cities)
}
