import { ArrowDownToLine, BookOpen, ExternalLink, FileClock, FileText } from "lucide-react";

import { Badge } from "@/components/ui/Badge";

export type ResourceCardProps = {
  title: string;
  description?: string;
  category: string;
  format: string;
  fileSize?: string;
  href: string;
  actionLabel: string;
  updatedLabel?: string;
  external?: boolean;
  available?: boolean;
};

export function ResourceCard({
  title,
  description,
  category,
  format,
  fileSize,
  href,
  actionLabel,
  updatedLabel,
  external = false,
  available = true,
}: ResourceCardProps) {
  const Icon = external ? BookOpen : FileText;
  const ActionIcon = external ? ExternalLink : ArrowDownToLine;

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-[0_16px_40px_rgba(18,59,93,0.09)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-12 items-center justify-center rounded-xl bg-sky-50 text-[#176b9c]">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <Badge tone="neutral">{category}</Badge>
      </div>
      <h3 className="mt-5 text-lg font-bold leading-snug text-[#123b5d] sm:text-xl">{title}</h3>
      {description ? <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{description}</p> : null}
      <div className="mt-auto pt-5">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
          <span className="rounded-md bg-slate-100 px-2 py-1 uppercase text-slate-600">{format}</span>
          {fileSize ? <span>{fileSize}</span> : null}
          {updatedLabel ? <span className="ml-auto">{updatedLabel}</span> : null}
        </div>
        {available ? (
          <a
            href={href}
            className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-[#123b5d] transition hover:border-[#176b9c] hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176b9c] focus-visible:ring-offset-2"
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            download={!external || undefined}
          >
            {actionLabel}
            <ActionIcon className="size-4" aria-hidden="true" />
          </a>
        ) : (
          <span
            className="inline-flex min-h-10 w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-500"
            aria-disabled="true"
          >
            {actionLabel}
            <FileClock className="size-4" aria-hidden="true" />
          </span>
        )}
      </div>
    </article>
  );
}
