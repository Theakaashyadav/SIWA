import type {Metadata} from 'next';
import Image from 'next/image';
import {notFound} from 'next/navigation';
import {ArrowLeft, CalendarDays, CircleAlert, Images, MapPin} from 'lucide-react';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Badge, ButtonLink, Container} from '@/components/ui';
import {events} from '@/data/events';
import type {EventCategory} from '@/types';

type PageProps = {params: Promise<{locale: string; slug: string}>};

const categoryKey: Record<EventCategory, string> = {
  'government-meeting': 'events.categories.governmentMeeting',
  'industry-seminar': 'events.categories.industrySeminar',
  'training-session': 'events.categories.trainingSession',
  exhibition: 'events.categories.exhibition',
  'member-networking': 'events.categories.memberNetworking',
  'awareness-program': 'events.categories.awarenessProgram',
};

export function generateStaticParams() {
  return events.map(({slug}) => ({slug}));
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale, slug} = await params;
  const event = events.find((item) => item.slug === slug);
  if (!event) {
    return {
      title: locale === 'hi' ? 'कार्यक्रम नहीं मिला' : 'Event not found',
      robots: {index: false, follow: false},
    };
  }
  const t = await getTranslations({locale});
  return {
    title: t(event.titleKey),
    description: t(event.descriptionKey),
    alternates: {
      canonical: `/${locale}/events/${slug}`,
      languages: {
        en: `/en/events/${slug}`,
        hi: `/hi/events/${slug}`,
      },
    },
    robots: event.isPlaceholder ? {index: false, follow: true} : undefined,
    openGraph: {
      title: t(event.titleKey),
      description: t(event.descriptionKey),
      locale: locale === 'hi' ? 'hi_IN' : 'en_IN',
      alternateLocale: locale === 'hi' ? ['en_IN'] : ['hi_IN'],
      images: [{url: event.image.replace(/\.png$/, '.webp')}],
    },
  };
}

export default async function EventDetailPage({params}: PageProps) {
  const {locale, slug} = await params;
  const event = events.find((item) => item.slug === slug);
  if (!event) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({locale});
  const hi = locale === 'hi';
  const date = new Intl.DateTimeFormat(hi ? 'hi-IN' : 'en-IN', {weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'}).format(new Date(`${event.date}T00:00:00`));
  const image = event.image.replace(/\.png$/, '.webp');
  const copy = hi
    ? {
        back: 'सभी कानूनी सत्र देखें', sample: 'उदाहरण कानूनी सत्र', overview: 'सत्र का परिचय',
        notice: 'यह वेबसाइट प्रदर्शन के लिए बनाया गया कार्यक्रम पृष्ठ है। तारीख, स्थान और कार्यक्रम की पुष्टि SIWA द्वारा किए जाने तक इसे वास्तविक घोषणा न मानें।',
        educationNotice: 'शैक्षणिक सत्र, व्यक्तिगत कानूनी सलाह नहीं',
        educationNoticeText: 'यह सामूहिक जागरूकता सत्र सामान्य शिक्षा के लिए है। प्रस्तुति सुनना, पंजीकरण करना या प्रश्न पूछना आपके मामले पर व्यक्तिगत कानूनी सलाह, अधिवक्ता–मुवक्किल संबंध या प्रतिनिधित्व स्थापित नहीं करता। व्यक्तिगत समस्या के लिए ऐसे योग्य अधिवक्ता से अलग सलाह लें जो हित-संघर्ष जाँच के बाद मामला लिखित रूप से स्वीकार करे।',
        details: 'सत्र विवरण', date: 'तारीख', location: 'स्थान', category: 'श्रेणी',
        participation: 'सत्र में भाग लेना चाहते हैं?', participationText: 'पुष्ट समय-सारणी और पंजीकरण के लिए SIWA से संपर्क करें। भागीदारी को किसी मामले की पेशेवर स्वीकृति न समझें।',
        contact: 'कानूनी सहायता हेतु संपर्क करें', gallery: 'गैलरी देखें',
      }
    : {
        back: 'View all legal sessions', sample: 'Sample legal session', overview: 'Session overview',
        notice: 'This event page is prepared for the website demonstration. Do not treat the date, venue or programme as an announcement until SIWA confirms it.',
        educationNotice: 'Educational session, not individual legal advice',
        educationNoticeText: 'This group awareness session is for general education. Attending a presentation, registering or asking a question does not provide advice on your matter, create an advocate–client relationship or establish representation. For an individual issue, seek separate advice from a qualified advocate who accepts the matter in writing after conflict checks.',
        details: 'Session details', date: 'Date', location: 'Location', category: 'Category',
        participation: 'Interested in this session?', participationText: 'Contact SIWA for a confirmed schedule and registration details. Participation is not professional acceptance of any matter.',
        contact: 'Request legal support', gallery: 'View Gallery',
      };

  return (
    <article>
      <header className="relative isolate overflow-hidden bg-navy-950 text-white">
        <Image src={image} alt={t(event.imageAltKey)} fill priority sizes="100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,40,63,.98),rgba(8,40,63,.86)_55%,rgba(8,40,63,.45))]" />
        <Container className="py-14 sm:py-20 lg:py-24">
          <ButtonLink href={`/${locale}/events`} variant="light" size="sm" leadingIcon={<ArrowLeft className="size-4" />}>{copy.back}</ButtonLink>
          <div className="mt-8 max-w-3xl">
            <Badge tone="orange">{copy.sample}</Badge>
            <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.1] tracking-[-0.035em] sm:text-5xl lg:text-6xl">{t(event.titleKey)}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">{t(event.descriptionKey)}</p>
          </div>
        </Container>
      </header>

      <section className="section-pad bg-surface">
        <Container className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:gap-12">
          <div className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-9">
            <h2 className="text-2xl font-extrabold text-navy-800">{copy.overview}</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">{t(event.descriptionKey)}</p>
            <div className="mt-7 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950" role="note">
              <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" /><p>{copy.notice}</p>
            </div>
            <div className="mt-4 rounded-xl border border-sky-200 bg-sky-50 p-5 text-sky-950" role="note">
              <h2 className="font-extrabold">{copy.educationNotice}</h2>
              <p className="mt-2 text-sm leading-7">{copy.educationNoticeText}</p>
            </div>
            <div className="mt-8 rounded-2xl bg-navy-800 p-6 text-white sm:p-8">
              <h2 className="text-xl font-extrabold">{copy.participation}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-200">{copy.participationText}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={`/${locale}/contact`}>{copy.contact}</ButtonLink>
                <ButtonLink href={`/${locale}/gallery`} variant="light" leadingIcon={<Images className="size-4" />}>{copy.gallery}</ButtonLink>
              </div>
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-line bg-white p-6 shadow-card">
            <h2 className="text-lg font-extrabold text-navy-800">{copy.details}</h2>
            <dl className="mt-6 space-y-5">
              <Detail icon={<CalendarDays />} label={copy.date} value={date} />
              <Detail icon={<MapPin />} label={copy.location} value={t(event.locationKey)} />
              <Detail icon={<Images />} label={copy.category} value={t(categoryKey[event.category])} />
            </dl>
          </aside>
        </Container>
      </section>
    </article>
  );
}

function Detail({icon, label, value}: {icon: React.ReactNode; label: string; value: string}) {
  return (
    <div>
      <dt className="flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.1em] text-slate-500">
        <span className="text-industry-600 [&>svg]:size-5" aria-hidden="true">{icon}</span>
        {label}
      </dt>
      <dd className="ml-8 mt-1 text-sm font-bold leading-6 text-navy-800">{value}</dd>
    </div>
  );
}
