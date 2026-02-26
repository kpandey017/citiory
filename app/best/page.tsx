import Link from "next/link"
import { bestCategories } from "@/config/categories"

export const metadata = {
  title: "Best Cities",
  description: "Explore top city lists by affordability, safety, and digital nomad suitability.",
}

export default function BestPage() {
  return (
    <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Best Cities</h1>
      <p className="text-gray-600 mb-6 sm:mb-8 max-w-3xl">
        Browse curated city rankings by lifestyle goals. Each category uses the same data model used across city profiles.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {bestCategories.map((category) => (
          <Link
            key={category.slug}
            href={`/best/${category.slug}`}
            className="block bg-white border border-gray-200 rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{category.title}</h2>
            <p className="text-sm sm:text-base text-gray-600">{category.description}</p>
            <span className="inline-block mt-4 text-blue-600 font-medium">View ranking →</span>
          </Link>
        ))}
      </div>
    </main>
  )
}
