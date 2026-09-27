export interface LocaleOption {
  code: string;
  label: string;
  shortLabel?: string;
}

export const defaultLocaleOptions: readonly LocaleOption[] = [
  { code: "hi", label: "हिन्दी", shortLabel: "हि" },
  { code: "en", label: "English", shortLabel: "EN" },
];

const nonLocalizedHref = /^(?:#|mailto:|tel:|https?:\/\/|\/\/)/i;

export function localeHref(
  href: string,
  locale: string,
  supportedLocales: readonly string[] = defaultLocaleOptions.map(
    ({ code }) => code,
  ),
) {
  if (!href || nonLocalizedHref.test(href)) return href || `/${locale}`;

  const normalizedHref = href.startsWith("/") ? href : `/${href}`;
  const segments = normalizedHref.split("/").filter(Boolean);

  if (segments[0] && supportedLocales.includes(segments[0])) {
    segments[0] = locale;
    return `/${segments.join("/")}`;
  }

  return normalizedHref === "/"
    ? `/${locale}`
    : `/${locale}${normalizedHref}`;
}
