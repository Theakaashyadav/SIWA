"use client";

import { CalendarDays, ChevronLeft, ChevronRight, ImageOff, X } from "lucide-react";
import Image from "next/image";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

export interface GalleryEntry {
  id: string;
  title: string;
  category: string;
  categoryLabel?: string;
  date: string;
  image: string;
  alt: string;
  description?: string;
}

export interface GalleryCategoryOption {
  value: string;
  label?: string;
  /** Translation key retained for data/CMS compatibility. */
  labelKey?: string;
}

export interface GalleryExplorerLabels {
  filterLabel: string;
  all: string;
  openImage: string;
  close: string;
  previous: string;
  next: string;
  imagePosition: string;
  noResultsTitle: string;
  noResultsDescription: string;
  clearFilter: string;
  dialogLabel: string;
}

export interface GalleryExplorerProps {
  items: readonly GalleryEntry[];
  categories?: readonly (GalleryCategoryOption | string)[];
  locale?: string;
  labels?: Partial<GalleryExplorerLabels>;
  initialCategory?: string;
  className?: string;
}

const englishLabels: GalleryExplorerLabels = {
  filterLabel: "Filter gallery by category",
  all: "All",
  openImage: "Open photograph",
  close: "Close gallery viewer",
  previous: "Previous photograph",
  next: "Next photograph",
  imagePosition: "Photograph",
  noResultsTitle: "No photographs in this category",
  noResultsDescription: "Choose another category to explore the gallery.",
  clearFilter: "View all photographs",
  dialogLabel: "Gallery photograph viewer",
};

const hindiLabels: GalleryExplorerLabels = {
  filterLabel: "श्रेणी के अनुसार गैलरी फ़िल्टर करें",
  all: "सभी",
  openImage: "चित्र खोलें",
  close: "गैलरी व्यूअर बंद करें",
  previous: "पिछला चित्र",
  next: "अगला चित्र",
  imagePosition: "चित्र",
  noResultsTitle: "इस श्रेणी में कोई चित्र नहीं है",
  noResultsDescription: "गैलरी देखने के लिए दूसरी श्रेणी चुनें।",
  clearFilter: "सभी चित्र देखें",
  dialogLabel: "गैलरी चित्र व्यूअर",
};

