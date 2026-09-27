"use client";

import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  ExternalLink,
  Languages,
  MapPin,
  Scale,
  Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDeferredValue, useId, useMemo, useState } from "react";

export interface DirectoryLegalProfessional {
  id: string;
  name: string;
  role: string;
  organisation: string;
  practiceAreas: readonly string[];
  location: string;
  languages: readonly string[];
  experience?: string;
  profileUrl?: string;
  photo?: string;
  featured?: boolean;
}

export interface LegalProfessionalDirectoryLabels {
  searchLabel: string;
  searchPlaceholder: string;
  practiceAreaLabel: string;
  locationLabel: string;
  roleLabel: string;
  sortLabel: string;
  allPracticeAreas: string;
  allLocations: string;
  allRoles: string;
  sortAZ: string;
  sortZA: string;
  organisation: string;
  location: string;
  languages: string;
  experience: string;
  viewProfile: string;
  requestAssistance: string;
  results: string;
  noResultsTitle: string;
  noResultsDescription: string;
  clearFilters: string;
  previous: string;
  next: string;
  page: string;
  of: string;
  directoryNavigation: string;
}

export interface LegalProfessionalDirectoryProps {
  professionals: readonly DirectoryLegalProfessional[];
  locale?: string;
  labels?: Partial<LegalProfessionalDirectoryLabels>;
  practiceAreas?: readonly string[];
  locations?: readonly string[];
  roles?: readonly string[];
  pageSize?: number;
  className?: string;
}

const englishLabels: LegalProfessionalDirectoryLabels = {
  searchLabel: "Search the legal professionals network",
  searchPlaceholder: "Search by name, expertise or organisation",
  practiceAreaLabel: "Area of practice",
  locationLabel: "Location",
  roleLabel: "Professional role",
  sortLabel: "Sort professionals",
  allPracticeAreas: "All practice areas",
  allLocations: "All locations",
  allRoles: "All professional roles",
  sortAZ: "Name: A–Z",
  sortZA: "Name: Z–A",
  organisation: "Organisation",
  location: "Location",
  languages: "Languages",
  experience: "Experience",
  viewProfile: "View professional profile",
  requestAssistance: "Request legal assistance",
  results: "legal professionals found",
  noResultsTitle: "No legal professionals found",
  noResultsDescription: "Try changing your search or filters.",
  clearFilters: "Clear filters",
  previous: "Previous",
  next: "Next",
  page: "Page",
  of: "of",
  directoryNavigation: "Legal professionals directory pages",
};

const hindiLabels: LegalProfessionalDirectoryLabels = {
  searchLabel: "विधि विशेषज्ञ नेटवर्क में खोजें",
  searchPlaceholder: "नाम, विशेषज्ञता या संस्था से खोजें",
  practiceAreaLabel: "विधि क्षेत्र",
  locationLabel: "स्थान",
  roleLabel: "पेशेवर भूमिका",
  sortLabel: "विधि विशेषज्ञों का क्रम",
  allPracticeAreas: "सभी विधि क्षेत्र",
  allLocations: "सभी स्थान",
  allRoles: "सभी पेशेवर भूमिकाएँ",
  sortAZ: "नाम: अ–ज्ञ",
  sortZA: "नाम: ज्ञ–अ",
  organisation: "संस्था",
  location: "स्थान",
  languages: "भाषाएँ",
  experience: "अनुभव",
  viewProfile: "पेशेवर प्रोफ़ाइल देखें",
  requestAssistance: "कानूनी सहायता का अनुरोध करें",
  results: "विधि विशेषज्ञ मिले",
  noResultsTitle: "कोई विधि विशेषज्ञ नहीं मिला",
  noResultsDescription: "खोज या फ़िल्टर बदलकर देखें।",
  clearFilters: "फ़िल्टर हटाएँ",
  previous: "पिछला",
  next: "अगला",
  page: "पृष्ठ",
  of: "में से",
  directoryNavigation: "विधि विशेषज्ञ निर्देशिका पृष्ठ",
};

function uniqueValues(values: readonly string[], locale: string) {
  return Array.from(new Set(values.filter(Boolean))).sort((left, right) =>
    left.localeCompare(right, locale),
  );
}

