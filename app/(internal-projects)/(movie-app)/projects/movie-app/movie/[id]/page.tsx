import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MovieDetailsView from "@/modules/movie-app/components/MovieDetailsView";
import { getMovieById } from "@/modules/movie-app/utils/omdb";

type MoviePageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({
  params,
}: MoviePageProps): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovieById(id);
  if (!movie) return { title: "Movie not found" };

  const description =
    movie.Plot && movie.Plot !== "N/A" ? movie.Plot : undefined;
  const images =
    movie.Poster && movie.Poster !== "N/A" ? [movie.Poster] : undefined;

  return {
    title: `${movie.Title} (${movie.Year})`,
    description,
    openGraph: { title: movie.Title, description, images, type: "video.movie" },
    twitter: { card: "summary_large_image", title: movie.Title, description, images },
  };
}

export default async function MovieDetailsPage({ params }: MoviePageProps) {
  const { id } = await params;
  const movie = await getMovieById(id);
  if (!movie) notFound();

  return <MovieDetailsView movie={movie} />;
}

