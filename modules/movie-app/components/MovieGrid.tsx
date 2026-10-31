import { IoFilm } from "react-icons/io5";
import type { MovieSummary } from "@/modules/movie-app/types/movie";
import MovieCard from "./MovieCard";

interface MovieGridProps {
  movies: MovieSummary[];
  loading: boolean;
}

export default function MovieGrid({ movies, loading }: MovieGridProps) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

      {!loading && movies.length === 0 && (
        <div className="text-center py-20 opacity-20">
          <IoFilm size={80} className="mx-auto mb-4" />
          <p className="text-xl">Search for something to get started</p>
        </div>
      )}
    </div>
  );
}