function initials(name: string) {
  const normalized = name.replace(/[\[\]]/g, "").trim();
  return normalized
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function LegalProfessionalDirectory({
  professionals,
  locale = "en",
  labels: labelOverrides,
  practiceAreas,
  locations,
  roles,
  pageSize = 9,
  className = "",
}: LegalProfessionalDirectoryProps) {
  const isHindi = locale.toLowerCase().startsWith("hi");
  const labels = {
    ...(isHindi ? hindiLabels : englishLabels),
    ...labelOverrides,
  };
  const searchId = useId();
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const [practiceArea, setPracticeArea] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");
  const [sort, setSort] = useState<"az" | "za">("az");
  const [page, setPage] = useState(1);

  const practiceAreaOptions = useMemo(
    () =>
      practiceAreas ??
      uniqueValues(
        professionals.flatMap((professional) => [...professional.practiceAreas]),
        locale,
      ),
    [locale, practiceAreas, professionals],
  );
  const locationOptions = useMemo(
    () =>
      locations ??
      uniqueValues(
        professionals.map((professional) => professional.location),
        locale,
      ),
    [locale, locations, professionals],
  );
  const roleOptions = useMemo(
    () =>
      roles ??
      uniqueValues(
        professionals.map((professional) => professional.role),
        locale,
      ),
    [locale, professionals, roles],
  );

  const filteredProfessionals = useMemo(() => {
    const query = deferredSearch.trim().toLocaleLowerCase(locale);
    const result = professionals.filter((professional) => {
      const searchable = [
        professional.name,
        professional.role,
        professional.organisation,
        professional.location,
        ...professional.practiceAreas,
        ...professional.languages,
      ]
        .join(" ")
        .toLocaleLowerCase(locale);

      return (
        (!query || searchable.includes(query)) &&
        (!practiceArea || professional.practiceAreas.includes(practiceArea)) &&
        (!location || professional.location === location) &&
        (!role || professional.role === role)
      );
    });

    return [...result].sort((left, right) =>
      sort === "za"
        ? right.name.localeCompare(left.name, locale)
        : left.name.localeCompare(right.name, locale),
    );
  }, [deferredSearch, locale, location, practiceArea, professionals, role, sort]);

  const normalizedPageSize = Math.max(1, Math.floor(pageSize));
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProfessionals.length / normalizedPageSize),
  );
  const currentPage = Math.min(page, totalPages);
  const visibleProfessionals = filteredProfessionals.slice(
    (currentPage - 1) * normalizedPageSize,
    currentPage * normalizedPageSize,
  );
  const hasFilters = Boolean(search || practiceArea || location || role);
  const assistanceHref = `/${locale}/legal-assistance`;

  function clearFilters() {
    setSearch("");
    setPracticeArea("");
    setLocation("");
    setRole("");
    setPage(1);
  }

  const selectClass =
    "min-h-12 w-full rounded-lg border border-slate-300 bg-white px-3.5 text-sm font-medium text-slate-700 outline-none transition focus:border-[#176B9C] focus:ring-2 focus:ring-[#176B9C]";

  return (
    <section className={className} aria-label={labels.searchLabel}>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <div className="md:col-span-2 xl:col-span-1">
            <label className="sr-only" htmlFor={searchId}>
              {labels.searchLabel}
            </label>
            <div className="relative">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-slate-400"
              />
              <input
                className="min-h-12 w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-11 pr-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-[#176B9C] focus:ring-2 focus:ring-[#176B9C]"
                id={searchId}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder={labels.searchPlaceholder}
                type="search"
                value={search}
              />
            </div>
          </div>

          <label>
            <span className="sr-only">{labels.practiceAreaLabel}</span>
            <select
              aria-label={labels.practiceAreaLabel}
              className={selectClass}
              onChange={(event) => {
                setPracticeArea(event.target.value);
                setPage(1);
              }}
              value={practiceArea}
            >
              <option value="">{labels.allPracticeAreas}</option>
              {practiceAreaOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="sr-only">{labels.locationLabel}</span>
            <select
              aria-label={labels.locationLabel}
              className={selectClass}
              onChange={(event) => {
                setLocation(event.target.value);
                setPage(1);
              }}
              value={location}
            >
              <option value="">{labels.allLocations}</option>
              {locationOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="sr-only">{labels.roleLabel}</span>
            <select
              aria-label={labels.roleLabel}
              className={selectClass}
              onChange={(event) => {
                setRole(event.target.value);
                setPage(1);
              }}
              value={role}
            >
              <option value="">{labels.allRoles}</option>
              {roleOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="sr-only">{labels.sortLabel}</span>
            <select
              aria-label={labels.sortLabel}
              className={selectClass}
              onChange={(event) => {
                setSort(event.target.value as "az" | "za");
                setPage(1);
              }}
              value={sort}
            >
              <option value="az">{labels.sortAZ}</option>
              <option value="za">{labels.sortZA}</option>
            </select>
          </label>
        </div>

        <div className="mt-4 flex min-h-6 flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
          <p aria-live="polite">
            <strong className="text-[#123B5D]">
              {filteredProfessionals.length}
            </strong>{" "}
            {labels.results}
          </p>
          {hasFilters ? (
            <button
              className="font-semibold text-[#176B9C] underline-offset-4 hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B9C]"
              onClick={clearFilters}
              type="button"
            >
              {labels.clearFilters}
            </button>
          ) : null}
        </div>
      </div>

      {visibleProfessionals.length ? (
        <ul className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visibleProfessionals.map((professional) => (
            <li
              className="group flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#176B9C]/40 hover:shadow-md"
              key={professional.id}
            >
              <div className="flex items-start gap-4">
                <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-[#F5F8FA] font-bold text-[#123B5D]">
                  {professional.photo ? (
                    <Image
                      alt=""
                      className="h-full w-full object-cover"
                      height={56}
                      loading="lazy"
                      src={professional.photo}
                      unoptimized
                      width={56}
                    />
                  ) : (
                    <span className="relative grid size-full place-items-center">
                      <Scale
                        aria-hidden="true"
                        className="absolute size-8 text-sky-100"
                      />
                      <span aria-hidden="true" className="relative text-sm">
                        {initials(professional.name)}
                      </span>
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className="break-words text-lg font-bold leading-snug text-[#123B5D]">
                    {professional.name}
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-[#176B9C]">
                    {professional.role}
                  </p>
                </div>
              </div>

              <dl className="mt-5 space-y-3 text-sm text-slate-600">
                <div className="flex gap-2.5">
                  <dt className="shrink-0">
                    <Building2
                      aria-hidden="true"
                      className="mt-0.5 size-4 text-[#176B9C]"
                    />
                    <span className="sr-only">{labels.organisation}</span>
                  </dt>
                  <dd>{professional.organisation}</dd>
                </div>
                <div className="flex gap-2.5">
                  <dt className="shrink-0">
                    <MapPin
                      aria-hidden="true"
                      className="mt-0.5 size-4 text-[#176B9C]"
                    />
                    <span className="sr-only">{labels.location}</span>
                  </dt>
                  <dd>{professional.location}</dd>
                </div>
                <div className="flex gap-2.5">
                  <dt className="shrink-0">
                    <Languages
                      aria-hidden="true"
                      className="mt-0.5 size-4 text-[#176B9C]"
                    />
                    <span className="sr-only">{labels.languages}</span>
                  </dt>
                  <dd>{professional.languages.join(", ")}</dd>
                </div>
                {professional.experience ? (
                  <div className="flex gap-2.5">
                    <dt className="shrink-0">
                      <BriefcaseBusiness
                        aria-hidden="true"
                        className="mt-0.5 size-4 text-[#176B9C]"
                      />
                      <span className="sr-only">{labels.experience}</span>
                    </dt>
                    <dd>{professional.experience}</dd>
                  </div>
                ) : null}
              </dl>

              <div className="mt-5 flex flex-wrap gap-2">
                {professional.practiceAreas.map((area) => (
                  <span
                    className="rounded-full bg-[#123B5D]/7 px-3 py-1 text-xs font-bold text-[#123B5D]"
                    key={area}
                  >
                    {area}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-2 border-t border-slate-100 pt-5 sm:flex-row sm:flex-wrap">
                <Link
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#123B5D] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#176B9C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B9C] focus-visible:ring-offset-2"
                  href={assistanceHref}
                >
                  {labels.requestAssistance}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
                {professional.profileUrl ? (
                  <a
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 text-sm font-bold text-[#176B9C] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B9C] focus-visible:ring-offset-2"
                    href={professional.profileUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {labels.viewProfile}
                    <ExternalLink aria-hidden="true" className="size-4" />
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div
          className="mt-7 rounded-2xl border border-dashed border-slate-300 bg-[#F5F8FA] px-5 py-16 text-center"
          role="status"
        >
          <Search aria-hidden="true" className="mx-auto size-10 text-slate-400" />
          <h2 className="mt-4 text-xl font-bold text-[#123B5D]">
            {labels.noResultsTitle}
          </h2>
          <p className="mt-2 text-slate-600">{labels.noResultsDescription}</p>
          {hasFilters ? (
            <button
              className="mt-5 min-h-11 rounded-lg bg-[#123B5D] px-5 py-2.5 font-bold text-white transition hover:bg-[#176B9C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B9C] focus-visible:ring-offset-2"
              onClick={clearFilters}
              type="button"
            >
              {labels.clearFilters}
            </button>
          ) : null}
        </div>
      )}

      {filteredProfessionals.length > normalizedPageSize ? (
        <nav
          aria-label={labels.directoryNavigation}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <button
            className="min-h-11 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-[#123B5D] transition hover:border-[#176B9C] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B9C]"
            disabled={currentPage === 1}
            onClick={() => setPage(Math.max(1, currentPage - 1))}
            type="button"
          >
            {labels.previous}
          </button>
          <p aria-live="polite" className="px-2 text-sm text-slate-600">
            {labels.page}{" "}
            <strong className="text-[#123B5D]">{currentPage}</strong>{" "}
            {labels.of} {totalPages}
          </p>
          <button
            className="min-h-11 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-[#123B5D] transition hover:border-[#176B9C] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B9C]"
            disabled={currentPage === totalPages}
            onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
            type="button"
          >
            {labels.next}
          </button>
        </nav>
      ) : null}
    </section>
  );
}
