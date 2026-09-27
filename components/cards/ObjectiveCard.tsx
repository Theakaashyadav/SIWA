import type { LucideIcon } from "lucide-react";

export type ObjectiveCardProps = {
  number?: string;
  title: string;
  description?: string;
  icon: LucideIcon;
};

export function ObjectiveCard({ number, title, description, icon: Icon }: ObjectiveCardProps) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-[0_14px_36px_rgba(18,59,93,0.08)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-11 items-center justify-center rounded-xl bg-[#123b5d] text-white transition-colors group-hover:bg-[#176b9c]">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        {number ? <span className="text-xs font-bold tracking-[0.12em] text-slate-600">{number}</span> : null}
      </div>
      <h3 className="mt-5 text-lg font-bold leading-snug text-[#123b5d]">{title}</h3>
      {description ? <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p> : null}
    </article>
  );
}
