import Link from "next/link";
import { MOVIE_APP_BASE_PATH } from "@/modules/movie-app/config/paths";

export default function MovieAppNotFound() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Movie not found</h1>
      <Link href={MOVIE_APP_BASE_PATH} className="text-blue-400 hover:underline">
        Back to Movies
      </Link>
    </main>
  );
}
