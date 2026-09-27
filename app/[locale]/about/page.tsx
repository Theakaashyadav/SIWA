import {
  BookOpenCheck,
  Building2,
  CalendarRange,
  Eye,
  Handshake,
  Landmark,
  Leaf,
  Network,
  Presentation,
  Route,
  ShieldCheck,
  Target,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { PageHero } from "@/components/PageHero";
import { LeadershipCard, ObjectiveCard } from "@/components/cards";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { leadership } from "@/data/leadership";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

const objectiveItems = [
  { key: "represent", icon: Landmark },
  { key: "cooperation", icon: Handshake },
  { key: "regulatory", icon: BookOpenCheck },
  { key: "infrastructure", icon: Route },
  { key: "awareness", icon: Building2 },
  { key: "development", icon: Target },
  { key: "training", icon: Presentation },
  { key: "networking", icon: Network },
  { key: "responsibleGrowth", icon: Leaf },
] as const;

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.about" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/about`,
      languages: { en: "/en/about", hi: "/hi/about" },
    },
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const publishedLeadership = leadership.filter((person) => !person.isPlaceholder);

  return (
    <>
      <PageHero
        eyebrow={t("about.eyebrow")}
        title={t("about.title")}
        description={t("about.subtitle")}
        breadcrumbs={[
          { label: t("nav.home"), href: `/${locale}` },
          { label: t("nav.about") },
        ]}
        actions={
          <>
            <ButtonLink href={`/${locale}/legal-assistance`} size="lg">
              {t("nav.becomeMember")}
            </ButtonLink>
            <ButtonLink href={`/${locale}/contact`} variant="light" size="lg">
              {t("nav.contact")}
            </ButtonLink>
          </>
        }
      />

      <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="who-we-are-title">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 shadow-[0_26px_60px_-34px_rgba(18,59,93,0.5)]">
                <Image
                  src="/images/siwa-industrial-estate.webp"
                  alt={t("about.whoWeAre.imageAlt")}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c304c]/45 via-transparent to-transparent" aria-hidden="true" />
              </div>
              <div className="absolute -bottom-5 -right-2 hidden w-48 rounded-xl border border-white/80 bg-white p-4 shadow-xl sm:block lg:-right-5">
                <span className="flex size-10 items-center justify-center rounded-lg bg-orange-50 text-[#dc7417]">
                  <Handshake className="size-5" aria-hidden="true" />
                </span>
                <p className="mt-3 text-sm font-bold leading-5 text-[#123b5d]">{t("about.subtitle")}</p>
              </div>
            </div>

            <div>
              <SectionHeading
                eyebrow={t("about.whoWeAre.eyebrow")}
                title={t("about.whoWeAre.title")}
                headingId="who-we-are-title"
              />
              <div className="mt-6 space-y-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                <p>{t("about.whoWeAre.paragraphOne")}</p>
                <p>{t("about.whoWeAre.paragraphTwo")}</p>
              </div>
              <div className="mt-8 border-l-4 border-[#f28c28] bg-[#f5f8fa] px-5 py-4 text-sm font-semibold leading-6 text-[#123b5d]">
                {t("about.mission.text")}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-[#f5f8fa] py-16 sm:py-20" aria-label={t("about.mission.title")}>
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            <article className="relative overflow-hidden rounded-2xl bg-[#123b5d] p-7 text-white shadow-[0_18px_44px_-28px_rgba(18,59,93,.8)] sm:p-9">
              <Target className="absolute -bottom-8 -right-7 size-40 text-white/[0.06]" aria-hidden="true" />
              <span className="flex size-12 items-center justify-center rounded-xl bg-white/10 text-[#f5a54f]">
                <Target className="size-6" aria-hidden="true" />
              </span>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-sky-200">{t("about.mission.eyebrow")}</p>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{t("about.mission.title")}</h2>
              <p className="relative mt-4 max-w-xl leading-7 text-slate-300">{t("about.mission.text")}</p>
            </article>

            <article className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_18px_44px_-32px_rgba(18,59,93,.4)] sm:p-9">
              <Eye className="absolute -bottom-8 -right-7 size-40 text-[#176b9c]/[0.06]" aria-hidden="true" />
              <span className="flex size-12 items-center justify-center rounded-xl bg-sky-50 text-[#176b9c]">
                <Eye className="size-6" aria-hidden="true" />
              </span>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-[#176b9c]">{t("about.vision.eyebrow")}</p>
              <h2 className="mt-2 text-2xl font-bold text-[#123b5d] sm:text-3xl">{t("about.vision.title")}</h2>
              <p className="relative mt-4 max-w-xl leading-7 text-slate-600">{t("about.vision.text")}</p>
            </article>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="objectives-title">
        <Container>
          <SectionHeading
            eyebrow={t("about.objectives.eyebrow")}
            title={t("about.objectives.title")}
            description={t("about.objectives.description")}
            align="center"
            headingId="objectives-title"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {objectiveItems.map((item, index) => (
              <ObjectiveCard
                key={item.key}
                number={String(index + 1).padStart(2, "0")}
                icon={item.icon}
                title={t(`about.objectives.items.${item.key}`)}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-[#f5f8fa] py-16 sm:py-20 lg:py-24" aria-labelledby="leadership-title">
        <Container>
          <SectionHeading
            eyebrow={t("about.leadership.eyebrow")}
            title={t("about.leadership.title")}
            description={t("about.leadership.description")}
            headingId="leadership-title"
          />
          {publishedLeadership.length ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {publishedLeadership.map((member) => (
                <LeadershipCard
                  key={member.id}
                  name={t(member.nameKey)}
                  role={t(member.positionKey)}
                  bio={member.bioKey ? t(member.bioKey) : member.bio}
                  imageUrl={member.image}
                  imageAlt={t(member.nameKey)}
                />
              ))}
            </div>
          ) : (
            <div className="mt-10 flex max-w-3xl items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_18px_45px_-36px_rgba(18,59,93,.45)] sm:p-7">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-sky-50 text-[#176b9c]">
                <ShieldCheck aria-hidden="true" className="size-5" />
              </span>
              <div>
                <h3 className="font-bold text-[#123b5d]">
                  {locale === "hi" ? "विधिक समन्वय टीम की सत्यापित जानकारी" : "Verified legal coordination team information"}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {t("about.leadership.description")}
                </p>
              </div>
            </div>
          )}
        </Container>
      </section>

      <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="journey-title">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-16">
            <SectionHeading
              eyebrow={t("about.journey.eyebrow")}
              title={t("about.journey.title")}
              description={t("about.journey.description")}
              headingId="journey-title"
            />
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_18px_45px_-34px_rgba(18,59,93,.45)] sm:p-9">
              <div className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-[#f28c28] via-[#176b9c] to-[#123b5d]" aria-hidden="true" />
              <div className="flex gap-5">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-[#176b9c]">
                  <CalendarRange className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-[#123b5d]">{t("about.journey.title")}</h3>
                  <p className="mt-2 leading-7 text-slate-600">{t("about.journey.placeholder")}</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
