import type {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BadgeIndianRupee,
  BadgeCheck,
  Bolt,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  Construction,
  Droplets,
  Factory,
  FileDown,
  FileSignature,
  FileText,
  Handshake,
  Landmark,
  Leaf,
  MapPin,
  Map,
  Network,
  Route,
  ReceiptIndianRupee,
  Recycle,
  Scale,
  ScrollText,
  ShieldCheck,
  Trash2,
  UsersRound,
  Waves,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {ButtonLink, Container, SectionHeading} from '@/components/ui';
import {documents} from '@/data/documents';
import {events, eventTypes} from '@/data/events';
import {authorityCoordination, industrialIssues, services} from '@/data/home';
import {featuredLegalProfessionals, localizeLegalProfessional} from '@/data/legal-professionals';
import {noticeCategories, notices} from '@/data/notices';
import {schemeCategories, schemeUpdates} from '@/data/schemes';
import {industryUpdates, updateCategories} from '@/data/updates';

type PageProps = {params: Promise<{locale: string}>};
type Translator = (key: string, values?: Record<string, string | number | Date>) => string;
type KeyedText = {
  title?: string;
  titleKey?: string;
  description?: string;
  descriptionKey?: string;
  summary?: string;
  summaryKey?: string;
  imageAlt?: string;
  imageAltKey?: string;
  location?: string;
  locationKey?: string;
};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'hi' ? 'उद्योगों के लिए कानूनी जानकारी और सहायता' : 'Legal Information and Support for Industry',
    description:
      locale === 'hi'
        ? 'उद्योग-संबंधी कानूनी जानकारी पढ़ें, प्रारंभिक सहायता अनुरोध भेजें और विधिक पेशेवरों के नेटवर्क से संपर्क करें।'
        : 'Read industry-related legal information, submit an initial assistance request and connect with legal professionals.',
    alternates: {
      canonical: `/${locale}`,
      languages: {en: '/en', hi: '/hi'},
    },
  };
}

const iconMap: Record<string, LucideIcon> = {
  landmark: Landmark,
  government: Landmark,
  handshake: Handshake,
  industry: Factory,
  factory: Factory,
  users: UsersRound,
  community: UsersRound,
  schemes: BadgeIndianRupee,
  subsidy: BadgeIndianRupee,
  badgeindianrupee: BadgeIndianRupee,
  regulation: ScrollText,
  document: FileText,
  filetext: FileText,
  infrastructure: Route,
  construction: Construction,
  road: Route,
  route: Route,
  pollution: Leaf,
  leaf: Leaf,
  labour: BriefcaseBusiness,
  petition: FileSignature,
  scrolltext: ScrollText,
  network: Network,
  water: Droplets,
  droplets: Droplets,
  waves: Waves,
  electricity: Bolt,
  zap: Zap,
  waste: Trash2,
  recycle: Recycle,
  security: ShieldCheck,
  shieldcheck: ShieldCheck,
  policy: Scale,
  map: Map,
  badgecheck: BadgeCheck,
  receiptindianrupee: ReceiptIndianRupee,
  building2: Building2,
  default: CheckCircle2,
};

function iconFor(name: string | undefined) {
  return iconMap[name?.toLowerCase() ?? ''] ?? iconMap.default;
}

function translated(t: Translator, item: KeyedText, key: 'title' | 'description' | 'summary' | 'imageAlt' | 'location') {
  const messageKey = item[`${key}Key` as keyof KeyedText];
  const fallback = item[key];
  return typeof messageKey === 'string' ? t(messageKey) : typeof fallback === 'string' ? fallback : '';
}

function webp(path: string) {
  return path.endsWith('.png') ? path.replace(/\.png$/, '.webp') : path;
}

