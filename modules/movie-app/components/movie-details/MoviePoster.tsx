interface MoviePosterProps {
  poster?: string;
  title: string;
}

export default function MoviePoster({ poster, title }: MoviePosterProps) {
  const isValidPoster = poster && poster !== "N/A";

  return (
    <div className="md:col-span-4">
      <div className="md:sticky md:top-10">
        {isValidPoster ? (
          <img
            src={poster}
            alt={title}
            className="w-full rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)] border border-white/10 object-cover"
          />
        ) : (
          <div className="w-full h-125 flex items-center justify-center rounded-3xl bg-gray-800 border border-white/10 text-gray-500">
            No Image Available
          </div>
        )}
      </div>
    </div>
  );
}
