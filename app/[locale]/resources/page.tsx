import { Archive, FileCheck2, Files, FolderOpen, SearchCheck, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PageHero } from "@/components/PageHero";
import { ResourceCard } from "@/components/cards";
import { ContentFilterExplorer } from "@/components/interactive/content-filters";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { documentCategories, documents } from "@/data/documents";
import type { DocumentCategory } from "@/types";

type ResourcesPageProps = {
  params: Promise<{ locale: string }>;
};

const categoryKey: Record<DocumentCategory, string> = {
  notices: "resources.categories.notices",
  circulars: "resources.categories.circulars",
  "government-orders": "resources.categories.governmentOrders",
  "membership-forms": "resources.categories.membershipForms",
  "scheme-documents": "resources.categories.schemeDocuments",
  "meeting-documents": "resources.categories.meetingDocuments",
  "industrial-guidelines": "resources.categories.industrialGuidelines",
};

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale === "hi" ? "hi-IN" : "en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export async function generateMetadata({ params }: ResourcesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.resources" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/resources`,
      languages: { en: "/en/resources", hi: "/hi/resources" },
    },
  };
}

export default async function ResourcesPage({ params }: ResourcesPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const resourceDisclaimer = locale === "hi"
    ? "ये संसाधन सामान्य जानकारी के लिए हैं; ये मामले-विशिष्ट विधिक सलाह, दस्तावेज़-प्रारूपण या पेशेवर राय का विकल्प नहीं हैं। लागू प्रावधान और नवीनतम संशोधन आधिकारिक स्रोत से सत्यापित करें।"
    : "These resources are for general information and do not replace matter-specific legal advice, document drafting or a professional opinion. Verify applicable provisions and the latest amendments through official sources.";
  const filterCategories = [
    { value: "all", label: t("common.all") },
    ...documentCategories.map((category) => ({
      value: category.value,
      label: t(category.labelKey),
    })),
  ];
  const filterItems = documents.map((document) => {
    const title = t(document.titleKey);
    const category = t(categoryKey[document.category]);

    return {
      id: document.id,
      category: document.category,
      searchText: [title, category, document.fileType].join(" "),
      content: (
        <div className="h-full" key={document.id}>
        <ResourceCard
          title={title}
          category={category}
          format={document.fileType}
          fileSize={document.fileSize ?? undefined}
          updatedLabel={`${t("resources.date")}: ${formatDate(document.date, locale)}`}
          href={document.documentUrl ?? "#document-library"}
          actionLabel={
            document.isAvailable
              ? t("resources.download")
              : t("resources.unavailable")
          }
          available={document.isAvailable && Boolean(document.documentUrl)}
        />
        </div>
      ),
    };
  });

  return (
    <>
      <PageHero
        eyebrow={t("resources.eyebrow")}
        title={t("resources.title")}
        description={t("resources.subtitle")}
        breadcrumbs={[
          { label: t("nav.home"), href: `/${locale}` },
          { label: t("resources.title") },
        ]}
        actions={
          <>
            <ButtonLink href="#document-library" size="lg">
              {t("resources.title")}
            </ButtonLink>
            <ButtonLink href={`/${locale}/legal-assistance`} variant="light" size="lg">
              {t("nav.becomeMember")}
            </ButtonLink>
          </>
        }
        aside={
          <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-6 backdrop-blur-sm">
            <span className="flex size-11 items-center justify-center rounded-xl bg-[#f28c28] text-[#123b5d]">
              <Files className="size-6" aria-hidden="true" />
            </span>
            <p className="mt-4 font-bold text-white">{t("resources.eyebrow")}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{t("resources.placeholderNotice")}</p>
          </div>
        }
      />

      <ContentFilterExplorer
        items={filterItems}
        categories={filterCategories}
        locale={locale}
        filterLabel={t("resources.title")}
        resultsLabel={t("resources.title")}
        emptyMessage={t("resources.empty")}
        clearLabel={t("common.viewAll")}
        searchPlaceholder={t("resources.searchPlaceholder")}
        sectionId="document-library"
        labelledBy="documents-title"
        heading={
          <SectionHeading
            eyebrow={t("resources.eyebrow")}
            title={t("resources.subtitle")}
            description={t("resources.description")}
            headingId="documents-title"
          />
        }
        gridClassName="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        afterResults={
          <div className="mt-8 flex items-start gap-3 rounded-xl border border-orange-200 bg-orange-50 px-5 py-4 text-sm leading-6 text-orange-950" role="note">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-orange-700" aria-hidden="true" />
            <p><strong className="block">{t("resources.placeholderNotice")}</strong>{resourceDisclaimer}</p>
          </div>
        }
      />

      <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="resource-help-title">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
            <div className="rounded-2xl bg-[#123b5d] p-7 text-white sm:p-9">
              <Archive className="size-9 text-[#f5a54f]" aria-hidden="true" />
              <h2 id="resource-help-title" className="mt-6 text-2xl font-bold sm:text-3xl">{t("resources.title")}</h2>
              <p className="mt-4 leading-7 text-slate-300">{t("resources.description")}</p>
              <ButtonLink href={`/${locale}/legal-assistance`} className="mt-7">
                {t("nav.becomeMember")}
              </ButtonLink>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <ResourcePrinciple
                icon={FolderOpen}
                title={t("resources.categories.circulars")}
                description={t("resources.placeholderNotice")}
              />
              <ResourcePrinciple
                icon={SearchCheck}
                title={t("resources.categories.governmentOrders")}
                description={t("schemes.disclaimer")}
              />
              <ResourcePrinciple
                icon={FileCheck2}
                title={t("resources.categories.membershipForms")}
                description={t("membership.description")}
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

type PrincipleProps = {
  icon: typeof FolderOpen;
  title: string;
  description: string;
};

function ResourcePrinciple({ icon: Icon, title, description }: PrincipleProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_15px_40px_-34px_rgba(18,59,93,.4)] sm:p-6">
      <span className="flex size-11 items-center justify-center rounded-xl bg-sky-50 text-[#176b9c]">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <h3 className="mt-5 font-bold leading-snug text-[#123b5d]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </article>
  );
}
