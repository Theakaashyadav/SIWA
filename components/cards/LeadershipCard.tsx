import { UserRound } from "lucide-react";

export type LeadershipCardProps = {
  name: string;
  role: string;
  bio?: string;
  imageUrl?: string;
  imageAlt?: string;
};

export function LeadershipCard({ name, role, bio, imageUrl, imageAlt }: LeadershipCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(18,59,93,0.1)]">
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-[#e7f3f9] to-[#c8e2ef]">
        {imageUrl ? (
          <div
            role="img"
            aria-label={imageAlt ?? name}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${JSON.stringify(imageUrl).slice(1, -1)})` }}
          />
        ) : (
          <div className="flex size-24 items-center justify-center rounded-full border border-white/80 bg-white/60 text-[#176b9c] shadow-sm">
            <UserRound className="size-11" aria-hidden="true" />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#123b5d]/20 to-transparent" aria-hidden="true" />
      </div>
      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#176b9c]">{role}</p>
        <h3 className="mt-1.5 text-lg font-bold text-[#123b5d]">{name}</h3>
        {bio ? <p className="mt-2 text-sm leading-6 text-slate-600">{bio}</p> : null}
      </div>
    </article>
  );
}
