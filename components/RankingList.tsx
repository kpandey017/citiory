import { City } from "@/types/city"
import Link from "next/link"
import ScoreBadge from "./ScoreBadge"

interface Props {
  cities: City[]
}

export default function RankingList({ cities }: Props) {
  const getMedalEmoji = (index: number) => {
    if (index === 0) return "🥇"
    if (index === 1) return "🥈"
    if (index === 2) return "🥉"
    return `${index + 1}.`
  }

  return (
    <div className="space-y-2 sm:space-y-3">
      {cities.map((city, index) => (
        <Link 
          key={city.slug} 
          href={`/city/${city.slug}`}
          className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 hover:bg-blue-50 rounded-lg sm:rounded-xl transition-all group border border-transparent hover:border-blue-200"
        >
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 flex-1 min-w-0">
            <span className="text-xl sm:text-2xl font-bold text-gray-400 group-hover:text-blue-600 transition-colors w-8 sm:w-10 md:w-12 flex-shrink-0">
              {getMedalEmoji(index)}
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm sm:text-base text-gray-900 group-hover:text-blue-700 transition-colors truncate">
                {city.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 truncate">{city.country}</p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <ScoreBadge score={city.scores.overall} />
          </div>
        </Link>
      ))}
    </div>
  )
}
