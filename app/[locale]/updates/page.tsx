import {
  ArrowRight,
  BellRing,
  BookOpenCheck,
  CalendarDays,
  Download,
  FileCheck2,
  FileWarning,
  Landmark,
  Newspaper,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PageHero } from "@/components/PageHero";
import { SchemeCard, UpdateCard } from "@/components/cards";
import { ContentFilterExplorer } from "@/components/interactive/content-filters";
import { Badge, ButtonLink, Container, SectionHeading } from "@/components/ui";
import { notices } from "@/data/notices";
import { schemeCategories, schemeUpdates } from "@/data/schemes";
import { industryUpdates, updateCategories } from "@/data/updates";
import type {
  NoticeCategory,
  SchemeCategory,
  UpdateCategory,
} from "@/types";

type UpdatesPageProps = {
  params: Promise<{ locale: string }>;
};

const schemeCategoryKey: Record<SchemeCategory, string> = {
  "msme-schemes": "schemes.categories.msme",
  subsidies: "schemes.categories.subsidies",
  "policy-updates": "schemes.categories.policy",
  compliance: "schemes.categories.compliance",
  "training-programs": "schemes.categories.training",
};

const updateCategoryKey: Record<UpdateCategory, string> = {
  policy: "updates.categories.policy",
  "government-announcement": "updates.categories.announcements",
  "msme-news": "updates.categories.msme",
  "industrial-development": "updates.categories.development",
  regulatory: "updates.categories.regulatory",
  training: "updates.categories.training",
};

