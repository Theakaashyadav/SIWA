"use client";

import { Search, SearchX, X } from "lucide-react";
import {
  useDeferredValue,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface ContentFilterOption {
  value: string;
  label: string;
}

export interface ContentFilterItem {
  id: string;
  category: string;
  /** Already-localized text used only for client-side matching. */
  searchText?: string;
  /** Server-rendered card content passed through the client boundary. */
  content: ReactNode;
}

export interface ContentFilterExplorerProps {
  items: readonly ContentFilterItem[];
  categories: readonly ContentFilterOption[];
  allValue?: string;
  locale?: string;
  filterLabel: string;
  resultsLabel: string;
  emptyMessage: string;
  clearLabel: string;
  sectionId: string;
  labelledBy: string;
  heading: ReactNode;
  afterResults?: ReactNode;
  searchPlaceholder?: string;
  gridClassName?: string;
}

function normalized(value: string, locale: string) {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase(locale === "hi" ? "hi-IN" : "en-IN")
    .trim();
}

export function ContentFilterExplorer({
  items,
  categories,
  allValue = "all",
  locale = "en",
  filterLabel,
  resultsLabel,
  emptyMessage,
  clearLabel,
  sectionId,
  labelledBy,
  heading,
  afterResults,
  searchPlaceholder,
  gridClassName = "grid gap-5 md:grid-cols-2 xl:grid-cols-3",
}: ContentFilterExplorerProps) {
  const searchId = useId();
  const [activeCategory, setActiveCategory] = useState(allValue);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const filteredItems = useMemo(() => {
    const search = normalized(deferredQuery, locale);
    return items.filter((item) => {
      const matchesCategory =
        activeCategory === allValue || item.category === activeCategory;
      const matchesSearch =
        !search || normalized(item.searchText ?? "", locale).includes(search);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, allValue, deferredQuery, items, locale]);

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>([[allValue, items.length]]);
    for (const item of items) {
      counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
    }
    return counts;
  }, [allValue, items]);

  const hasActiveFilters = activeCategory !== allValue || Boolean(query.trim());

  function clearFilters() {
    setActiveCategory(allValue);
    setQuery("");
  }

  return (
    <>
      <section
        aria-label={filterLabel}
        className="border-b border-slate-200 bg-white py-8"
      >
        <div className="container-shell">
          <div
            className={`flex flex-col gap-4 ${
              searchPlaceholder
                ? "xl:flex-row xl:items-center xl:justify-between"
                : ""
            }`}
          >
            {searchPlaceholder ? (
              <div className="relative w-full xl:max-w-sm">
                <label className="sr-only" htmlFor={searchId}>
                  {searchPlaceholder}
                </label>
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-slate-400"
                />
                <input
                  className="min-h-12 w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-11 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 hover:border-slate-400 focus:border-[#176b9c] focus:ring-2 focus:ring-[#176b9c]"
                  id={searchId}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={searchPlaceholder}
                  type="search"
                  value={query}
                />
                {query ? (
                  <button
                    aria-label={clearLabel}
                    className="absolute right-1.5 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-[#123b5d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176b9c]"
                    onClick={() => setQuery("")}
                    type="button"
                  >
                    <X aria-hidden="true" className="size-4" />
                  </button>
                ) : null}
              </div>
            ) : null}

            <div
              aria-label={filterLabel}
              className="flex flex-wrap gap-2"
              role="group"
            >
              {categories.map((category) => {
                const active = activeCategory === category.value;
                return (
                  <button
                    aria-controls={sectionId}
                    aria-pressed={active}
                    className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176b9c] focus-visible:ring-offset-2 ${
                      active
                        ? "border-[#123b5d] bg-[#123b5d] text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:bg-sky-50 hover:text-[#176b9c]"
                    }`}
                    key={category.value}
                    onClick={() => setActiveCategory(category.value)}
                    type="button"
                  >
                    <span>{category.label}</span>
                    <span
                      aria-hidden="true"
                      className={`min-w-5 rounded-full px-1.5 py-0.5 text-[0.65rem] leading-4 ${
                        active
                          ? "bg-white/15 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {categoryCounts.get(category.value) ?? 0}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby={labelledBy}
        className="scroll-mt-36 bg-[#f5f8fa] py-16 sm:py-20 lg:py-24"
        id={sectionId}
      >
        <div className="container-shell">
          {heading}

          <p aria-atomic="true" aria-live="polite" className="sr-only">
            {filteredItems.length} {resultsLabel}
          </p>

          {filteredItems.length ? (
            <div className={`mt-10 ${gridClassName}`} role="list">
              {filteredItems.map((item) => (
                <div className="min-w-0" key={item.id} role="listitem">
                  {item.content}
                </div>
              ))}
            </div>
          ) : (
            <div
              className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm"
              role="status"
            >
              <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-sky-50 text-[#176b9c]">
                <SearchX aria-hidden="true" className="size-6" />
              </span>
              <p className="mx-auto mt-4 max-w-xl font-bold text-[#123b5d]">
                {emptyMessage}
              </p>
              {hasActiveFilters ? (
                <button
                  className="mt-5 min-h-11 rounded-lg bg-[#123b5d] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#176b9c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176b9c] focus-visible:ring-offset-2"
                  onClick={clearFilters}
                  type="button"
                >
                  {clearLabel}
                </button>
              ) : null}
            </div>
          )}

          {afterResults}
        </div>
      </section>
    </>
  );
}
