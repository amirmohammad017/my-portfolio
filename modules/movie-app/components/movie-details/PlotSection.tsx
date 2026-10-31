export default function PlotSection({ plot }: { plot?: string }) {
  if (!plot || plot === "N/A") return null;

  return (
    <div className="bg-gray-900/40 p-6 rounded-2xl border border-white/5">
      <h3 className="text-xl font-bold mb-3 text-blue-400">Plot</h3>
      <p className="text-gray-300 leading-relaxed text-lg italic">
        &quot;{plot}&quot;
      </p>
    </div>
  );
}
