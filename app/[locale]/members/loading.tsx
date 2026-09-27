export default function MembersLoading() {
  return (
    <div className="bg-surface py-20" aria-busy="true" aria-label="Loading industry directory">
      <div className="container-shell animate-pulse">
        <div className="h-10 w-64 rounded-lg bg-slate-200" />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {Array.from({length: 6}).map((_, index) => (
            <div key={index} className="h-64 rounded-2xl border border-line bg-white" />
          ))}
        </div>
      </div>
    </div>
  );
}
