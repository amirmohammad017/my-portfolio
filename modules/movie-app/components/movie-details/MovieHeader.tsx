import { IoStar, IoTime, IoCalendar } from "react-icons/io5";

interface MovieHeaderProps {
  title: string;
  rating?: string;
  year?: string;
  runtime?: string;
  rated?: string;
}

export default function MovieHeader({
  title,
  rating,
  year,
  runtime,
  rated,
}: MovieHeaderProps) {
  return (
    <div>
      <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
        {title}
      </h1>

      <div className="flex flex-wrap gap-4 items-center text-gray-400">
        {rating && rating !== "N/A" && (
          <span className="flex items-center gap-1.5 bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-lg border border-yellow-500/20">
            <IoStar /> {rating}
          </span>
        )}

        {year && (
          <span className="flex items-center gap-1.5">
            <IoCalendar /> {year}
          </span>
        )}

        {runtime && runtime !== "N/A" && (
          <span className="flex items-center gap-1.5">
            <IoTime /> {runtime}
          </span>
        )}

        {rated && rated !== "N/A" && (
          <span className="bg-gray-800 px-2 py-0.5 rounded text-xs border border-gray-700">
            {rated}
          </span>
        )}
      </div>
    </div>
  );
}
