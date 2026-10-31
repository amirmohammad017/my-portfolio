import type { Metadata } from "next";
import "@/modules/movie-app/assets/style/globals.css";
import { MovieProvider } from "@/modules/movie-app/context/MovieContext";

export const metadata: Metadata = {
  title: {
    default: "Movie App",
    template: "%s | Movie App",
  },
  description:
    "Search movies and series and explore ratings, cast and plot details, powered by the OMDb API.",
};

export default function MovieAppRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <MovieProvider>{children}</MovieProvider>
      </body>
    </html>
  );
}
