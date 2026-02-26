import { Review } from "@/types/review"

interface Props {
  review: Review
}

export default function ReviewCard({ review }: Props) {
  return (
    <div className="p-4 sm:p-5 md:p-6 border border-gray-200 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 bg-white hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
        <h4 className="font-semibold text-base sm:text-lg text-gray-900">Rating: {review.rating}/10</h4>
        <p className="text-xs sm:text-sm text-gray-600 font-medium">💵 Cost estimate: ${review.costEstimate}/mo</p>
      </div>
      <p className="text-sm sm:text-base text-gray-700 mb-3">{review.text}</p>
      <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
        {review.pros && (
          <div className="flex-1 min-w-[120px]">
            <span className="font-semibold text-green-700">✔️ Pros:</span>
            <span className="text-gray-600 ml-1">{review.pros}</span>
          </div>
        )}
        {review.cons && (
          <div className="flex-1 min-w-[120px]">
            <span className="font-semibold text-red-700">❌ Cons:</span>
            <span className="text-gray-600 ml-1">{review.cons}</span>
          </div>
        )}
      </div>
    </div>
  )
}
