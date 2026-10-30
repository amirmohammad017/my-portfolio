export default function Loading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center" role="status">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-slate-400 border-t-transparent dark:border-white/40 dark:border-t-transparent" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
