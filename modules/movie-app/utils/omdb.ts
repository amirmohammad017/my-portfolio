import type {
  MovieDetails,
  MovieSearchResult,
} from "@/modules/movie-app/types/movie";

const OMDB_URL = "https://www.omdbapi.com/";

function getApiKey() {
  const key = process.env.OMDB_API_KEY;
  if (!key) throw new Error("OMDB_API_KEY is not configured");
  return key;
}

export async function searchMovies(
  query: string,
  page: number,
): Promise<MovieSearchResult> {
  const url = `${OMDB_URL}?s=${encodeURIComponent(query)}*&page=${page}&apikey=${getApiKey()}`;
  const response = await fetch(url, { cache: "no-store" });
  const data = await response.json();

  if (data.Response !== "True") return { movies: [], totalResults: 0 };

  return {
    movies: data.Search,
    totalResults: parseInt(data.totalResults, 10),
  };
}

export async function getMovieById(id: string): Promise<MovieDetails | null> {
  const url = `${OMDB_URL}?i=${encodeURIComponent(id)}&apikey=${getApiKey()}`;
  const response = await fetch(url, { next: { revalidate: 86400 } });
  const data = await response.json();

  if (data.Response === "False") return null;
  return data as MovieDetails;
}
