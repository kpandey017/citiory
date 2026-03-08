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
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "")

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who are these relocation guides for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "These guides are for people choosing where to live, work remotely, or relocate with a structured decision process.",
        },
      },
      {
        "@type": "Question",
        name: "How should I use a guide on this page?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pick the guide matching your current goal, follow the steps in order, and then validate your shortlist with city-level data.",
        },
      },
      {
        "@type": "Question",
        name: "Do these guides include actionable outcomes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Each guide is designed to produce a concrete next step, such as a shortlist or a comparison-ready set of cities.",
        },
      },
    ],
    url: `${siteUrl}/guides`,
  }

  return (
    <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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

      <section className="mt-10 sm:mt-12 prose prose-gray max-w-3xl">
        <h2>How These Guides Help You Decide Faster</h2>
        <p>
          These guide hubs are organized around real relocation decisions, from selecting a city shortlist to comparing long-term living
          tradeoffs. They are structured to reduce research time and turn broad questions into practical next steps.
        </p>
        <p>
          Choose one guide based on your current stage, complete the suggested sequence, and then move into city-level comparisons for final
          validation.
        </p>
      </section>
    </main>
  )
}
