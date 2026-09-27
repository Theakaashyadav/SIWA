import { CalendarCheck2, CalendarDays, CheckCircle2, MapPin, UsersRound } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PageHero } from "@/components/PageHero";
import { EventCard } from "@/components/cards";
import { ContentFilterExplorer } from "@/components/interactive/content-filters";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { events, eventTypes } from "@/data/events";
import type { EventCategory } from "@/types";

type EventsPageProps = {
  params: Promise<{ locale: string }>;
};

const categoryKey: Record<EventCategory, string> = {
  "government-meeting": "events.categories.governmentMeeting",
  "industry-seminar": "events.categories.industrySeminar",
  "training-session": "events.categories.trainingSession",
  exhibition: "events.categories.exhibition",
  "member-networking": "events.categories.memberNetworking",
  "awareness-program": "events.categories.awarenessProgram",
};

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale === "hi" ? "hi-IN" : "en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export async function generateMetadata({ params }: EventsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.events" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/events`,
      languages: { en: "/en/events", hi: "/hi/events" },
    },
  };
}

export default async function EventsPage({ params }: EventsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const educationalNotice = locale === "hi"
    ? "सत्र में भाग लेना व्यक्तिगत विधिक सलाह, औपचारिक नियुक्ति या प्रतिनिधित्व नहीं है।"
    : "Participation in a session is not individual legal advice, a professional engagement or representation.";
  const filterCategories = [
    { value: "all", label: t("common.all") },
    ...eventTypes.map((category) => ({
      value: category.value,
      label: t(category.labelKey),
    })),
  ];
  const filterItems = events.map((event) => {
    const title = t(event.titleKey);
    const description = t(event.descriptionKey);
    const type = t(categoryKey[event.category]);
    const location = t(event.locationKey);

    return {
      id: event.id,
      category: event.category,
      searchText: [title, description, type, location].join(" "),
      content: (
        <div className="h-full" key={event.id}>
        <EventCard
          title={title}
          description={description}
          type={type}
          date={formatDate(event.date, locale)}
          location={location}
          imageSrc={event.image}
          imageAlt={t(event.imageAltKey)}
          href={`/${locale}/events/${event.slug}`}
          ctaLabel={t("events.viewEvent")}
          status={t("common.sample")}
          featured={event.featured}
        />
        </div>
      ),
    };
  });

  return (
    <>
      <PageHero
        eyebrow={t("events.eyebrow")}
        title={t("events.title")}
        description={t("events.subtitle")}
        breadcrumbs={[
          { label: t("nav.home"), href: `/${locale}` },
          { label: t("events.title") },
        ]}
        actions={
          <>
            <ButtonLink href="#upcoming-events" size="lg">
              {t("events.upcoming")}
            </ButtonLink>
            <ButtonLink href={`/${locale}/gallery`} variant="light" size="lg">
              {t("nav.gallery")}
            </ButtonLink>
          </>
        }
        aside={
          <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-6 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#f28c28] text-[#123b5d]">
                <CalendarCheck2 className="size-6" aria-hidden="true" />
              </span>
              <div>
                <p className="font-bold text-white">{t("events.upcoming")}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{t("events.placeholderNotice")}</p>
              </div>
            </div>
          </div>
        }
      />

      <ContentFilterExplorer
        items={filterItems}
        categories={filterCategories}
        locale={locale}
        filterLabel={t("events.title")}
        resultsLabel={t("events.title")}
        emptyMessage={t("events.empty")}
        clearLabel={t("common.viewAll")}
        sectionId="upcoming-events"
        labelledBy="upcoming-events-title"
        heading={
          <SectionHeading
            eyebrow={t("events.eyebrow")}
            title={t("events.upcoming")}
            description={t("events.description")}
            headingId="upcoming-events-title"
          />
        }
        afterResults={
          <div className="mt-8 flex items-start gap-3 rounded-xl border border-orange-200 bg-orange-50 px-5 py-4 text-sm leading-6 text-orange-950" role="note">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-orange-700" aria-hidden="true" />
            <p><strong className="block">{t("events.placeholderNotice")}</strong>{educationalNotice}</p>
          </div>
        }
      />

      <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="event-community-title">
        <Container>
          <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_22px_56px_-38px_rgba(18,59,93,.5)] lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-7 sm:p-10 lg:p-12">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#176b9c]">{t("home.events.eyebrow")}</p>
              <h2 id="event-community-title" className="mt-3 text-3xl font-bold leading-tight text-[#123b5d] sm:text-4xl">
                {t("home.events.title")}
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">{t("home.events.description")}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href={`/${locale}/contact`}>{t("common.contactUs")}</ButtonLink>
                <ButtonLink href={`/${locale}/legal-assistance`} variant="outline">
                  {t("common.joinSiwa")}
                </ButtonLink>
              </div>
            </div>
            <div className="relative flex min-h-64 items-center justify-center overflow-hidden bg-[#123b5d] p-8 text-white">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)",
                  backgroundSize: "38px 38px",
                }}
                aria-hidden="true"
              />
              <div className="relative grid grid-cols-2 gap-4">
                <span className="flex size-24 flex-col items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-center backdrop-blur-sm">
                  <UsersRound className="size-7 text-[#f5a54f]" aria-hidden="true" />
                  <span className="mt-2 text-xs font-bold">{t("events.categories.memberNetworking")}</span>
                </span>
                <span className="mt-8 flex size-24 flex-col items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-center backdrop-blur-sm">
                  <CalendarDays className="size-7 text-[#f5a54f]" aria-hidden="true" />
                  <span className="mt-2 text-xs font-bold">{t("events.categories.industrySeminar")}</span>
                </span>
                <span className="-mt-8 flex size-24 flex-col items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-center backdrop-blur-sm">
                  <MapPin className="size-7 text-[#f5a54f]" aria-hidden="true" />
                  <span className="mt-2 text-xs font-bold">{t("events.location")}</span>
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
