import type { CategoryOption, Notice, NoticeCategory } from "@/types";

/** Demonstration notices only. No service, programme, date, participant, or file is confirmed. */
export const notices: Notice[] = [
  {
    id: "sample-notice-01",
    title: "Sample: Legal professionals network orientation notice",
    description: "Demonstration service notice only; no orientation, professional participation, or appointment is announced.",
    titleKey: "notices.items.memberMeeting.title",
    descriptionKey: "notices.items.memberMeeting.description",
    category: "member-meeting",
    date: "2026-09-18",
    documentUrl: null,
    featured: true,
    isPlaceholder: true,
  },
  {
    id: "sample-notice-02",
    title: "Sample: Infrastructure legal-issue intake notice",
    description: "Sample wording for a possible future issue-intake programme; no intake window or legal service is currently open.",
    titleKey: "notices.items.infrastructureDiscussion.title",
    descriptionKey: "notices.items.infrastructureDiscussion.description",
    category: "infrastructure",
    date: "2026-09-10",
    documentUrl: null,
    featured: true,
    isPlaceholder: true,
  },
  {
    id: "sample-notice-03",
    title: "Sample: Official-source verification awareness session",
    description: "Demonstration programme notice only; no session, government participation, or official endorsement is confirmed.",
    titleKey: "notices.items.schemeSeminar.title",
    descriptionKey: "notices.items.schemeSeminar.description",
    category: "scheme-awareness",
    date: "2026-08-28",
    documentUrl: null,
    featured: false,
    isPlaceholder: true,
  },
  {
    id: "sample-notice-04",
    title: "Sample: Legal assistance service information review",
    description: "Demonstration administrative notice for reviewing service information; it does not announce an active programme.",
    titleKey: "notices.items.memberUpdate.title",
    descriptionKey: "notices.items.memberUpdate.description",
    category: "general",
    date: "2026-08-16",
    documentUrl: null,
    featured: false,
    isPlaceholder: true,
  },
];

export const noticeCategories: CategoryOption<NoticeCategory>[] = [
  { value: "member-meeting", labelKey: "notices.categories.memberMeeting" },
  { value: "infrastructure", labelKey: "notices.categories.infrastructure" },
  { value: "scheme-awareness", labelKey: "notices.categories.schemeAwareness" },
  { value: "general", labelKey: "notices.categories.general" },
];
