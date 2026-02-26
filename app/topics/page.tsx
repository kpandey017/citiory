import type { Metadata } from "next"
import Link from "next/link"
import { topicFamilies } from "@/config/topic-families"

export const metadata: Metadata = {
  title: "Topics",
  description: "Topic hubs that explain what you will learn, who each topic is for, and where to start.",
  alternates: {
    canonical: "/topics",
  },
}

export default function TopicsPage() {
  return (
    <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Topics</h1>
      <p className="text-gray-600 mb-6 sm:mb-8 max-w-3xl">
        Pick a topic based on your relocation goal. Each page gives you a clear learning path, related cities, and next steps.
      </p>

      <div className="mb-6 sm:mb-8 p-4 sm:p-5 bg-blue-50 border border-blue-100 rounded-xl">
        <p className="text-sm sm:text-base text-gray-800">
          Looking for long-tail query pages?
          <Link href="/keywords" className="ml-1 text-blue-600 font-medium hover:text-blue-700">
            Open keyword-focused city rankings →
          </Link>
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {topicFamilies.map((topic) => (
          <Link
            key={topic.slug}
            href={`/topics/${topic.slug}`}
            className="block bg-white border border-gray-200 rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{topic.title}</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-3">{topic.intro}</p>
            <p className="text-xs sm:text-sm text-gray-700 mb-3">
              <span className="font-semibold">Best for:</span> {topic.bestFor}
            </p>
            <ul className="list-disc pl-5 text-xs sm:text-sm text-gray-700 space-y-1 mb-4">
              {topic.whatYouWillLearn.slice(0, 2).map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <span className="inline-block text-blue-600 font-medium">
              Open topic hub →
            </span>
          </Link>
        ))}
      </div>
    </main>
  )
}
