interface MetaItemProps {
  label: string;
  value?: string;
  highlight?: boolean;
}

function MetaItem({ label, value, highlight }: MetaItemProps) {
  if (!value || value === "N/A") return null;

  return (
    <div>
      <p className="text-sm text-gray-500 uppercase mb-1">{label}</p>
      <p
        className={`font-semibold text-lg ${highlight ? "text-green-400" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}

interface MovieMetaProps {
  director?: string;
  actors?: string;
  boxOffice?: string;
  awards?: string;
}

export default function MovieMeta({
  director,
  actors,
  boxOffice,
  awards,
}: MovieMetaProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
      <MetaItem label="Director" value={director} />
      <MetaItem label="Cast" value={actors} />
      <MetaItem label="Box Office" value={boxOffice} highlight />
      <MetaItem label="Awards" value={awards} />
    </div>
  );
}
