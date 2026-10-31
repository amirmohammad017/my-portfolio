import type { FormEvent } from "react";
import { IoSearch } from "react-icons/io5";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onSearch: (event: FormEvent) => void;
  loading: boolean;
}

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  onSearch,
  loading,
}: SearchBarProps) {
  return (
    <div className="max-w-4xl mx-auto text-center mb-12">
      <h1 className="text-5xl font-black mb-6 bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
        Explore Movies & Series
      </h1>

      <form onSubmit={onSearch} className="relative max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search for movies (e.g. Godfather)..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 pl-14 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-lg"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <IoSearch
          className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
          size={24}
        />

        <button
          type="submit"
          disabled={loading}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-xl font-bold transition-colors"
        >
          {loading ? "..." : "Search"}
        </button>
      </form>
    </div>
  );
}
