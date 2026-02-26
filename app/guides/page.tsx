import type { Metadata } from "next"
import Link from "next/link"
import { blogClusters } from "@/config/blog-clusters"

export const metadata: Metadata = {
  title: "Guides",
  description: "Action-oriented city decision guides that tell you what to read first and what result you should expect.",
  alternates: {
    canonical: "/guides",
  },
}

export default function GuidesPage() {
  return (
    <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Guides</h1>
      <p className="text-gray-600 mb-6 sm:mb-8 max-w-3xl">
        Choose a guide based on your goal. Each guide includes when to use it, a simple step order, and the outcome you should get.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {blogClusters.map((cluster) => (
          <Link
            key={cluster.slug}
            href={`/guides/${cluster.slug}`}
            className="block bg-white border border-gray-200 rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{cluster.title}</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-3">{cluster.description}</p>
            <p className="text-xs sm:text-sm text-gray-700 mb-2">
              <span className="font-semibold">Best for:</span> {cluster.audience}
            </p>
            <p className="text-xs sm:text-sm text-gray-700 mb-3">
              <span className="font-semibold">When to use:</span> {cluster.whenToUse}
            </p>
            <ol className="list-decimal pl-5 text-xs sm:text-sm text-gray-700 space-y-1 mb-4">
              {cluster.quickSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="text-xs sm:text-sm text-blue-700 mb-4">Outcome: {cluster.outcome}</p>
            <span className="inline-block text-blue-600 font-medium">
              Open guide plan →
            </span>
          </Link>
        ))}
      </div>
    </main>
  )
}
