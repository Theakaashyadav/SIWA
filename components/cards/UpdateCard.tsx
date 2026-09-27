import { ArrowRight, CalendarDays, FileText, Megaphone } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/Badge";

export type UpdateCardProps = {
  title: string;
  description: string;
  category: string;
  date: string;
  href: string;
  ctaLabel: string;
  urgent?: boolean;
  reference?: string;
};

export function UpdateCard({
  title,
  description,
  category,
  date,
  href,
  ctaLabel,
  urgent = false,
  reference,
}: UpdateCardProps) {
  return (
    <article className="group relative grid h-full grid-cols-[auto_1fr] gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:border-sky-200 hover:shadow-[0_16px_40px_rgba(18,59,93,0.09)] sm:gap-5 sm:p-6">
      <span
        className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${
          urgent ? "bg-orange-50 text-orange-700" : "bg-sky-50 text-[#176b9c]"
        }`}
      >
        {urgent ? <Megaphone className="size-5" aria-hidden="true" /> : <FileText className="size-5" aria-hidden="true" />}
      </span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={urgent ? "orange" : "neutral"}>{category}</Badge>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <CalendarDays className="size-3.5" aria-hidden="true" />
            {date}
          </span>
        </div>
        <h3 className="mt-3 text-lg font-bold leading-snug text-[#123b5d] sm:text-xl">
          <Link
            href={href}
            className="rounded-sm after:absolute after:inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176b9c] focus-visible:ring-offset-2"
          >
            {title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{description}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <span className="text-xs font-medium text-slate-500">{reference ?? ""}</span>
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#176b9c]">
            {ctaLabel}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  );
}
