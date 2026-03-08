import Link from "next/link"
import { bestCategories } from "@/config/categories"

export const metadata = {
  title: "Best Cities",
  description: "Explore top city lists by affordability, safety, and digital nomad suitability.",
}

export default function BestPage() {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "")

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does the Best Cities page include?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It includes category-specific rankings such as affordability, safety, and nomad suitability so you can browse by lifestyle goal.",
        },
      },
      {
        "@type": "Question",
        name: "How do I pick the right ranking category?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Start with your top priority, open that category first, then verify shortlisted cities using detailed profiles and direct comparisons.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use these categories for relocation planning?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Categories help narrow options quickly before you move into deeper city-level research and planning.",
        },
      },
    ],
    url: `${siteUrl}/best`,
  }

  return (
    <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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

      <section className="mt-10 sm:mt-12 prose prose-gray max-w-3xl">
        <h2>Find The Right Ranking Category</h2>
        <p>
          Each category highlights a different relocation priority such as affordability, safety, or remote-work readiness. Picking the right
          category first helps you avoid chasing cities that rank highly for goals you do not actually have.
        </p>
        <p>
          Once you open a category, review the top cities and then confirm the details in individual city profiles before making final move
          decisions.
        </p>
      </section>
    </main>
  )
}
