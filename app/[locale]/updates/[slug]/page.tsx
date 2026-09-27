import type {Metadata} from 'next';
import Image from 'next/image';
import {notFound} from 'next/navigation';
import {ArrowLeft, CalendarDays, ExternalLink, Info, Mail, Share2} from 'lucide-react';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Badge, ButtonLink, Container} from '@/components/ui';
import {resolvedSiteUrl} from '@/config/site';
import {industryUpdates} from '@/data/updates';
import type {UpdateCategory} from '@/types';

type PageProps = {params: Promise<{locale: string; slug: string}>};

const categoryKey: Record<UpdateCategory, string> = {
  policy: 'updates.categories.policy',
  'government-announcement': 'updates.categories.announcements',
  'msme-news': 'updates.categories.msme',
  'industrial-development': 'updates.categories.development',
  regulatory: 'updates.categories.regulatory',
  training: 'updates.categories.training',
};

export function generateStaticParams() {
  return industryUpdates.map(({slug}) => ({slug}));
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale, slug} = await params;
  const update = industryUpdates.find((item) => item.slug === slug);
  if (!update) {
    return {
      title: locale === 'hi' ? 'अपडेट नहीं मिला' : 'Update not found',
      robots: {index: false, follow: false},
    };
  }
  const t = await getTranslations({locale});
  const title = t(update.titleKey);
  const description = t(update.excerptKey);
  const image = (update.image ?? '/images/siwa-industrial-estate.webp').replace(/\.png$/, '.webp');
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/updates/${slug}`,
      languages: {
        en: `/en/updates/${slug}`,
        hi: `/hi/updates/${slug}`,
      },
    },
    robots: update.isPlaceholder ? {index: false, follow: true} : undefined,
    openGraph: {
      type: 'article',
      title,
      description,
      locale: locale === 'hi' ? 'hi_IN' : 'en_IN',
      alternateLocale: locale === 'hi' ? ['en_IN'] : ['hi_IN'],
      publishedTime: `${update.publishedDate}T00:00:00+05:30`,
      images: [{url: image}],
    },
  };
}

export default async function UpdateDetailPage({params}: PageProps) {
  const {locale, slug} = await params;
  const update = industryUpdates.find((item) => item.slug === slug);
  if (!update) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({locale});
  const hi = locale === 'hi';
  const title = t(update.titleKey);
  const excerpt = t(update.excerptKey);
  const image = (update.image ?? '/images/siwa-industrial-estate.webp').replace(/\.png$/, '.webp');
  const date = new Intl.DateTimeFormat(hi ? 'hi-IN' : 'en-IN', {day: '2-digit', month: 'long', year: 'numeric'}).format(new Date(`${update.publishedDate}T00:00:00`));
  const canonicalUrl = `${resolvedSiteUrl}/${locale}/updates/${slug}`;
  const shareUrl = encodeURIComponent(canonicalUrl);
  const shareTitle = encodeURIComponent(title);
  const bodyLocale = hi ? 'hi' : 'en';
  const contentSections = update.contentSections.map((section) => ({
    id: section.id,
    heading: section.heading[bodyLocale],
    paragraphs: section.paragraphs.map((paragraph) => paragraph[bodyLocale]),
  }));

  const copy = hi
    ? {
        back: 'सभी कानूनी अपडेट देखें', sample: 'प्रदर्शन कानूनी लेख', published: 'प्रकाशित',
        warning: 'यह उदाहरण लेख किसी वास्तविक नीति या घोषणा की रिपोर्ट नहीं है। प्रकाशन से पहले सामग्री, तारीख और आधिकारिक स्रोत की पुष्टि आवश्यक है।',
        legalNotice: 'सामान्य जानकारी — व्यक्तिगत कानूनी सलाह नहीं',
        legalNoticeText: 'यह लेख केवल सामान्य जानकारी और जागरूकता के लिए है; यह आपकी परिस्थितियों के अनुसार कानूनी सलाह नहीं है। लागू कानून, अधिसूचना और प्रभावी तारीख को आधिकारिक स्रोत से जाँचें। इस पृष्ठ को पढ़ने या पूछताछ भेजने से कोई कानूनी समय-सीमा नहीं रुकती। कोई कदम उठाने से पहले अपने मामले की समीक्षा करने वाले योग्य अधिवक्ता या कानूनी पेशेवर से पुष्टि लें।',
        verify: 'आधिकारिक स्रोत से सत्यापित करें',
        verifyText: 'किसी कानून, नीति, योजना या अनुपालन आवश्यकता पर कार्य करने से पहले मूल अधिसूचना, नवीनतम संशोधन, लागू तारीख और अपने उद्योग पर उसके प्रभाव की जाँच करें। आवश्यक होने पर लिखित रूप से नियुक्त कानूनी पेशेवर से सलाह लें।',
        source: 'आधिकारिक / मूल स्रोत', awaiting: 'सत्यापित स्रोत लिंक प्रकाशन की प्रतीक्षा में है।',
        share: 'यह अपडेट साझा करें', email: 'ईमेल द्वारा साझा करें', linkedin: 'LinkedIn पर साझा करें', whatsapp: 'WhatsApp पर साझा करें',
      }
    : {
        back: 'View all legal updates', sample: 'Demonstration legal article', published: 'Published',
        warning: 'This sample article does not report a real policy or announcement. Its content, date and official source must be verified before publication.',
        legalNotice: 'General information — not individual legal advice',
        legalNoticeText: 'This article is for general information and awareness only; it is not legal advice tailored to your circumstances. Check the applicable law, notification and effective date against an official source. Reading this page or sending an enquiry does not pause a legal deadline. Before acting, obtain confirmation from a qualified advocate or legal professional who has reviewed your matter.',
        verify: 'Verify with the official source',
        verifyText: 'Before acting on a law, policy, scheme or compliance requirement, review the original notification, latest amendments, effective date and its application to your enterprise. Obtain advice from a formally engaged legal professional where needed.',
        source: 'Official / original source', awaiting: 'A verified source link is awaiting publication.',
        share: 'Share this update', email: 'Share by email', linkedin: 'Share on LinkedIn', whatsapp: 'Share on WhatsApp',
      };

  return (
    <article className="bg-white">
      <header className="bg-navy-900 py-14 text-white sm:py-20">
        <Container>
          <ButtonLink href={`/${locale}/updates`} variant="light" size="sm" leadingIcon={<ArrowLeft className="size-4" />}>
            {copy.back}
          </ButtonLink>
          <div className="mt-8 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="orange">{copy.sample}</Badge>
              <Badge tone="blue">{t(categoryKey[update.category])}</Badge>
              <span className="inline-flex items-center gap-2 text-sm text-slate-300"><CalendarDays aria-hidden="true" className="size-4" /> {copy.published}: {date}</span>
            </div>
            <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.12] tracking-[-0.035em] sm:text-5xl lg:text-6xl">{title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">{excerpt}</p>
          </div>
        </Container>
      </header>

      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
          <div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-surface">
              <Image src={image} alt="" fill priority sizes="(max-width: 1024px) 100vw, 70vw" className="object-cover" />
            </div>
            <div className="mt-7 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950" role="note">
              <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0" /><p>{copy.warning}</p>
            </div>
            <div className="mt-4 rounded-xl border border-sky-200 bg-sky-50 p-5 text-sky-950" role="note">
              <h2 className="font-extrabold">{copy.legalNotice}</h2>
              <p className="mt-2 text-sm leading-7">{copy.legalNoticeText}</p>
            </div>
            <div className="prose prose-slate mt-10 max-w-none">
              {contentSections.map((section, index) => (
                <section className={index ? 'mt-9' : undefined} key={section.id}>
                  <h2 className="text-2xl font-extrabold text-navy-800 sm:text-3xl">{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p className="mt-4 text-base leading-8 text-slate-700" key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}
              <div className="mt-8 rounded-2xl border-l-4 border-accent-500 bg-surface p-6">
                <h2 className="text-xl font-extrabold text-navy-800">{copy.verify}</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">{copy.verifyText}</p>
              </div>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-line bg-surface p-5">
              <h2 className="text-sm font-extrabold uppercase tracking-[0.12em] text-navy-800">{copy.source}</h2>
              {update.sourceUrl ? (
                <a href={update.sourceUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 font-bold text-industry-600 hover:underline">
                  {update.sourceLabel ?? t('schemes.officialSource')} <ExternalLink aria-hidden="true" className="size-4" />
                </a>
              ) : <p className="mt-3 text-sm leading-6 text-slate-600">{copy.awaiting}</p>}
            </div>
            <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
              <h2 className="flex items-center gap-2 font-extrabold text-navy-800"><Share2 aria-hidden="true" className="size-5 text-industry-600" /> {copy.share}</h2>
              <div className="mt-4 grid gap-2">
                <ShareLink href={`mailto:?subject=${shareTitle}&body=${shareUrl}`} label={copy.email} icon={<Mail className="size-4" />} />
                <ShareLink href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} label={copy.linkedin} />
                <ShareLink href={`https://wa.me/?text=${shareTitle}%20${shareUrl}`} label={copy.whatsapp} />
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </article>
  );
}

function ShareLink({href, label, icon}: {href: string; label: string; icon?: React.ReactNode}) {
  return <a href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel={href.startsWith('mailto:') ? undefined : 'noreferrer'} className="inline-flex min-h-11 items-center justify-between gap-3 rounded-lg border border-line px-4 text-sm font-bold text-navy-800 transition hover:border-industry-600 hover:bg-sky-50">{label}{icon ?? <ExternalLink aria-hidden="true" className="size-4 text-industry-600" />}</a>;
}