export default async function HomePage({params}: PageProps) {
  const {locale} = await params;
  setRequestLocale(locale);
  const rawT = await getTranslations({locale});
  const t = rawT as unknown as Translator;
  const href = (path: string) => `/${locale}${path}`;
  const dateLocale = locale === 'hi' ? 'hi-IN' : 'en-IN';
  const dateFormatter = new Intl.DateTimeFormat(dateLocale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const displayFeaturedProfessionals = featuredLegalProfessionals.map((professional) =>
    localizeLegalProfessional(professional, locale),
  );

  const quickCards = [
    {icon: FileSignature, title: t('home.quickInfo.coordinationTitle'), text: t('home.quickInfo.coordinationText')},
    {icon: UsersRound, title: t('home.quickInfo.supportTitle'), text: t('home.quickInfo.supportText')},
    {icon: ShieldCheck, title: t('home.quickInfo.representationTitle'), text: t('home.quickInfo.representationText')},
    {icon: CalendarDays, title: t('home.quickInfo.communityTitle'), text: t('home.quickInfo.communityText')},
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy-950 text-white">
        <Image
          src="/images/siwa-industrial-estate.webp"
          alt={t('home.hero.imageAlt')}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[62%_center]"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,40,63,0.97)_0%,rgba(8,40,63,0.88)_43%,rgba(8,40,63,0.42)_73%,rgba(8,40,63,0.22)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(8,40,63,0.45),transparent_45%)]" />
        <Container className="flex min-h-[38rem] items-center py-20 sm:min-h-[42rem] lg:min-h-[43rem]">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-[0.7rem] font-extrabold uppercase tracking-[0.16em] text-sky-100 backdrop-blur-sm sm:text-xs">
              <span className="size-1.5 rounded-full bg-accent-500" />
              {t('home.hero.badge')}
            </p>
            <h1 className="text-balance text-[2.55rem] font-extrabold leading-[1.06] tracking-[-0.04em] sm:text-6xl lg:text-[4.25rem]">
              {t('home.hero.title')}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
              {t('home.hero.description')}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={href('/legal-assistance')} size="lg" trailingIcon={<ArrowRight className="size-4" />}>
                {t('home.hero.primaryCta')}
              </ButtonLink>
              <ButtonLink href={href('/updates')} variant="light" size="lg">
                {t('home.hero.secondaryCta')}
              </ButtonLink>
            </div>
            <p className="mt-7 flex max-w-2xl items-start gap-2 text-xs font-semibold leading-5 text-slate-300 sm:text-sm">
              <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-500" />
              {t('home.hero.trustLine')}
            </p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="quick-info-heading" className="relative z-10 -mt-1 bg-white pb-12 lg:-mt-12 lg:bg-transparent lg:pb-0">
        <h2 id="quick-info-heading" className="sr-only">{t('home.quickInfo.title')}</h2>
        <Container>
          <div className="grid overflow-hidden rounded-2xl border border-line bg-white shadow-[0_24px_60px_-30px_rgba(8,40,63,0.45)] sm:grid-cols-2 lg:grid-cols-4">
            {quickCards.map(({icon: Icon, title, text}, index) => (
              <article key={title} className={`p-6 lg:p-7 ${index ? 'border-t border-line sm:border-l sm:border-t-0' : ''} ${index === 2 ? 'sm:border-l-0 lg:border-l' : ''}`}>
                <div className="flex size-11 items-center justify-center rounded-xl bg-sky-50 text-industry-600">
                  <Icon aria-hidden="true" className="size-5" />
                </div>
                <h3 className="mt-5 text-base font-extrabold text-navy-800">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-pad bg-white">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.03fr_0.97fr] lg:gap-20">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface">
              <Image src="/images/siwa-members-meeting.webp" alt={t('home.about.imageAlt')} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-2 hidden max-w-[15rem] rounded-xl border border-line bg-white p-4 shadow-xl sm:block lg:-right-7">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-industry-600">{t('home.about.eyebrow')}</p>
              <p className="mt-1 text-sm font-bold leading-5 text-navy-800">{t('home.hero.trustLine')}</p>
            </div>
          </div>
          <div>
            <SectionHeading eyebrow={t('home.about.eyebrow')} title={t('home.about.title')} />
            <p className="mt-6 text-base leading-7 text-slate-600">{t('home.about.paragraphOne')}</p>
            <p className="mt-4 text-base leading-7 text-slate-600">{t('home.about.paragraphTwo')}</p>
            <ButtonLink href={href('/about')} variant="secondary" className="mt-8" trailingIcon={<ArrowRight className="size-4" />}>
              {t('home.about.cta')}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="section-pad bg-surface" aria-labelledby="services-heading">
        <Container>
          <SectionHeading
            eyebrow={t('home.services.eyebrow')}
            title={t('home.services.title')}
            description={t('home.services.description')}
            align="center"
            headingId="services-heading"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = iconFor(service.icon);
              return (
                <article key={service.id} className="card-lift group relative overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-card">
                  <span aria-hidden="true" className="absolute right-4 top-3 text-4xl font-black tracking-[-0.06em] text-slate-100">{service.number}</span>
                  <div className="relative flex size-11 items-center justify-center rounded-xl bg-navy-800 text-white transition group-hover:bg-industry-600">
                    <Icon aria-hidden="true" className="size-5" />
                  </div>
                  <h3 className="relative mt-6 text-lg font-extrabold leading-6 text-navy-800">{t(service.titleKey)}</h3>
                  <p className="relative mt-3 text-sm leading-6 text-muted">{t(service.descriptionKey)}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="subtle-grid overflow-hidden bg-navy-900 text-white">
        <Container className="grid lg:grid-cols-2">
          <div className="section-pad pr-0 lg:pr-16">
            <SectionHeading
              eyebrow={t('home.liaison.eyebrow')}
              title={t('home.liaison.title')}
              description={t('home.liaison.description')}
              tone="dark"
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {authorityCoordination.map((authority) => {
                const Icon = iconFor(authority.icon);
                return (
                  <div key={authority.id} className="rounded-xl border border-white/12 bg-white/[0.055] p-4">
                    <div className="flex items-start gap-3">
                      <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-sky-300" />
                      <div>
                        <h3 className="text-sm font-bold text-white">{t(authority.nameKey)}</h3>
                        <p className="mt-1 text-xs leading-5 text-slate-300">{t(authority.descriptionKey)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-6 flex gap-2 rounded-xl border border-accent-500/25 bg-accent-500/10 p-4 text-xs leading-5 text-slate-200">
              <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-500" />
              {t('home.liaison.note')}
            </p>
          </div>
          <div className="relative min-h-[26rem] lg:min-h-[32rem]">
            <Image src="/images/siwa-liaison-meeting.webp" alt={t('home.liaison.imageAlt')} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-900/35 to-transparent lg:from-navy-900" />
          </div>
        </Container>
      </section>

      <section className="section-pad bg-white" aria-labelledby="issues-heading">
        <Container>
          <SectionHeading eyebrow={t('home.issues.eyebrow')} title={t('home.issues.title')} description={t('home.issues.description')} headingId="issues-heading" />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {industrialIssues.map((issue) => {
              const Icon = iconFor(issue.icon);
              return (
                <div key={issue.id} className="flex min-h-16 items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 shadow-[0_8px_22px_-20px_rgba(8,40,63,0.5)]">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-industry-600"><Icon aria-hidden="true" className="size-4.5" /></span>
                  <span className="text-sm font-bold text-slate-700">{t(issue.labelKey)}</span>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section-pad bg-surface" aria-labelledby="schemes-heading">
        <Container>
          <SectionHeading
            eyebrow={t('home.schemes.eyebrow')}
            title={t('home.schemes.title')}
            description={t('home.schemes.description')}
            headingId="schemes-heading"
            action={<ButtonLink href={href('/updates')} variant="outline">{t('common.viewAll')}</ButtonLink>}
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
              <div className="flex items-center justify-between border-b border-line bg-white px-6 py-5">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-navy-800 text-white">
                    <Landmark aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="text-lg font-extrabold text-navy-800">{t('schemes.title')}</h3>
                </div>
                <Link className="text-sm font-bold text-industry-700 hover:underline" href={href('/updates#government-schemes')}>
                  {t('common.viewAll')}
                </Link>
              </div>
              <div className="divide-y divide-line">
                {schemeUpdates.slice(0, 2).map((scheme) => {
                  const category = schemeCategories.find((item) => item.value === scheme.category);
                  const title = translated(t, scheme as KeyedText, 'title');
                  return (
                    <article key={scheme.id} className="p-6">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="rounded-full bg-sky-50 px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-[0.08em] text-industry-700">{category ? t(category.labelKey) : scheme.category}</span>
                        <time className="text-xs font-semibold text-slate-500" dateTime={scheme.publishedDate}>{dateFormatter.format(new Date(`${scheme.publishedDate}T00:00:00`))}</time>
                      </div>
                      <h4 className="mt-4 text-lg font-extrabold leading-7 text-navy-800">{title}</h4>
                      <p className="mt-2 text-sm leading-6 text-muted">{translated(t, scheme as KeyedText, 'summary')}</p>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
              <div className="flex items-center justify-between border-b border-line bg-white px-6 py-5">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-accent-500 text-navy-950">
                    <ScrollText aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="text-lg font-extrabold text-navy-800">{locale === 'hi' ? 'विधिक एवं नियामक अपडेट' : 'Legal & Regulatory Updates'}</h3>
                </div>
                <Link className="text-sm font-bold text-industry-700 hover:underline" href={href('/updates#industry-updates')}>
                  {t('common.viewAll')}
                </Link>
              </div>
              <div className="divide-y divide-line">
                {industryUpdates.slice(0, 2).map((update) => {
                  const category = updateCategories.find((item) => item.value === update.category);
                  const title = t(update.titleKey);
                  return (
                    <article key={update.id} className="p-6">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="rounded-full bg-amber-50 px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-[0.08em] text-amber-800">{category ? t(category.labelKey) : update.category}</span>
                        <time className="text-xs font-semibold text-slate-500" dateTime={update.publishedDate}>{dateFormatter.format(new Date(`${update.publishedDate}T00:00:00`))}</time>
                      </div>
                      <h4 className="mt-4 text-lg font-extrabold leading-7 text-navy-800">{title}</h4>
                      <p className="mt-2 text-sm leading-6 text-muted">{t(update.excerptKey)}</p>
                      <Link
                        aria-label={`${t('updates.readArticle')}: ${title}`}
                        className="mt-3 inline-flex min-h-10 items-center gap-1 text-sm font-bold text-industry-700 hover:underline"
                        href={href(`/updates/${update.slug}`)}
                      >
                        {t('updates.readArticle')} <ArrowRight aria-hidden="true" className="size-3.5" />
                      </Link>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-pad bg-white" id="notices" aria-labelledby="notices-heading">
        <Container className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow={t('home.notices.eyebrow')} title={t('home.notices.title')} description={t('home.notices.description')} headingId="notices-heading" />
            <ButtonLink href={href('/updates')} variant="secondary" className="mt-7">{t('common.viewAll')}</ButtonLink>
          </div>
          <div className="overflow-hidden rounded-2xl border border-line bg-white">
            {notices.slice(0, 3).map((notice, index) => {
              const category = noticeCategories.find((item) => item.value === notice.category);
              const date = new Date(`${notice.date}T00:00:00`);
              return (
                <article key={notice.id} className={`grid gap-4 p-5 sm:grid-cols-[4.5rem_1fr_auto] sm:items-center sm:p-6 ${index ? 'border-t border-line' : ''}`}>
                  <time dateTime={notice.date} className="flex w-fit items-center gap-2 text-xs font-bold text-slate-500 sm:block sm:text-center">
                    <span className="text-2xl font-black leading-none text-navy-800 sm:block">{new Intl.DateTimeFormat(dateLocale, {day: '2-digit'}).format(date)}</span>
                    <span className="mt-1 uppercase tracking-[0.08em] sm:block">{new Intl.DateTimeFormat(dateLocale, {month: 'short', year: 'numeric'}).format(date)}</span>
                  </time>
                  <div>
                    <span className="text-[0.68rem] font-extrabold uppercase tracking-[0.1em] text-industry-600">{category ? t(category.labelKey) : notice.category}</span>
                    <h3 className="mt-1 font-extrabold text-navy-800">{translated(t, notice as KeyedText, 'title')}</h3>
                  </div>
                  <span className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-line px-3 text-xs font-bold text-slate-500" aria-disabled="true">
                    {t('common.unavailable')}
                  </span>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section-pad bg-white" aria-labelledby="members-heading">
        <Container>
          <SectionHeading
            eyebrow={t('home.members.eyebrow')}
            title={t('home.members.title')}
            description={t('home.members.description')}
            headingId="members-heading"
            action={<ButtonLink href={href('/legal-professionals')} variant="outline">{t('home.members.viewAll')}</ButtonLink>}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {displayFeaturedProfessionals.slice(0, 3).map((professional) => (
              <article key={professional.id} className="card-lift rounded-2xl border border-line bg-white p-6 shadow-card">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-14 place-items-center rounded-xl bg-navy-800 text-white"><Scale aria-hidden="true" className="size-6" /></span>
                  <span className="rounded bg-amber-50 px-2 py-1 text-[0.65rem] font-bold text-amber-800">{t('common.sample')}</span>
                </div>
                <h3 className="mt-5 text-lg font-extrabold text-navy-800">{professional.name}</h3>
                <p className="mt-1 text-sm font-semibold text-industry-600">{professional.role}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{professional.organisation}</p>
                <div className="mt-5 space-y-2 border-t border-line pt-4 text-sm text-slate-600">
                  <p className="flex gap-2"><ScrollText aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-slate-400" /> {professional.practiceAreas.join(' · ')}</p>
                  <p className="flex gap-2"><MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-slate-400" /> {professional.location}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-sky-50 py-12">
        <Container className="flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
          <div className="max-w-3xl">
            <h2 className="text-balance text-2xl font-extrabold tracking-[-0.03em] text-navy-800 sm:text-3xl">{t('home.membershipCta.title')}</h2>
            <p className="mt-3 leading-7 text-slate-600">{t('home.membershipCta.description')}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <ButtonLink href={href('/legal-assistance')}>{t('home.membershipCta.apply')}</ButtonLink>
            <ButtonLink href={href('/contact')} variant="outline">{t('home.membershipCta.contact')}</ButtonLink>
          </div>
        </Container>
      </section>

      <section className="section-pad bg-white" aria-labelledby="events-heading">
        <Container>
          <SectionHeading
            eyebrow={t('home.events.eyebrow')}
            title={t('home.events.title')}
            description={t('home.events.description')}
            headingId="events-heading"
            action={<ButtonLink href={href('/events')} variant="outline">{t('common.viewAll')}</ButtonLink>}
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {events.slice(0, 3).map((event) => {
              const category = eventTypes.find((item) => item.value === event.category);
              const title = translated(t, event as KeyedText, 'title');
              return (
                <article key={event.id} className="card-lift overflow-hidden rounded-2xl border border-line bg-white shadow-card">
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                    <Image src={webp(event.image)} alt={translated(t, event as KeyedText, 'imageAlt')} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition duration-300 hover:scale-[1.02]" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[0.68rem] font-extrabold uppercase tracking-[0.08em] text-industry-700 shadow-sm">{category ? t(category.labelKey) : event.category}</span>
                  </div>
                  <div className="p-6">
                    <p className="flex items-center gap-2 text-xs font-bold text-slate-500"><CalendarDays aria-hidden="true" className="size-4 text-accent-600" /> {dateFormatter.format(new Date(`${event.date}T00:00:00`))}</p>
                    <h3 className="mt-3 text-xl font-extrabold leading-7 text-navy-800">{title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">{translated(t, event as KeyedText, 'description')}</p>
                    <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-500"><MapPin aria-hidden="true" className="size-4" /> {translated(t, event as KeyedText, 'location')}</p>
                    <Link
                      aria-label={`${t('common.viewDetails')}: ${title}`}
                      className="mt-5 inline-flex min-h-11 items-center gap-1.5 rounded-md text-sm font-bold text-industry-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-industry-600 focus-visible:ring-offset-2"
                      href={href(`/events/${event.slug}`)}
                    >
                      {t('common.viewDetails')} <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section-pad bg-surface" aria-labelledby="documents-heading">
        <Container>
          <SectionHeading
            eyebrow={t('resources.eyebrow')}
            title={t('resources.title')}
            description={t('resources.description')}
            headingId="documents-heading"
            action={<ButtonLink href={href('/resources')} variant="outline">{t('common.viewAll')}</ButtonLink>}
          />
          <div className="mt-9 overflow-hidden rounded-2xl border border-line bg-white">
            {documents.slice(0, 4).map((document, index) => (
              <article key={document.id} className={`grid gap-4 p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center ${index ? 'border-t border-line' : ''}`}>
                <span className="grid size-11 place-items-center rounded-xl bg-sky-50 text-industry-600"><FileText aria-hidden="true" className="size-5" /></span>
                <div>
                  <h3 className="font-extrabold text-navy-800">{translated(t, document as KeyedText, 'title')}</h3>
                  <p className="mt-1 text-xs text-muted">{document.fileType} · {dateFormatter.format(new Date(`${document.date}T00:00:00`))}</p>
                </div>
                <span className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-line px-4 text-xs font-bold text-slate-400" aria-disabled="true">
                  <FileDown aria-hidden="true" className="size-4" /> {t('common.unavailable')}
                </span>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="subtle-grid bg-navy-900 py-18 text-white">
        <Container className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-3xl">
            <h2 className="text-balance text-3xl font-extrabold tracking-[-0.035em] sm:text-4xl">{t('home.finalCta.title')}</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">{t('home.finalCta.description')}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <ButtonLink href={href('/legal-assistance')} size="lg">{t('home.finalCta.join')}</ButtonLink>
            <ButtonLink href={href('/resources')} variant="light" size="lg">{t('home.finalCta.contact')}</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
