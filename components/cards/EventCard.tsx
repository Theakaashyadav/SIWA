import { ArrowUpRight, CalendarDays, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/Badge";

export type EventCardProps = {
  title: string;
  description: string;
  type: string;
  date: string;
  location: string;
  href: string;
  ctaLabel: string;
  status?: string;
  featured?: boolean;
  imageSrc?: string;
  imageAlt?: string;
};

export function EventCard({
  title,
  description,
  type,
  date,
  location,
  href,
  ctaLabel,
  status,
  featured = false,
  imageSrc,
  imageAlt = "",
}: EventCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(18,59,93,0.11)]">
      <div className="relative flex min-h-40 items-end overflow-hidden bg-[#123b5d] p-5 text-white">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c304c]/95 via-[#0c304c]/40 to-[#0c304c]/10" aria-hidden="true" />
        <div
          className={`absolute inset-0 opacity-20 ${imageSrc ? "mix-blend-overlay" : ""}`}
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, rgba(255,255,255,.7) 0 2px, transparent 3px), linear-gradient(135deg, transparent 42%, rgba(255,255,255,.35) 43% 44%, transparent 45%)",
            backgroundSize: "35px 35px, 70px 70px",
          }}
          aria-hidden="true"
        />
        <div className="absolute -right-8 -top-10 size-36 rounded-full border-[28px] border-[#176b9c]/60" aria-hidden="true" />
        <Users className="absolute right-6 top-6 size-11 text-white/20" aria-hidden="true" />
        <div className="relative flex w-full items-center justify-between gap-3">
          <Badge tone={featured ? "orange" : "blue"} className={!featured ? "border-white/15 bg-white/10 text-white" : ""}>
            {type}
          </Badge>
          {status ? <span className="text-xs font-bold uppercase tracking-wider text-slate-200">{status}</span> : null}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-col gap-2 text-xs font-semibold text-slate-500 sm:flex-row sm:flex-wrap sm:gap-x-4">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-4 text-[#176b9c]" aria-hidden="true" />
            {date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-4 text-[#176b9c]" aria-hidden="true" />
            {location}
          </span>
        </div>
        <h3 className="mt-4 text-xl font-bold leading-snug text-[#123b5d]">
          <Link
            href={href}
            className="rounded-sm after:absolute after:inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176b9c] focus-visible:ring-offset-2"
          >
            {title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{description}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold text-[#176b9c]">
          {ctaLabel}
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