function titleFromSlug(value: string) {
  return value
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

function displayDate(value: string, locale: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function GalleryExplorer({
  items,
  categories,
  locale = "en",
  labels: labelOverrides,
  initialCategory = "all",
  className = "",
}: GalleryExplorerProps) {
  const labels = {
    ...(locale.toLowerCase().startsWith("hi") ? hindiLabels : englishLabels),
    ...labelOverrides,
  };
  const availableCategories = useMemo<GalleryCategoryOption[]>(() => {
    if (categories) {
      return categories
        .map((category) =>
          typeof category === "string"
            ? { value: category, label: titleFromSlug(category) }
            : {
                ...category,
                label: category.label ?? titleFromSlug(category.value),
              },
        )
        .filter(({ value }) => value !== "all");
    }
    return Array.from(new Set(items.map(({ category }) => category))).map(
      (category) => ({ value: category, label: titleFromSlug(category) }),
    );
  }, [categories, items]);

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const visibleItems = useMemo(
    () =>
      activeCategory === "all"
        ? items
        : items.filter(({ category }) => category === activeCategory),
    [activeCategory, items],
  );
  const selectedIndex = selectedId
    ? visibleItems.findIndex(({ id }) => id === selectedId)
    : -1;
  const selectedItem = selectedIndex >= 0 ? visibleItems[selectedIndex] : null;
  const isDialogOpen = selectedItem !== null;

  function closeDialog() {
    setSelectedId(null);
    window.requestAnimationFrame(() => returnFocusRef.current?.focus());
  }

  function moveSelection(direction: -1 | 1) {
    if (!visibleItems.length || selectedIndex < 0) return;
    const nextIndex =
      (selectedIndex + direction + visibleItems.length) % visibleItems.length;
    setSelectedId(visibleItems[nextIndex].id);
  }

  useEffect(() => {
    if (!isDialogOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => {
      dialogRef.current
        ?.querySelector<HTMLElement>("[data-dialog-close]")
        ?.focus();
    });

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
    };
  }, [isDialogOpen]);

  function handleDialogKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeDialog();
      return;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveSelection(-1);
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveSelection(1);
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>(
        "button:not([disabled]), [href], [tabindex]:not([tabindex='-1'])",
      ) ?? [],
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <section className={className}>
      <div
        aria-label={labels.filterLabel}
        className="flex flex-wrap gap-2"
        role="group"
      >
        <button
          aria-pressed={activeCategory === "all"}
          className={`min-h-11 rounded-full border px-4 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B9C] focus-visible:ring-offset-2 ${
            activeCategory === "all"
              ? "border-[#123B5D] bg-[#123B5D] text-white"
              : "border-slate-300 bg-white text-slate-700 hover:border-[#176B9C] hover:text-[#123B5D]"
          }`}
          onClick={() => setActiveCategory("all")}
          type="button"
        >
          {labels.all}
        </button>
        {availableCategories.map((category) => (
          <button
            aria-pressed={activeCategory === category.value}
            className={`min-h-11 rounded-full border px-4 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B9C] focus-visible:ring-offset-2 ${
              activeCategory === category.value
                ? "border-[#123B5D] bg-[#123B5D] text-white"
                : "border-slate-300 bg-white text-slate-700 hover:border-[#176B9C] hover:text-[#123B5D]"
            }`}
            key={category.value}
            onClick={() => setActiveCategory(category.value)}
            type="button"
          >
            {category.label ?? titleFromSlug(category.value)}
          </button>
        ))}
      </div>

      {visibleItems.length ? (
        <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item, index) => (
            <li
              className={
                index % 7 === 0 && visibleItems.length > 2
                  ? "sm:col-span-2 lg:col-span-2"
                  : ""
              }
              key={item.id}
            >
              <button
                aria-label={`${labels.openImage}: ${item.title}`}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 text-left shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#123B5D] focus-visible:ring-offset-2"
                onClick={(event) => {
                  returnFocusRef.current = event.currentTarget;
                  setSelectedId(item.id);
                }}
                type="button"
              >
                <Image
                  alt={item.alt}
                  className="object-cover transition duration-500 group-hover:scale-[1.025]"
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  src={item.image}
                />
                <span className="absolute inset-x-0 bottom-0 block bg-gradient-to-t from-[#0B2940]/95 via-[#0B2940]/75 to-transparent px-5 pb-5 pt-16 text-white">
                  <span className="block text-lg font-bold leading-snug">
                    {item.title}
                  </span>
                  <span className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-white/85">
                    <CalendarDays aria-hidden="true" className="size-3.5" />
                    {displayDate(item.date, locale)}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-7 rounded-2xl border border-dashed border-slate-300 bg-[#F5F8FA] px-5 py-16 text-center">
          <ImageOff aria-hidden="true" className="mx-auto size-10 text-slate-400" />
          <h2 className="mt-4 text-xl font-bold text-[#123B5D]">
            {labels.noResultsTitle}
          </h2>
          <p className="mt-2 text-slate-600">{labels.noResultsDescription}</p>
          <button
            className="mt-5 min-h-11 rounded-lg bg-[#123B5D] px-5 py-2.5 font-bold text-white transition hover:bg-[#176B9C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B9C] focus-visible:ring-offset-2"
            onClick={() => setActiveCategory("all")}
            type="button"
          >
            {labels.clearFilter}
          </button>
        </div>
      )}

      {selectedItem ? (
        <div
          aria-label={labels.dialogLabel}
          aria-modal="true"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#071D2D]/95 p-3 sm:p-6"
          onKeyDown={handleDialogKeyDown}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeDialog();
          }}
          ref={dialogRef}
          role="dialog"
        >
          <div className="relative flex max-h-full w-full max-w-6xl flex-col overflow-x-hidden overflow-y-auto overscroll-contain rounded-2xl bg-white shadow-2xl lg:flex-row lg:overflow-hidden">
            <div className="relative min-h-[42vh] flex-1 bg-[#081E2F] lg:min-h-[72vh]">
              <Image
                alt={selectedItem.alt}
                className="object-contain"
                fill
                priority
                sizes="(min-width: 1024px) 72vw, 100vw"
                src={selectedItem.image}
              />

              {visibleItems.length > 1 ? (
                <>
                  <button
                    aria-label={labels.previous}
                    className="absolute left-3 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#123B5D] shadow-lg transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#123B5D] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    onClick={() => moveSelection(-1)}
                    type="button"
                  >
                    <ChevronLeft aria-hidden="true" className="size-6" />
                  </button>
                  <button
                    aria-label={labels.next}
                    className="absolute right-3 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#123B5D] shadow-lg transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#123B5D] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    onClick={() => moveSelection(1)}
                    type="button"
                  >
                    <ChevronRight aria-hidden="true" className="size-6" />
                  </button>
                </>
              ) : null}
            </div>

            <div className="relative w-full shrink-0 overflow-y-auto p-6 lg:w-80 lg:p-8">
              <button
                aria-label={labels.close}
                className="absolute right-3 top-3 inline-flex size-11 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-[#123B5D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B9C]"
                data-dialog-close
                onClick={closeDialog}
                type="button"
              >
                <X aria-hidden="true" className="size-6" />
              </button>
              <p className="pr-10 text-xs font-bold uppercase tracking-[0.14em] text-[#176B9C]">
                {selectedItem.categoryLabel ?? titleFromSlug(selectedItem.category)}
              </p>
              <h2 className="mt-3 text-2xl font-bold leading-tight text-[#123B5D]">
                {selectedItem.title}
              </h2>
              <p className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                <CalendarDays aria-hidden="true" className="size-4 text-[#176B9C]" />
                {displayDate(selectedItem.date, locale)}
              </p>
              {selectedItem.description ? (
                <p className="mt-5 leading-7 text-slate-600">
                  {selectedItem.description}
                </p>
              ) : null}
              <p className="mt-6 text-sm font-semibold text-slate-500" aria-live="polite">
                {labels.imagePosition} {selectedIndex + 1} / {visibleItems.length}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
