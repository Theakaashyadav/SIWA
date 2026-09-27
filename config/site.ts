import type {
  FooterNavigationGroup,
  LocaleOption,
  NavigationItem,
  SiteConfig,
  Statistic,
} from "@/types";

export const resolvedSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://siwa.example.invalid"
    : "http://localhost:3000");

/**
 * Central configuration for details that must be confirmed by SIWA before
 * launch. Bracketed values and the non-routable fallback origin are deliberate placeholders.
 */
export const siteConfig = {
  name: "SIWA Industry Legal Support",
  shortName: "SIWA",
  legalName: "Small Industrial Welfare Association",
  description:
    "A legal-support platform helping SIWA-connected industries access general legal information, submit an initial assistance request and connect with legal professionals.",
  siteUrl: resolvedSiteUrl,
  contact: {
    address: "[Service Office Address]",
    phone: "[Phone Number]",
    email: "[Email Address]",
    officeHours: "[Office Timings]",
    mapEmbedUrl: null,
  },
  // Social icons should only render after SIWA supplies a verified URL.
  socialLinks: {
    facebook: null,
    linkedin: null,
    youtube: null,
    instagram: null,
  },
  isPlaceholder: true,
} satisfies SiteConfig;

export const locales = [
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी" },
  { code: "en", label: "English", nativeLabel: "English" },
] as const satisfies readonly LocaleOption[];

export const navigation = [
  { labelKey: "nav.home", href: "/" },
  { labelKey: "nav.about", href: "/about" },
  { labelKey: "nav.members", href: "/legal-professionals" },
  { labelKey: "nav.updates", href: "/updates" },
  { labelKey: "resources.title", href: "/resources" },
  { labelKey: "nav.contact", href: "/contact" },
] satisfies NavigationItem[];

export const footerNavigation = [
  {
    titleKey: "footer.quickLinks",
    links: [
      { labelKey: "nav.home", href: "/" },
      { labelKey: "nav.about", href: "/about" },
      { labelKey: "nav.members", href: "/legal-professionals" },
      { labelKey: "nav.gallery", href: "/gallery" },
      { labelKey: "nav.contact", href: "/contact" },
    ],
  },
  {
    titleKey: "footer.resources",
    links: [
      { labelKey: "nav.updates", href: "/updates" },
      { labelKey: "notices.title", href: "/updates#siwa-notices" },
      { labelKey: "events.title", href: "/events" },
      { labelKey: "resources.title", href: "/resources" },
      { labelKey: "membership.title", href: "/legal-assistance" },
    ],
  },
] satisfies FooterNavigationGroup[];

/** Values are intentionally non-factual tokens until SIWA approves figures. */
export const stats = [
  { id: "member-businesses", value: "XXX+", labelKey: "home.stats.members", isPlaceholder: true },
  { id: "industry-meetings", value: "XX+", labelKey: "home.stats.meetings", isPlaceholder: true },
  {
    id: "representations-submitted",
    value: "XX+",
    labelKey: "home.stats.representations",
    isPlaceholder: true,
  },
  { id: "programs-events", value: "XX+", labelKey: "home.stats.programs", isPlaceholder: true },
] satisfies Statistic[];

export const legalNavigation: NavigationItem[] = [
  { labelKey: "footer.privacy", href: "/privacy" },
  { labelKey: "footer.terms", href: "/terms" },
  { labelKey: "footer.disclaimer", href: "/disclaimer" },
];
