import Link from "next/link";
import { IoFilm } from "react-icons/io5";
import type { MovieSummary } from "@/modules/movie-app/types/movie";
import { movieDetailsPath } from "@/modules/movie-app/config/paths";

export default function MovieCard({ movie }: { movie: MovieSummary }) {
  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  return (
    <Link
      href={movieDetailsPath(movie.imdbID)}
      className="group block cursor-pointer bg-white/5 rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/50 transition-all hover:-translate-y-2 shadow-xl"
    >
      <div className="relative aspect-2/3 overflow-hidden">
        {hasPoster ? (
          <img
            src={movie.Poster}
            alt={`${movie.Title} Poster`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500 text-sm">
            No Poster
          </div>
        )}

        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border border-white/10">
          {movie.Type}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-sm line-clamp-1 group-hover:text-blue-400 transition-colors">
          {movie.Title}
        </h3>

        <div className="flex justify-between items-center mt-2 text-gray-400 text-xs">
          <span>{movie.Year}</span>

          <span className="flex items-center gap-1">
            <IoFilm className="text-blue-500" />
            ID: {movie.imdbID.slice(0, 5)}
          </span>
        </div>
      </div>
    </Link>
  );
}
