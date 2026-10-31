export default function GenreList({ genre }: { genre?: string }) {
  if (!genre || genre === "N/A") return null;

  const genres = genre.split(", ");

  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((item) => (
        <span
          key={item}
          className="px-4 py-1.5 bg-blue-600/10 text-blue-400 rounded-full border border-blue-600/20 text-sm font-medium"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