const noticeCategoryKey: Record<NoticeCategory, string> = {
  "member-meeting": "notices.categories.memberMeeting",
  infrastructure: "notices.categories.infrastructure",
  "scheme-awareness": "notices.categories.schemeAwareness",
  general: "notices.categories.general",
};

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale === "hi" ? "hi-IN" : "en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export async function generateMetadata({ params }: UpdatesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.updates" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/updates`,
      languages: { en: "/en/updates", hi: "/hi/updates" },
    },
  };
}

export default async function UpdatesPage({ params }: UpdatesPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const hi = locale === "hi";
  const copy = hi
    ? {
        eyebrow: "विधिक जानकारी केंद्र",
        schemes: "सरकारी योजनाएँ",
        schemesSummary: "उद्योगों के लिए एमएसएमई योजनाओं, पात्रता और आधिकारिक स्रोतों की जानकारी।",
        updates: "विधिक एवं नियामक अपडेट",
        updatesSummary: "कानून, अनुपालन, अधिसूचनाओं और महत्वपूर्ण निर्णयों की उपयोगी जानकारी।",
        notices: "SIWA सूचनाएँ एवं कार्यक्रम",
        noticesSummary: "विधिक जागरूकता सत्र, नेटवर्क गतिविधियाँ और सेवा संबंधी घोषणाएँ।",
        standardTitle: "प्रकाशन मानक",
        standardText: "वास्तविक प्रविष्टि प्रकाशित करने से पहले आधिकारिक स्रोत, लागू क्षेत्र, तारीख और वर्तमान स्थिति की संपादकीय समीक्षा की जानी चाहिए। इस पूर्वावलोकन की नमूना सामग्री स्पष्ट रूप से चिह्नित है।",
        sourceReview: "आधिकारिक स्रोत व संदर्भ",
        clearSummary: "सरल और संक्षिप्त विवरण",
        dateCheck: "प्रभावी व समीक्षा तिथि",
        explore: "अनुभाग देखें",
        schemeListTitle: "उद्योगों के लिए सरकारी योजनाएँ",
        updatesListTitle: "विधिक एवं नियामक जानकारी",
        disclaimer: "यह सामग्री केवल सामान्य जानकारी के लिए है और किसी विशेष मामले पर विधिक सलाह नहीं है। कानून, नियम, पात्रता और समयसीमाएँ बदल सकती हैं; कार्रवाई से पहले आधिकारिक स्रोत और योग्य विधिक पेशेवर से पुष्टि करें।",
        schemeGuarantee: "SIWA किसी योजना में पात्रता, स्वीकृति, सब्सिडी या लाभ की गारंटी नहीं देता।",
      }
    : {
        eyebrow: "Legal information centre",
        schemes: "Government Schemes",
        schemesSummary: "Information on MSME schemes, eligibility and official sources for industry.",
        updates: "Legal & Regulatory Updates",
        updatesSummary: "Useful information on laws, compliance, notifications and important decisions.",
        notices: "SIWA Notices & Programmes",
        noticesSummary: "Legal-awareness sessions, network activities and service announcements.",
        standardTitle: "Publication standard",
        standardText: "Before a real entry is published, its official source, jurisdiction, dates and current status should receive editorial review. Demonstration content in this preview remains clearly labelled.",
        sourceReview: "Official source and citation",
        clearSummary: "Clear, concise summaries",
        dateCheck: "Effective and review dates",
        explore: "Explore section",
        schemeListTitle: "Government schemes for enterprises",
        updatesListTitle: "Legal and regulatory information",
        disclaimer: "This material is for general information only and is not legal advice for a particular matter. Laws, rules, eligibility and deadlines may change; confirm the official source and consult a qualified legal professional before acting.",
        schemeGuarantee: "SIWA does not guarantee eligibility, approval, subsidy or benefit under any scheme.",
      };

  const schemeFilterCategories = schemeCategories.map((category) => ({
    value: category.value,
    label: t(category.labelKey),
  }));
  const schemeFilterItems = schemeUpdates.map((scheme) => {
    const title = t(scheme.titleKey);
    const description = t(scheme.summaryKey);
    const category = t(schemeCategoryKey[scheme.category]);
    const ministry = t(scheme.departmentKey);

    return {
      id: scheme.id,
      category: scheme.category,
      searchText: [title, description, category, ministry].join(" "),
      content: (
        <div className="h-full" key={scheme.id}>
        <SchemeCard
          title={title}
          description={description}
          category={category}
          publishedLabel={t("schemes.published")}
          publishedOn={formatDate(scheme.publishedDate, locale)}
          ministry={ministry}
          href={scheme.externalUrl ?? scheme.documentUrl ?? `/${locale}/contact`}
          ctaLabel={
            scheme.externalUrl
              ? t("schemes.officialSource")
              : scheme.documentUrl
                ? t("schemes.document")
                : t("nav.contact")
          }
          featured={scheme.featured}
        />
        </div>
      ),
    };
  });

  const updateFilterCategories = [
    { value: "all", label: t("common.all") },
    ...updateCategories.map((category) => ({
      value: category.value,
      label: t(category.labelKey),
    })),
  ];
  const updateFilterItems = industryUpdates.map((update) => {
    const title = t(update.titleKey);
    const description = t(update.excerptKey);
    const category = t(updateCategoryKey[update.category]);

    return {
      id: update.id,
      category: update.category,
      searchText: [title, description, category].join(" "),
      content: (
        <div className="h-full" key={update.id}>
        <UpdateCard
          title={title}
          description={description}
          category={category}
          date={formatDate(update.publishedDate, locale)}
          href={`/${locale}/updates/${update.slug}`}
          ctaLabel={t("updates.readArticle")}
          urgent={
            update.category === "government-announcement" ||
            update.category === "regulatory"
          }
          reference={update.sourceLabel ?? t("common.sample")}
        />
        </div>
      ),
    };
  });

  const informationSections = [
    {
      href: "#government-schemes",
      icon: Landmark,
      title: copy.schemes,
      description: copy.schemesSummary,
    },
    {
      href: "#industry-updates",
      icon: Newspaper,
      title: copy.updates,
      description: copy.updatesSummary,
    },
    {
      href: "#siwa-notices",
      icon: BellRing,
      title: copy.notices,
      description: copy.noticesSummary,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={t("updates.title")}
        description={t("updates.subtitle")}
        breadcrumbs={[
          { label: t("nav.home"), href: `/${locale}` },
          { label: t("nav.updates") },
        ]}
        actions={
          <>
            <ButtonLink href="#government-schemes" size="lg">
              {copy.schemes}
            </ButtonLink>
            <ButtonLink href="#industry-updates" variant="light" size="lg">
              {copy.updates}
            </ButtonLink>
          </>
        }
        aside={
          <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-6 shadow-2xl backdrop-blur-sm">
            <span className="flex size-11 items-center justify-center rounded-xl bg-accent-500 text-navy-950">
              <ShieldCheck className="size-6" aria-hidden="true" />
            </span>
            <p className="mt-4 text-lg font-bold text-white">{copy.standardTitle}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{copy.standardText}</p>
            <ul className="mt-5 grid gap-2.5 text-xs font-semibold text-slate-200">
              {[copy.sourceReview, copy.clearSummary, copy.dateCheck].map((item) => (
                <li className="flex items-center gap-2" key={item}>
                  <FileCheck2 className="size-4 text-sky-300" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <section className="border-b border-line bg-white" aria-label={copy.eyebrow}>
        <Container className="grid gap-px bg-line py-px md:grid-cols-3">
          {informationSections.map(({ href, icon: Icon, title, description }) => (
            <a
              className="group flex min-h-44 flex-col bg-white px-6 py-7 transition hover:bg-surface sm:px-8"
              href={href}
              key={href}
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-sky-50 text-industry-600 transition group-hover:bg-navy-800 group-hover:text-white">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h2 className="mt-4 text-lg font-extrabold text-navy-800">{title}</h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-industry-700">
                {copy.explore}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </a>
          ))}
        </Container>
      </section>

      <ContentFilterExplorer
        items={schemeFilterItems}
        categories={schemeFilterCategories}
        allValue="latest"
        locale={locale}
        filterLabel={copy.schemes}
        resultsLabel={copy.schemes}
        emptyMessage={t("schemes.empty")}
        clearLabel={t("common.viewAll")}
        searchPlaceholder={t("schemes.searchPlaceholder")}
        sectionId="government-schemes"
        labelledBy="scheme-list-title"
        heading={
          <SectionHeading
            eyebrow={t("schemes.eyebrow")}
            title={copy.schemeListTitle}
            description={t("schemes.description")}
            headingId="scheme-list-title"
          />
        }
        afterResults={
          <div className="mt-8 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-950" role="note">
            <BookOpenCheck className="mt-0.5 size-5 shrink-0 text-amber-700" aria-hidden="true" />
            <div>
              <p className="font-bold">{t("schemes.placeholderNotice")}</p>
              <p className="mt-1 text-amber-900/80">{copy.schemeGuarantee}</p>
            </div>
          </div>
        }
      />

      <ContentFilterExplorer
        items={updateFilterItems}
        categories={updateFilterCategories}
        locale={locale}
        filterLabel={copy.updates}
        resultsLabel={copy.updates}
        emptyMessage={t("updates.empty")}
        clearLabel={t("common.viewAll")}
        sectionId="industry-updates"
        labelledBy="updates-list-title"
        gridClassName="grid gap-5 lg:grid-cols-2"
        heading={
          <SectionHeading
            eyebrow={t("updates.eyebrow")}
            title={copy.updatesListTitle}
            description={t("updates.description")}
            headingId="updates-list-title"
          />
        }
        afterResults={
          <div className="mt-8 flex gap-3 rounded-xl border border-sky-200 bg-sky-50 p-5 text-sm leading-6 text-navy-800" role="note">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-industry-600" aria-hidden="true" />
            <p>{t("updates.placeholderNotice")}</p>
          </div>
        }
      />

      <section
        id="siwa-notices"
        className="scroll-mt-36 border-t border-line bg-white py-16 sm:py-20 lg:py-24"
        aria-labelledby="notices-title"
      >
        <Container>
          <SectionHeading
            eyebrow={t("notices.eyebrow")}
            title={copy.notices}
            description={t("notices.description")}
            headingId="notices-title"
          />

          <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
            <ul className="divide-y divide-line">
              {notices.map((notice) => (
                <li key={notice.id} className="grid gap-4 p-5 transition hover:bg-surface sm:p-6 lg:grid-cols-[150px_minmax(0,1fr)_auto] lg:items-center lg:gap-6">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                    <CalendarDays className="size-4 text-industry-600" aria-hidden="true" />
                    <time dateTime={notice.date}>{formatDate(notice.date, locale)}</time>
                  </div>
                  <div>
                    <Badge tone={notice.featured ? "orange" : "neutral"}>{t(noticeCategoryKey[notice.category])}</Badge>
                    <h3 className="mt-2 text-base font-bold text-navy-800 sm:text-lg">{t(notice.titleKey)}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{t(notice.descriptionKey)}</p>
                  </div>
                  {notice.documentUrl ? (
                    <a
                      href={notice.documentUrl}
                      download
                      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-line px-4 py-2 text-sm font-bold text-navy-800 transition hover:border-industry-600 hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-industry-600 focus-visible:ring-offset-2"
                    >
                      {t("resources.download")}
                      <Download className="size-4" aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-line bg-surface px-4 py-2 text-sm font-bold text-slate-500" aria-disabled="true">
                      {t("resources.unavailable")}
                      <FileWarning className="size-4" aria-hidden="true" />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-slate-500">
            <BellRing className="size-4 text-industry-600" aria-hidden="true" />
            {t("notices.placeholderNotice")}
          </div>
        </Container>
      </section>

      <section className="bg-navy-900 py-14 text-white sm:py-16">
        <Container className="flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-300">{copy.standardTitle}</p>
            <h2 className="mt-3 text-balance text-2xl font-extrabold sm:text-3xl">{t("schemes.disclaimerTitle")}</h2>
            <p className="mt-3 leading-7 text-slate-300">{copy.disclaimer}</p>
          </div>
          <ButtonLink href={`/${locale}/resources`} size="lg">
            {t("resources.title")}
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
