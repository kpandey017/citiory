import { getCityBySlug, getAllCities } from "@/lib/data/cities"
import { notFound } from "next/navigation"
import ReviewCard from "@/components/ReviewCard"
import { getReviewsByCitySlug } from "@/lib/data/reviews"
import ScoreBadge from "@/components/ScoreBadge"
import type { Metadata } from "next"
import Link from "next/link"
import { getAllBlogPosts } from "@/lib/data/blogs"
import { getRelatedPostsForCity } from "@/lib/blog-seo"
import { buildComparePairSlug } from "@/lib/compare-seo"

interface Params {
  slug: string
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const city = await getCityBySlug(slug)
  if (!city) return {}
  const title = `Living in ${city.name}`
  const description = `Cost of living, safety, pollution, climate, literacy, and reviews of ${city.name}`
  const url = `/city/${city.slug}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title: `${title} | Citiory`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Citiory`,
      description,
    },
  }
}

// statically generate all city pages
export async function generateStaticParams() {
  const cities = await getAllCities()
  return cities.map((city) => ({ slug: city.slug }))
}

export default async function CityPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const city = await getCityBySlug(slug)
  if (!city) notFound()
  const allCities = await getAllCities()
  const reviews = await getReviewsByCitySlug(city.slug)
  const allPosts = await getAllBlogPosts()
  const relatedPosts = getRelatedPostsForCity(city, allPosts, 4)
  const comparisonCities = allCities
    .filter((candidate) => candidate.slug !== city.slug && candidate.continent === city.continent)
    .sort((a, b) => b.scores.overall - a.scores.overall)
    .slice(0, 6)

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "")
  const pageUrl = `${siteUrl}/city/${city.slug}`

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Cities",
        item: `${siteUrl}/cities`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: city.name,
        item: pageUrl,
      },
    ],
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Is ${city.name} affordable for a single person?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${city.name} has an estimated monthly cost of ${city.cost.single} for a single person, excluding personal lifestyle differences.`,
        },
      },
      {
        "@type": "Question",
        name: `How good is internet in ${city.name} for remote work?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${city.name} shows an average internet speed of ${city.infrastructure.internetSpeedMbps} Mbps and an internet score of ${city.scores.internet.toFixed(1)} out of 10.`,
        },
      },
      {
        "@type": "Question",
        name: `How safe is ${city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${city.name} has a safety score of ${city.scores.safety.toFixed(1)} out of 10 and an overall crime index of ${city.crime.overallCrimeIndex}.`,
        },
      },
    ],
  }

  const sourceHighlights = [
    { label: "Population", source: city.sources.population },
    { label: "Cost of Living", source: city.sources.cost.single },
    { label: "Safety", source: city.sources.scores.safety },
    { label: "Internet", source: city.sources.scores.internet },
    { label: "Healthcare", source: city.sources.scores.healthcare },
    { label: "Air Quality", source: city.sources.environment.airQualityIndex },
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-blue-200 text-sm sm:text-base mb-2">📍 {city.country} · {city.continent}</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4">{city.name}</h1>
              <p className="text-base sm:text-lg text-blue-100">Population: {city.population.toLocaleString()}</p>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-2">
              <span className="text-xs sm:text-sm text-blue-200 font-medium">Overall Score</span>
              <ScoreBadge score={city.scores.overall} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        
        {/* Description Section */}
        <section className="mb-8 sm:mb-10 md:mb-12 bg-white p-6 sm:p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">About {city.name}</h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">{city.description}</p>
          
          {/* Specialty */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 p-4 rounded">
            <h3 className="font-bold text-blue-900 mb-2">✨ City Specialty</h3>
            <p className="text-gray-800">{city.specialty}</p>
          </div>
        </section>

        {/* Why People Love This City */}
        <section className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">❤️ Why People Love {city.name}</h2>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {city.why_people_love.map((reason, index) => (
              <div key={index} className="bg-white p-4 sm:p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-500">
                <p className="text-sm sm:text-base text-gray-800">{reason}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">🗣️ Languages</h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {city.languages.map((lang, index) => (
              <span key={index} className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 font-semibold rounded-full text-sm sm:text-base">
                {lang}
              </span>
            ))}
          </div>
        </section>

        {/* Companies & People */}
        <section className="mb-8 sm:mb-10 md:mb-12">
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {/* Famous Companies */}
            <div className="bg-white p-6 sm:p-7 rounded-xl shadow-lg">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">🏢 Major Companies</h2>
              <ul className="space-y-3">
                {city.famous_companies.map((company, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">→</span>
                    <span className="text-gray-700 text-sm sm:text-base">{company}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Famous People */}
            <div className="bg-white p-6 sm:p-7 rounded-xl shadow-lg">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">👤 Notable People</h2>
              <ul className="space-y-3">
                {city.famous_people.map((person, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1">★</span>
                    <span className="text-gray-700 text-sm sm:text-base">{person}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        
        {/* Scores Grid */}
        <section className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">City Scores</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-2xl sm:text-3xl mb-2">🛡️</div>
              <div className="text-xs sm:text-sm text-gray-600 mb-1">Safety</div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900">{city.scores.safety.toFixed(1)}/10</div>
            </div>
            <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-2xl sm:text-3xl mb-2">🌫️</div>
              <div className="text-xs sm:text-sm text-gray-600 mb-1">Pollution</div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900">{city.scores.pollution.toFixed(1)}/10</div>
            </div>
            <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-2xl sm:text-3xl mb-2">📶</div>
              <div className="text-xs sm:text-sm text-gray-600 mb-1">Internet</div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900">{city.scores.internet.toFixed(1)}/10</div>
            </div>
            <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-2xl sm:text-3xl mb-2">✨</div>
              <div className="text-xs sm:text-sm text-gray-600 mb-1">Quality of Life</div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900">{city.scores.qualityOfLife.toFixed(1)}/10</div>
            </div>
            <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-2xl sm:text-3xl mb-2">💼</div>
              <div className="text-xs sm:text-sm text-gray-600 mb-1">Job Market</div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900">{city.scores.job.toFixed(1)}/10</div>
            </div>
            <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-2xl sm:text-3xl mb-2">🏥</div>
              <div className="text-xs sm:text-sm text-gray-600 mb-1">Healthcare</div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900">{city.scores.healthcare.toFixed(1)}/10</div>
            </div>
            <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-2xl sm:text-3xl mb-2">🌡️</div>
              <div className="text-xs sm:text-sm text-gray-600 mb-1">Climate</div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900">{city.scores.climate.toFixed(1)}/10</div>
            </div>
            <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-2xl sm:text-3xl mb-2">📚</div>
              <div className="text-xs sm:text-sm text-gray-600 mb-1">Literacy Rate</div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900">{city.literacyRate}%</div>
            </div>
          </div>
        </section>

        {/* Cost of Living */}
        <section className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Cost of Living</h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium text-gray-700">💰 Single Person</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-bold text-gray-900">${city.cost.single}/month</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium text-gray-700">👨‍👩‍👧 Couple</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-bold text-gray-900">${city.cost.couple}/month</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium text-gray-700">🏢 Rent (City Center)</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-bold text-gray-900">${city.cost.rentCenter}/month</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium text-gray-700">🏘️ Rent (Outside Center)</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-bold text-gray-900">${city.cost.rentOutside}/month</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium text-gray-700">🍕 Food</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-bold text-gray-900">${city.cost.food}/month</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium text-gray-700">🚌 Transport</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-bold text-gray-900">${city.cost.transport}/month</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium text-gray-700">💡 Utilities</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-bold text-gray-900">${city.cost.utilities}/month</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Environment & Infrastructure */}
        <section className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Environment & Infrastructure</h2>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white p-5 sm:p-6 rounded-xl shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">🌍 Climate</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base text-gray-600">Type</span>
                  <span className="text-sm sm:text-base font-semibold text-gray-900">{city.environment.climateType}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base text-gray-600">Avg Temperature</span>
                  <span className="text-sm sm:text-base font-semibold text-gray-900">{city.environment.avgTempC}°C</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base text-gray-600">Air Quality Index</span>
                  <span className="text-sm sm:text-base font-semibold text-gray-900">{city.environment.airQualityIndex}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base text-gray-600">Pollution Level</span>
                  <span className="text-sm sm:text-base font-semibold text-gray-900">{city.environment.pollutionLevel}</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-5 sm:p-6 rounded-xl shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">📡 Internet</h3>
              <div className="text-center py-4">
                <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">
                  {city.infrastructure.internetSpeedMbps}
                </div>
                <div className="text-base sm:text-lg text-gray-600">Mbps Average Speed</div>
              </div>
            </div>
          </div>
        </section>

        {/* Crime & Safety */}
        <section className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">🚨 Crime & Safety</h2>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white p-5 sm:p-6 rounded-xl shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Safety Rating</h3>
              <div className="text-center py-6">
                <div className="text-3xl sm:text-4xl font-bold mb-3">
                  {city.crime.overallCrimeIndex <= 30 && "🟢"}
                  {city.crime.overallCrimeIndex > 30 && city.crime.overallCrimeIndex <= 60 && "🟡"}
                  {city.crime.overallCrimeIndex > 60 && "🔴"}
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{city.crime.safetyRating}</div>
                <div className="text-sm sm:text-base text-gray-600">Crime Index: {city.crime.overallCrimeIndex}</div>
              </div>
            </div>
            <div className="bg-white p-5 sm:p-6 rounded-xl shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Crime Statistics (per 100K)</h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-xs sm:text-sm text-gray-600">Homicide Rate</span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-900">{city.crime.homicideRate.toFixed(1)}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-xs sm:text-sm text-gray-600">Robbery Rate</span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-900">{city.crime.robberyRate.toFixed(1)}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-xs sm:text-sm text-gray-600">Theft Rate</span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-900">{city.crime.theftRate.toFixed(1)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-gray-600">Assault Rate</span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-900">{city.crime.assaultRate.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Reviews</h2>
          {reviews.length > 0 ? (
            <div>
              {reviews.map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-100 border border-gray-300 rounded-xl p-6 sm:p-8 text-center">
              <p className="text-sm sm:text-base text-gray-600">No reviews yet for this city.</p>
            </div>
          )}
        </section>

        {/* Source Transparency */}
        <section className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">📚 Data Sources</h2>
          <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6">
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              This page is reviewed monthly. Source links and as-of dates are shown below for transparency.
            </p>
            <div className="space-y-3">
              {sourceHighlights.map((item) => (
                <div key={item.label} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 border-b border-gray-100 pb-2">
                  <span className="font-medium text-gray-900 text-sm sm:text-base">{item.label}</span>
                  <div className="text-xs sm:text-sm text-gray-600">
                    <span>{item.source.provider} · {item.source.asOf}</span>
                    {item.source.url && (
                      <a
                        href={item.source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-blue-600 hover:text-blue-700"
                      >
                        Source
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Methodology:
              <Link href="/methodology" className="ml-1 text-blue-600 hover:text-blue-700 underline">
                How scores are calculated
              </Link>
            </p>
          </div>
        </section>

        {/* Related Guides */}
        <section className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">📝 Related Guides</h2>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block bg-white p-4 sm:p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{post.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">⚖️ Compare {city.name} with other cities</h2>
          <div className="flex flex-wrap gap-2">
            {comparisonCities.map((candidate) => {
              const pairSlug = buildComparePairSlug(city.slug, candidate.slug)

              return (
                <Link
                  key={candidate.slug}
                  href={`/compare/${pairSlug}`}
                  className="px-3 py-2 text-sm bg-gray-100 text-gray-800 rounded-lg hover:bg-blue-100 hover:text-blue-800 transition-colors"
                >
                  {city.name} vs {candidate.name}
                </Link>
              )
            })}
          </div>
        </section>
      </div>
    </main>
  )
}
