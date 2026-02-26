"use client"

import { useState } from "react"
import { City } from "@/types/city"
import CityCard from "./CityCard"
import SearchBar from "./SearchBar"

interface Props {
  cities: City[]
}

export default function CityList({ cities }: Props) {
  const [filtered, setFiltered] = useState<City[]>(cities)

  function handleSearch(query: string) {
    const lower = query.toLowerCase()
    setFiltered(cities.filter((c) => c.name.toLowerCase().includes(lower)))
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map((city) => (
          <CityCard key={city.slug} city={city} />
        ))}
      </div>
    </div>
  )
}
