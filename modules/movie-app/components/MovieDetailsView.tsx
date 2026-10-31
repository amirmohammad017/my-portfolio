import type { MovieDetails } from "@/modules/movie-app/types/movie";
import BackButton from "./movie-details/BackButton";
import MoviePoster from "./movie-details/MoviePoster";
import MovieHeader from "./movie-details/MovieHeader";
import GenreList from "./movie-details/GenreList";
import PlotSection from "./movie-details/PlotSection";
import RatingsGrid from "./movie-details/RatingsGrid";
import MovieMeta from "./movie-details/MovieMeta";

export default function MovieDetailsView({ movie }: { movie: MovieDetails }) {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        <BackButton />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <MoviePoster poster={movie.Poster} title={movie.Title} />

          <div className="md:col-span-8 flex flex-col gap-8">
            <MovieHeader
              title={movie.Title}
              rating={movie.imdbRating}
              year={movie.Year}
              runtime={movie.Runtime}
              rated={movie.Rated}
            />

            <GenreList genre={movie.Genre} />

            <PlotSection plot={movie.Plot} />

            <RatingsGrid ratings={movie.Ratings} />

            <MovieMeta
              director={movie.Director}
              actors={movie.Actors}
              boxOffice={movie.BoxOffice}
              awards={movie.Awards}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
