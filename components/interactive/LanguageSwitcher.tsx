"use client";

import { Globe2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  defaultLocaleOptions,
  localeHref,
  type LocaleOption,
} from "./routing";

export interface LanguageSwitcherProps {
  locale: string;
  languages?: readonly LocaleOption[];
  label?: string;
  className?: string;
  /** Override the current route when the switcher is rendered outside App Router. */
  pathname?: string;
  storageKey?: string;
  cookieName?: string;
}

export function LanguageSwitcher({
  locale,
  languages = defaultLocaleOptions,
  label = "Select language",
  className = "",
  pathname: pathnameOverride,
  storageKey = "siwa-locale",
  cookieName = "NEXT_LOCALE",
}: LanguageSwitcherProps) {
  const appPathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = pathnameOverride ?? appPathname ?? `/${locale}`;

  function changeLanguage(nextLocale: string) {
    if (nextLocale === locale) return;

    const supportedLocales = languages.map(({ code }) => code);
    const nextPath = localeHref(pathname, nextLocale, supportedLocales);

    try {
      window.localStorage.setItem(storageKey, nextLocale);
      document.cookie = `${encodeURIComponent(cookieName)}=${encodeURIComponent(nextLocale)}; Path=/; Max-Age=31536000; SameSite=Lax`;
    } catch {
      // Navigation still works when storage is unavailable or blocked.
    }

    const suffix = `${window.location.search}${window.location.hash}`;
    startTransition(() => router.push(`${nextPath}${suffix}`));
  }

  return (
    <label
      className={`inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-2.5 text-sm text-white transition hover:bg-white/15 focus-within:ring-2 focus-within:ring-white focus-within:ring-offset-2 focus-within:ring-offset-[#123B5D] ${className}`}
    >
      <Globe2 aria-hidden="true" className="size-4 shrink-0" />
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        className="cursor-pointer appearance-none bg-transparent pr-1 font-medium text-inherit outline-none disabled:cursor-wait disabled:opacity-70"
        disabled={isPending}
        onChange={(event) => changeLanguage(event.target.value)}
        value={locale}
      >
        {languages.map((language) => (
          <option
            className="bg-white text-[#123B5D]"
            key={language.code}
            value={language.code}
          >
            {language.label}
          </option>
        ))}
      </select>
    </label>
  );
}
