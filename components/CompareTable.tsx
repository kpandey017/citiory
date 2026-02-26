import { City } from "@/types/city"

interface Props {
  cityA: City
  cityB: City
}

export default function CompareTable({ cityA, cityB }: Props) {
  const rows: Array<{ label: string; valueA: string | number; valueB: string | number }> = [
    { label: "Overall Score", valueA: cityA.scores.overall, valueB: cityB.scores.overall },
    { label: "Quality of Life Score", valueA: cityA.scores.qualityOfLife, valueB: cityB.scores.qualityOfLife },
    { label: "Safety Score", valueA: cityA.scores.safety, valueB: cityB.scores.safety },
    { label: "Healthcare Score", valueA: cityA.scores.healthcare, valueB: cityB.scores.healthcare },
    { label: "Job Market Score", valueA: cityA.scores.job, valueB: cityB.scores.job },
    { label: "Internet Score", valueA: cityA.scores.internet, valueB: cityB.scores.internet },
    { label: "Climate Score", valueA: cityA.scores.climate, valueB: cityB.scores.climate },
    { label: "Pollution Score", valueA: cityA.scores.pollution, valueB: cityB.scores.pollution },
    { label: "Population", valueA: cityA.population.toLocaleString(), valueB: cityB.population.toLocaleString() },
    { label: "Literacy Rate", valueA: `${cityA.literacyRate}%`, valueB: `${cityB.literacyRate}%` },
    { label: "Monthly Cost (Single)", valueA: `$${cityA.cost.single}`, valueB: `$${cityB.cost.single}` },
    { label: "Monthly Cost (Couple)", valueA: `$${cityA.cost.couple}`, valueB: `$${cityB.cost.couple}` },
    { label: "Rent (City Center)", valueA: `$${cityA.cost.rentCenter}`, valueB: `$${cityB.cost.rentCenter}` },
    { label: "Rent (Outside Center)", valueA: `$${cityA.cost.rentOutside}`, valueB: `$${cityB.cost.rentOutside}` },
    { label: "Food Cost", valueA: `$${cityA.cost.food}`, valueB: `$${cityB.cost.food}` },
    { label: "Transport Cost", valueA: `$${cityA.cost.transport}`, valueB: `$${cityB.cost.transport}` },
    { label: "Utilities Cost", valueA: `$${cityA.cost.utilities}`, valueB: `$${cityB.cost.utilities}` },
    {
      label: "Internet Speed",
      valueA: `${cityA.infrastructure.internetSpeedMbps} Mbps`,
      valueB: `${cityB.infrastructure.internetSpeedMbps} Mbps`,
    },
    { label: "Air Quality Index", valueA: cityA.environment.airQualityIndex, valueB: cityB.environment.airQualityIndex },
    { label: "Pollution Level", valueA: cityA.environment.pollutionLevel, valueB: cityB.environment.pollutionLevel },
    { label: "Climate Type", valueA: cityA.environment.climateType, valueB: cityB.environment.climateType },
    { label: "Average Temperature", valueA: `${cityA.environment.avgTempC}°C`, valueB: `${cityB.environment.avgTempC}°C` },
    { label: "Overall Crime Index", valueA: cityA.crime.overallCrimeIndex, valueB: cityB.crime.overallCrimeIndex },
    { label: "Safety Rating", valueA: cityA.crime.safetyRating, valueB: cityB.crime.safetyRating },
    { label: "Homicide Rate", valueA: cityA.crime.homicideRate, valueB: cityB.crime.homicideRate },
    { label: "Robbery Rate", valueA: cityA.crime.robberyRate, valueB: cityB.crime.robberyRate },
    { label: "Theft Rate", valueA: cityA.crime.theftRate, valueB: cityB.crime.theftRate },
    { label: "Assault Rate", valueA: cityA.crime.assaultRate, valueB: cityB.crime.assaultRate },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse bg-white rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <tr>
            <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm md:text-base font-semibold">Metric</th>
            <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm md:text-base font-semibold">{cityA.name}</th>
            <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm md:text-base font-semibold">{cityB.name}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rows.map((row) => (
            <tr key={row.label} className="hover:bg-gray-50">
              <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm md:text-base font-medium text-gray-700">{row.label}</td>
              <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm md:text-base text-gray-900">{row.valueA}</td>
              <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm md:text-base text-gray-900">{row.valueB}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
