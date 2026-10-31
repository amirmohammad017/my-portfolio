import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { MOVIE_APP_BASE_PATH } from "@/modules/movie-app/config/paths";

export default function BackButton() {
  return (
    <Link
      href={MOVIE_APP_BASE_PATH}
      className="flex items-center gap-2 mb-8 text-gray-400 hover:text-white transition-all group"
    >
      <IoArrowBack
        size={24}
        className="group-hover:-translate-x-1 transition-transform"
      />
      <span className="font-medium">Back to Movies</span>
    </Link>
  );
}
