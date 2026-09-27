"use client";

import { Building2, ExternalLink, MapPin, Search, UserRound } from "lucide-react";
import Image from "next/image";
import { useDeferredValue, useId, useMemo, useState } from "react";

export interface DirectoryMember {
  id: string;
  companyName: string;
  industry: string;
  representative?: string;
  location: string;
  memberSince?: string | number;
  membershipType?: string;
  website?: string;
  logo?: string;
  featured?: boolean;
}

export interface MemberDirectoryLabels {
  searchLabel: string;
  searchPlaceholder: string;
  industryLabel: string;
  areaLabel: string;
  membershipLabel: string;
  sortLabel: string;
  allIndustries: string;
  allAreas: string;
  allMemberships: string;
  sortAZ: string;
  sortZA: string;
  sortNewest: string;
  representative: string;
  memberSince: string;
  visitWebsite: string;
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

export interface MemberDirectoryProps {
  members: readonly DirectoryMember[];
  locale?: string;
  labels?: Partial<MemberDirectoryLabels>;
  industries?: readonly string[];
  areas?: readonly string[];
  membershipTypes?: readonly string[];
  pageSize?: number;
  className?: string;
}

const englishLabels: MemberDirectoryLabels = {
  searchLabel: "Search the industry directory",
  searchPlaceholder: "Search enterprise or representative",
  industryLabel: "Industry category",
  areaLabel: "Industrial area",
  membershipLabel: "Membership type",
  sortLabel: "Sort enterprises",
  allIndustries: "All industries",
  allAreas: "All areas",
  allMemberships: "All association types",
  sortAZ: "Alphabetical: A–Z",
  sortZA: "Alphabetical: Z–A",
  sortNewest: "Recently associated",
  representative: "Representative",
  memberSince: "Associated since",
  visitWebsite: "Visit website",
  results: "enterprises found",
  noResultsTitle: "No enterprises found",
  noResultsDescription: "Try changing your search or filters.",
  clearFilters: "Clear filters",
  previous: "Previous",
  next: "Next",
  page: "Page",
  of: "of",
  directoryNavigation: "Industry directory pages",
};

const hindiLabels: MemberDirectoryLabels = {
  searchLabel: "उद्योग निर्देशिका में खोजें",
  searchPlaceholder: "उद्यम या प्रतिनिधि खोजें",
  industryLabel: "उद्योग श्रेणी",
  areaLabel: "औद्योगिक क्षेत्र",
  membershipLabel: "सदस्यता प्रकार",
  sortLabel: "उद्यम क्रम",
  allIndustries: "सभी उद्योग",
  allAreas: "सभी क्षेत्र",
  allMemberships: "सभी संबद्धता प्रकार",
  sortAZ: "वर्णक्रम: अ–ज्ञ",
  sortZA: "वर्णक्रम: ज्ञ–अ",
  sortNewest: "हाल में संबद्ध",
  representative: "प्रतिनिधि",
  memberSince: "संबद्धता वर्ष",
  visitWebsite: "वेबसाइट देखें",
  results: "उद्यम मिले",
  noResultsTitle: "कोई उद्यम नहीं मिला",
  noResultsDescription: "खोज या फ़िल्टर बदलकर देखें।",
  clearFilters: "फ़िल्टर हटाएँ",
  previous: "पिछला",
  next: "अगला",
  page: "पृष्ठ",
  of: "में से",
  directoryNavigation: "उद्योग निर्देशिका पृष्ठ",
};

function uniqueValues(values: readonly (string | undefined)[]) {
  return Array.from(new Set(values.filter((value): value is string => Boolean(value))))
    .sort((a, b) => a.localeCompare(b));
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function memberYear(value: string | number | undefined) {
  if (value === undefined || value === "") return null;
  return String(value);
}

export function MemberDirectory({
  members,
  locale = "en",
  labels: labelOverrides,
  industries,
  areas,
  membershipTypes,
  pageSize = 9,
  className = "",
}: MemberDirectoryProps) {
  const labels = {
    ...(locale.toLowerCase().startsWith("hi") ? hindiLabels : englishLabels),
    ...labelOverrides,
  };
  const searchId = useId();
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const [industry, setIndustry] = useState("");
  const [area, setArea] = useState("");
  const [membership, setMembership] = useState("");
  const [sort, setSort] = useState<"az" | "za" | "newest">("az");
  const [page, setPage] = useState(1);

  const industryOptions = useMemo(
    () => industries ?? uniqueValues(members.map((member) => member.industry)),
    [industries, members],
  );
  const areaOptions = useMemo(
    () => areas ?? uniqueValues(members.map((member) => member.location)),
    [areas, members],
  );
  const membershipOptions = useMemo(
    () =>
      membershipTypes ??
      uniqueValues(members.map((member) => member.membershipType)),
    [members, membershipTypes],
  );

  const filteredMembers = useMemo(() => {
    const query = deferredSearch.trim().toLocaleLowerCase(locale);
    const result = members.filter((member) => {
      const searchable = [
        member.companyName,
        member.industry,
        member.representative,
        member.location,
        member.membershipType,
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase(locale);

      return (
        (!query || searchable.includes(query)) &&
        (!industry || member.industry === industry) &&
        (!area || member.location === area) &&
        (!membership || member.membershipType === membership)
      );
    });

    return [...result].sort((left, right) => {
      if (sort === "za") {
        return right.companyName.localeCompare(left.companyName, locale);
      }
      if (sort === "newest") {
        return (
          Number(right.memberSince ?? 0) - Number(left.memberSince ?? 0) ||
          left.companyName.localeCompare(right.companyName, locale)
        );
      }
      return left.companyName.localeCompare(right.companyName, locale);
    });
  }, [area, deferredSearch, industry, locale, members, membership, sort]);

  const normalizedPageSize = Math.max(1, Math.floor(pageSize));
  const totalPages = Math.max(
    1,
    Math.ceil(filteredMembers.length / normalizedPageSize),
  );
  const currentPage = Math.min(page, totalPages);
  const visibleMembers = filteredMembers.slice(
    (currentPage - 1) * normalizedPageSize,
    currentPage * normalizedPageSize,
  );
  const hasFilters = Boolean(search || industry || area || membership);

  function clearFilters() {
    setSearch("");
    setIndustry("");
    setArea("");
    setMembership("");
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
            <span className="sr-only">{labels.industryLabel}</span>
            <select
              aria-label={labels.industryLabel}
              className={selectClass}
              onChange={(event) => {
                setIndustry(event.target.value);
                setPage(1);
              }}
              value={industry}
            >
              <option value="">{labels.allIndustries}</option>
              {industryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="sr-only">{labels.areaLabel}</span>
            <select
              aria-label={labels.areaLabel}
              className={selectClass}
              onChange={(event) => {
                setArea(event.target.value);
                setPage(1);
              }}
              value={area}
            >
              <option value="">{labels.allAreas}</option>
              {areaOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="sr-only">{labels.membershipLabel}</span>
            <select
              aria-label={labels.membershipLabel}
              className={selectClass}
              onChange={(event) => {
                setMembership(event.target.value);
                setPage(1);
              }}
              value={membership}
            >
              <option value="">{labels.allMemberships}</option>
              {membershipOptions.map((option) => (
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
                setSort(event.target.value as "az" | "za" | "newest");
                setPage(1);
              }}
              value={sort}
            >
              <option value="az">{labels.sortAZ}</option>
              <option value="za">{labels.sortZA}</option>
              <option value="newest">{labels.sortNewest}</option>
            </select>
          </label>
        </div>

        <div className="mt-4 flex min-h-6 flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
          <p aria-live="polite">
            <strong className="text-[#123B5D]">{filteredMembers.length}</strong>{" "}
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

      {visibleMembers.length ? (
        <ul className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visibleMembers.map((member) => {
            const since = memberYear(member.memberSince);
            return (
              <li
                className="group flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#176B9C]/40 hover:shadow-md"
                key={member.id}
              >
                <div className="flex items-start gap-4">
                  <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-[#F5F8FA] font-bold text-[#123B5D]">
                    {member.logo ? (
                      <Image
                        alt=""
                        className="h-full w-full object-contain p-1.5"
                        height={56}
                        loading="lazy"
                        src={member.logo}
                        unoptimized
                        width={56}
                      />
                    ) : (
                      <span aria-hidden="true">{initials(member.companyName)}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h2 className="break-words text-lg font-bold leading-snug text-[#123B5D]">
                      {member.companyName}
                    </h2>
                    <p className="mt-1 text-sm font-semibold text-[#176B9C]">
                      {member.industry}
                    </p>
                  </div>
                </div>

                <dl className="mt-5 space-y-3 text-sm text-slate-600">
                  {member.representative ? (
                    <div className="flex gap-2.5">
                      <dt className="shrink-0">
                        <UserRound
                          aria-hidden="true"
                          className="mt-0.5 size-4 text-[#176B9C]"
                        />
                        <span className="sr-only">{labels.representative}</span>
                      </dt>
                      <dd>{member.representative}</dd>
                    </div>
                  ) : null}
                  <div className="flex gap-2.5">
                    <dt className="shrink-0">
                      <MapPin
                        aria-hidden="true"
                        className="mt-0.5 size-4 text-[#176B9C]"
                      />
                      <span className="sr-only">{labels.areaLabel}</span>
                    </dt>
                    <dd>{member.location}</dd>
                  </div>
                  {since ? (
                    <div className="flex gap-2.5">
                      <dt className="flex shrink-0 gap-2.5">
                        <Building2
                          aria-hidden="true"
                          className="mt-0.5 size-4 text-[#176B9C]"
                        />
                        <span>{labels.memberSince}:</span>
                      </dt>
                      <dd className="font-semibold text-slate-700">{since}</dd>
                    </div>
                  ) : null}
                </dl>

                {member.membershipType ? (
                  <p className="mt-5 w-fit rounded-full bg-[#123B5D]/7 px-3 py-1 text-xs font-bold text-[#123B5D]">
                    {member.membershipType}
                  </p>
                ) : null}

                {member.website ? (
                  <a
                    className="mt-5 inline-flex min-h-11 items-center gap-2 self-start rounded-lg text-sm font-bold text-[#176B9C] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B9C] focus-visible:ring-offset-2"
                    href={member.website}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {labels.visitWebsite}
                    <ExternalLink aria-hidden="true" className="size-4" />
                  </a>
                ) : null}
              </li>
            );
          })}
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

      {filteredMembers.length > normalizedPageSize ? (
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
            <strong className="text-[#123B5D]">{currentPage}</strong> {labels.of}{" "}
            {totalPages}
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
