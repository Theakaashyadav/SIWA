import { ArrowUpRight, Landmark, Sparkles } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/Badge";

export type SchemeCardProps = {
  title: string;
  description: string;
  category: string;
  publishedLabel: string;
  publishedOn: string;
  href: string;
  ctaLabel: string;
  ministry?: string;
  featured?: boolean;
};

export function SchemeCard({
  title,
  description,
  category,
  publishedLabel,
  publishedOn,
  href,
  ctaLabel,
  ministry,
  featured = false,
}: SchemeCardProps) {
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(18,59,93,0.11)] ${
        featured ? "border-[#176b9c]/35" : "border-slate-200"
      }`}
    >
      {featured ? (
        <div className="absolute right-0 top-0 rounded-bl-xl bg-[#123b5d] px-3 py-2 text-white" aria-hidden="true">
          <Sparkles className="size-4" />
        </div>
      ) : null}
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#123b5d] text-white shadow-[inset_0_-2px_0_rgba(0,0,0,.16)]">
          <Landmark className="size-5" aria-hidden="true" />
        </span>
        <Badge tone={featured ? "orange" : "blue"} className={featured ? "mr-7" : ""}>
          {category}
        </Badge>
      </div>
      <h3 className="mt-5 text-xl font-bold leading-snug tracking-[-0.02em] text-[#123b5d]">
        <Link
          href={href}
          className="rounded-sm after:absolute after:inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176b9c] focus-visible:ring-offset-2"
        >
          {title}
        </Link>
      </h3>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{description}</p>
      {ministry ? <p className="mt-4 text-xs font-semibold text-slate-500">{ministry}</p> : null}
      <div className="mt-auto flex items-end justify-between gap-4 border-t border-slate-100 pt-5">
        <p className="text-xs leading-5 text-slate-500">
          <span className="block font-medium">{publishedLabel}</span>
          <span className="font-bold text-slate-700">{publishedOn}</span>
        </p>
        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#176b9c] transition group-hover:text-[#123b5d]">
          {ctaLabel}
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
