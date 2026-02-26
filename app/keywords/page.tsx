import type { Metadata } from "next"
import Link from "next/link"
import { getAllKeywordLandings } from "@/lib/keyword-landings"

export const metadata: Metadata = {
  title: "Keyword Guides",
  description: "Long-tail city ranking pages built for specific relocation and remote-work search intents.",
  alternates: {
    canonical: "/keywords",
  },
  openGraph: {
    title: "Keyword Guides | Citiory",
    description: "Long-tail city ranking pages built for specific relocation and remote-work search intents.",
    url: "/keywords",
  },
}

export default function KeywordIndexPage() {
  const landings = getAllKeywordLandings()

  return (
    <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Keyword Guides</h1>
      <p className="text-gray-600 mb-6 sm:mb-8 max-w-3xl">
        Browse intent-focused city rankings targeting practical relocation questions with lower keyword competition.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {landings.map((landing) => (
          <Link
            key={landing.slug}
            href={`/keywords/${landing.slug}`}
            className="block bg-white border border-gray-200 rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{landing.title}</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-3">{landing.description}</p>
            <p className="text-xs sm:text-sm text-gray-700 mb-4">
              <span className="font-semibold">Target keyword:</span> {landing.primaryKeyword}
            </p>
            <span className="inline-block text-blue-600 font-medium">Open ranking →</span>
          </Link>
        ))}
      </div>
    </main>
  )
}
