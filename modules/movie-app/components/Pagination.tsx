import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  loading,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
        className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition disabled:opacity-40"
      >
        <IoChevronBack />
        Prev
      </button>

      <span className="text-sm text-gray-300">
        Page <span className="font-bold text-white">{currentPage}</span> of{" "}
        <span className="font-bold">{totalPages}</span>
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
        className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition disabled:opacity-40"
      >
        Next
        <IoChevronForward />
      </button>
    </div>
  );
}
