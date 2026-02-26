import { getAllCities } from "@/lib/data/cities"
import CityCard from "@/components/CityCard"
import RankingList from "@/components/RankingList"
import { getCitiesByOverallScore } from "@/lib/data/rankings"
import { calculateNomadScore } from "@/lib/scoring"
import Link from "next/link"

export const metadata = {
  title: "Home | Citiory",
  description: "Discover cities worldwide with cost, safety, pollution, climate and more.",
}

export default async function Home() {
  const cities = await getAllCities()
  const topRanked = await getCitiesByOverallScore()
  const popular = cities.slice(0, 3)
  const nomadSorted = [...cities].sort(
    (a, b) => calculateNomadScore(b) - calculateNomadScore(a)
  )

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight">
              Discover Your Perfect
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                City Worldwide
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 text-blue-100 leading-relaxed px-4">
              Compare 500+ cities globally. Get insights on cost of living, safety, climate, 
              internet speed, and quality of life. Make informed decisions for your next move.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link
                href="/cities"
                className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-white text-blue-700 font-bold rounded-full hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl"
              >
                Explore Cities
              </Link>
              <Link
                href="/compare"
                className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all"
              >
                Compare Cities
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-10 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600 mb-1 sm:mb-2">{cities.length}+</div>
              <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">Cities Covered</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-600 mb-1 sm:mb-2">195</div>
              <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">Countries</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-600 mb-1 sm:mb-2">50K+</div>
              <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">Data Sources</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-pink-600 mb-1 sm:mb-2">8</div>
              <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">Data Points</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
              Everything You Need to Know
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Make data-driven decisions with comprehensive city intelligence
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-white p-5 sm:p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl">💰</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Cost of Living</h3>
              <p className="text-sm sm:text-base text-gray-600">Compare rent, food, transport, and utilities across cities</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Safety Ratings</h3>
              <p className="text-gray-600">Real-time safety scores and crime statistics</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-3xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Climate Data</h3>
              <p className="text-gray-600">Weather patterns, temperature, and air quality</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-3xl">📶</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Internet Speed</h3>
              <p className="text-gray-600">Connectivity metrics for remote workers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Cities */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
              Popular Destinations
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">Explore the most searched cities</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
            {popular.map((city) => (
              <CityCard key={city.slug} city={city} />
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/cities"
              className="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Cities
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Top Ranked */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
                🏆 Top Ranked Cities
              </h2>
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                <RankingList cities={topRanked.slice(0, 5)} />
              </div>
              <Link
                href="/rankings"
                className="inline-block mt-4 sm:mt-6 text-sm sm:text-base text-blue-600 font-semibold hover:text-blue-700 px-2"
              >
                View Full Rankings →
              </Link>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
                🌐 Best for Digital Nomads
              </h2>
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                <RankingList cities={nomadSorted.slice(0, 5)} />
              </div>
              <Link
                href="/nomads"
                className="inline-block mt-4 sm:mt-6 text-sm sm:text-base text-blue-600 font-semibold hover:text-blue-700 px-2"
              >
                View Nomad Rankings →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Ready to Find Your Next Home?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 px-4">
            Join thousands of expats, digital nomads, and travelers making smarter city choices
          </p>
          <Link
            href="/cities"
            className="inline-block px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg bg-white text-blue-700 font-bold rounded-full hover:bg-blue-50 transition-all transform hover:scale-105 shadow-2xl"
          >
            Start Exploring Now
          </Link>
        </div>
      </section>
    </main>
  )
}
