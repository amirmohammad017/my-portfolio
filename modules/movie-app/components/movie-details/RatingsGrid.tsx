import type { MovieRating } from "@/modules/movie-app/types/movie";

export default function RatingsGrid({ ratings }: { ratings?: MovieRating[] }) {
  if (!ratings || ratings.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {ratings.map((rate) => (
        <div
          key={rate.Source}
          className="bg-white/5 p-4 rounded-xl border border-white/5 text-center"
        >
          <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">
            {rate.Source}
          </p>
          <p className="text-lg font-bold">{rate.Value}</p>
        </div>
      ))}
    </div>
  );
}
