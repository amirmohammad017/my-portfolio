"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useMovieContext } from "@/modules/movie-app/context/MovieContext";
import type { MovieSearchResult } from "@/modules/movie-app/types/movie";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import MovieGrid from "./MovieGrid";

export default function HomePage() {
  const {
    movies,
    setMovies,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    totalResults,
    setTotalResults,
  } = useMovieContext();

  const [loading, setLoading] = useState(false);

  const fetchMovies = async (pageNumber: number) => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `/api/movie-app/search?q=${encodeURIComponent(searchTerm)}&page=${pageNumber}`,
      );
      const data: MovieSearchResult = await response.json();
      setMovies(data.movies);
      setTotalResults(data.totalResults);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (movies.length === 0 && searchTerm.trim() !== "") {
      fetchMovies(currentPage);
    }
  }, []);

  const handleSearchSubmit = (event: FormEvent) => {
    event.preventDefault();
    setCurrentPage(1);
    fetchMovies(1);
  };

  const handlePageChange = (newPage: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(newPage);
    fetchMovies(newPage);
  };

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <main className="min-h-screen bg-[#0f172a] text-white p-6">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearchSubmit}
        loading={loading}
      />

      <MovieGrid movies={movies} loading={loading} />

      {totalResults > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          loading={loading}
        />
      )}
    </main>
  );
}
