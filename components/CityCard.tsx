import { City } from "@/types/city"
import Link from "next/link"
import ScoreBadge from "./ScoreBadge"

interface Props {
  city: City
}

export default function CityCard({ city }: Props) {
  return (
    <Link 
      href={`/city/${city.slug}`} 
      className="group block bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
    >
      {/* Header with gradient */}
      <div className="h-24 sm:h-28 md:h-32 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 relative">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-0.5 sm:mb-1">{city.name}</h3>
          <p className="text-blue-100 text-xs sm:text-sm flex items-center">
            <span className="mr-1">📍</span>
            {city.country}
          </p>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
        {/* Overall Score */}
        <div className="flex items-center justify-between">
          <span className="text-gray-600 font-medium">Overall Score</span>
          <ScoreBadge score={city.scores.overall} />
        </div>
        
        {/* Key metrics */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <span className="text-base sm:text-lg">🛡️</span>
            <div>
              <div className="text-xs text-gray-500">Safety</div>
              <div className="text-xs sm:text-sm font-semibold text-gray-900">{city.scores.safety.toFixed(1)}/10</div>
            </div>
          </div>
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <span className="text-base sm:text-lg">💰</span>
            <div>
              <div className="text-xs text-gray-500">Cost/mo</div>
              <div className="text-xs sm:text-sm font-semibold text-gray-900">${city.cost.single}</div>
            </div>
          </div>
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <span className="text-base sm:text-lg">📶</span>
            <div>
              <div className="text-xs text-gray-500">Internet</div>
              <div className="text-xs sm:text-sm font-semibold text-gray-900">{city.infrastructure.internetSpeedMbps} Mbps</div>
            </div>
          </div>
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <span className="text-base sm:text-lg">🌡️</span>
            <div>
              <div className="text-xs text-gray-500">Climate</div>
              <div className="text-xs sm:text-sm font-semibold text-gray-900">{city.environment.avgTempC}°C</div>
            </div>
          </div>
        </div>
        
        {/* View details link */}
        <div className="pt-3 border-t border-gray-100">
          <span className="text-blue-600 font-semibold text-sm group-hover:text-blue-700 flex items-center">
            View Details
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
