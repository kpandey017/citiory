interface Props {
  score: number
}

export default function ScoreBadge({ score }: Props) {
  // Dynamic color based on score
  const getScoreColor = () => {
    if (score >= 8.5) return "bg-emerald-100 text-emerald-800 border-emerald-200"
    if (score >= 7.0) return "bg-green-100 text-green-800 border-green-200"
    if (score >= 5.5) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    if (score >= 4.0) return "bg-orange-100 text-orange-800 border-orange-200"
    return "bg-red-100 text-red-800 border-red-200"
  }

  return (
    <span className={`inline-flex items-center px-3 py-1.5 rounded-full font-bold text-sm border ${getScoreColor()}`}>
      {score.toFixed(1)}
      <span className="ml-1 text-xs opacity-75">/10</span>
    </span>
  )
}
