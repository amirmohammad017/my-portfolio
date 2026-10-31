import { NextResponse, type NextRequest } from "next/server";
import { searchMovies } from "@/modules/movie-app/utils/omdb";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = (searchParams.get("q") ?? "").trim();
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);

  if (!query) return NextResponse.json({ movies: [], totalResults: 0 });

  try {
    return NextResponse.json(await searchMovies(query, page));
  } catch {
    return NextResponse.json(
      { movies: [], totalResults: 0, error: "Failed to fetch movies" },
      { status: 500 },
    );
  }
}
