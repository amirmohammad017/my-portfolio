"use client";

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { MovieSummary } from "@/modules/movie-app/types/movie";

interface MovieContextValue {
  movies: MovieSummary[];
  setMovies: Dispatch<SetStateAction<MovieSummary[]>>;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalResults: number;
  setTotalResults: Dispatch<SetStateAction<number>>;
}

const MovieContext = createContext<MovieContextValue | null>(null);

export function MovieProvider({ children }: { children: ReactNode }) {
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        searchTerm,
        setSearchTerm,
        currentPage,
        setCurrentPage,
        totalResults,
        setTotalResults,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export function useMovieContext() {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used inside MovieProvider");
  }
  return context;
}
