/**
 * Shared content contracts for the SIWA website.
 *
 * The first release uses local, typed records. The interfaces intentionally
 * avoid presentation-specific fields so the same records can later come from
 * a CMS or API without changing page components.
 */

export type Locale = "en" | "hi";
export type ISODateString = string;

export interface LocaleOption {
  code: Locale;
  label: string;
  nativeLabel: string;
}

export interface NavigationItem {
  labelKey: string;
  href: string;
}

export interface FooterNavigationGroup {
  titleKey: string;
  links: NavigationItem[];
}

export interface PlaceholderRecord {
  /** True until the record has been reviewed and replaced by SIWA; false once approved for production. */
  isPlaceholder: boolean;
}

export type MembershipType = "General" | "Associate" | "Institutional";
export type MemberStatus = "active" | "inactive";

export interface Member extends PlaceholderRecord {
  id: string;
  companyName: string;
  /** Initials are used when no verified company logo is available. */
  initials: string;
  logo?: string;
  industry: string;
  representative: string;
  location: string;
  memberSince: string;
  membershipType: MembershipType;
  website?: string;
  featured: boolean;
  status: MemberStatus;
}

export type LegalProfessionalRole =
  | "Advocate"
  | "Legal Consultant"
  | "Compliance Adviser"
  | "Mediator";

export type LegalProfessionalStatus = "active" | "inactive";

/**
 * Public directory record for a legal professional supporting industrial and
 * commercial matters. Private contact details deliberately do not belong in
 * this model and should be handled through the legal-assistance workflow.
 */
export interface LegalProfessional extends PlaceholderRecord {
  id: string;
  name: string;
  role: LegalProfessionalRole;
  organisation: string;
  practiceAreas: string[];
  location: string;
  languages: string[];
  experience?: string;
  profileUrl?: string;
  photo?: string;
  featured: boolean;
  status: LegalProfessionalStatus;
}

export type NoticeCategory =
  | "member-meeting"
  | "infrastructure"
  | "scheme-awareness"
  | "general";

export interface Notice extends PlaceholderRecord {
  id: string;
  title: string;
  description: string;
  titleKey: string;
  descriptionKey: string;
  category: NoticeCategory;
  date: ISODateString;
  documentUrl: string | null;
  featured: boolean;
}

export type SchemeCategory =
  | "msme-schemes"
  | "subsidies"
  | "policy-updates"
  | "compliance"
  | "training-programs";

export type SchemeFilter = "latest" | SchemeCategory;

export interface SchemeUpdate extends PlaceholderRecord {
  id: string;
  slug: string;
  title: string;
  summary: string;
  department: string;
  titleKey: string;
  summaryKey: string;
  departmentKey: string;
  category: SchemeCategory;
  publishedDate: ISODateString;
  deadline: ISODateString | null;
  externalUrl: string | null;
  documentUrl: string | null;
  featured: boolean;
}

/** Compatibility name for CMS adapters that expose a `Scheme` model. */
export type Scheme = SchemeUpdate;

export type UpdateCategory =
  | "policy"
  | "government-announcement"
  | "msme-news"
  | "industrial-development"
  | "regulatory"
  | "training";

export interface LocalizedTextValue {
  en: string;
  hi: string;
}

/** Safe structured article copy; a CMS adapter can map portable text into this shape. */
export interface ArticleContentSection {
  id: string;
  heading: LocalizedTextValue;
  paragraphs: LocalizedTextValue[];
}

export interface IndustryUpdate extends PlaceholderRecord {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  titleKey: string;
  excerptKey: string;
  category: UpdateCategory;
  publishedDate: ISODateString;
  image?: string;
  sourceLabel: string | null;
  sourceUrl: string | null;
  contentSections: ArticleContentSection[];
  featured: boolean;
}

export type EventCategory =
  | "government-meeting"
  | "industry-seminar"
  | "training-session"
  | "exhibition"
  | "member-networking"
  | "awareness-program";

export interface AssociationEvent extends PlaceholderRecord {
  id: string;
  slug: string;
  title: string;
  description: string;
  titleKey: string;
  descriptionKey: string;
  date: ISODateString;
  endDate?: ISODateString;
  location: string;
  locationKey: string;
  image: string;
  imageAlt: string;
  imageAltKey: string;
  galleryImages: string[];
  category: EventCategory;
  featured: boolean;
}

export type GalleryCategory =
  | "all"
  | "government-meetings"
  | "seminars"
  | "training"
  | "industrial-visits"
  | "exhibitions"
  | "member-events";

export interface GalleryItem extends PlaceholderRecord {
  id: string;
  title: string;
  titleKey: string;
  category: Exclude<GalleryCategory, "all">;
  date: ISODateString;
  image: string;
  alt: string;
  description?: string;
  altKey: string;
  descriptionKey?: string;
}

export type DocumentCategory =
  | "notices"
  | "circulars"
  | "government-orders"
  | "membership-forms"
  | "scheme-documents"
  | "meeting-documents"
  | "industrial-guidelines";

export interface DocumentResource extends PlaceholderRecord {
  id: string;
  title: string;
  titleKey: string;
  category: DocumentCategory;
  date: ISODateString;
  fileType: "PDF" | "DOCX" | "XLSX";
  fileSize: string | null;
  documentUrl: string | null;
  isAvailable: boolean;
}

export type LeadershipRole =
  | "president"
  | "vice-president"
  | "general-secretary"
  | "joint-secretary"
  | "treasurer"
  | "executive-member";

export interface LeadershipMember extends PlaceholderRecord {
  id: string;
  name: string;
  position: string;
  nameKey: string;
  positionKey: string;
  role: LeadershipRole;
  initials: string;
  image?: string;
  bio?: string;
  bioKey?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
}

export interface IndustrialIssue {
  id: string;
  label: string;
  labelKey: string;
  icon: string;
}

export interface AuthorityCoordination {
  id: string;
  name: string;
  description: string;
  nameKey: string;
  descriptionKey: string;
  icon: string;
}

export interface JourneyMilestone extends PlaceholderRecord {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface Statistic extends PlaceholderRecord {
  id: string;
  value: string;
  labelKey: string;
}

export interface SiteContact {
  address: string;
  phone: string;
  email: string;
  officeHours: string;
  mapEmbedUrl: string | null;
}

export type SocialPlatform = "facebook" | "linkedin" | "youtube" | "instagram";

export interface SiteConfig extends PlaceholderRecord {
  name: string;
  shortName: string;
  legalName: string;
  description: string;
  siteUrl: string;
  contact: SiteContact;
  socialLinks: Record<SocialPlatform, string | null>;
}

export interface CategoryOption<T extends string> {
  value: T;
  labelKey: string;
}
