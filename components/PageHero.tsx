import { ChevronRight, Factory } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";

export type PageHeroBreadcrumb = {
  label: string;
  href?: string;
};

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: PageHeroBreadcrumb[];
  actions?: ReactNode;
  aside?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs = [],
  actions,
  aside,
}: PageHeroProps) {
  return (
    <section
      className="relative isolate overflow-hidden bg-[#0c304c] text-white"
      aria-labelledby="page-title"
    >
      <div
        className="absolute inset-0 -z-20 opacity-[0.17]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.16) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage: "linear-gradient(to right, black, transparent 75%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -right-24 -top-28 -z-10 size-[34rem] rounded-full border-[80px] border-[#176b9c]/20"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 -z-10 h-1 w-full bg-gradient-to-r from-[#f28c28] via-[#f28c28] to-transparent"
        aria-hidden="true"
      />

      <Container className="py-12 sm:py-16 lg:py-20">
        {breadcrumbs.length ? (
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-300 sm:text-sm">
              {breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
                    {index > 0 ? (
                      <ChevronRight className="size-3.5 text-slate-500" aria-hidden="true" />
                    ) : null}
                    {item.href && !isLast ? (
                      <Link
                        href={item.href}
                        className="rounded-sm transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#123b5d]"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span aria-current={isLast ? "page" : undefined} className={isLast ? "text-white" : ""}>
                        {item.label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        ) : null}

        <div className={`grid items-center gap-10 ${aside ? "lg:grid-cols-[minmax(0,1fr)_380px]" : ""}`}>
          <div className="max-w-4xl">
            {eyebrow ? (
              <p className="mb-4 flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.18em] text-[#9ed9f4]">
                <span className="flex size-8 items-center justify-center rounded-lg border border-white/15 bg-white/10">
                  <Factory className="size-4 text-[#f5a54f]" aria-hidden="true" />
                </span>
                {eyebrow}
              </p>
            ) : null}
            <h1
              id="page-title"
              className="text-balance text-[2.45rem] font-bold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-[3.5rem]"
            >
              {title}
            </h1>
            {description ? (
              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                {description}
              </p>
            ) : null}
            {actions ? <div className="mt-7 flex flex-wrap gap-3">{actions}</div> : null}
          </div>
          {aside ? <div className="w-full">{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
}
