import type {Metadata} from 'next';
import {Camera, Info} from 'lucide-react';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {PageHero} from '@/components/PageHero';
import {GalleryExplorer, type GalleryEntry} from '@/components/interactive/GalleryExplorer';
import {Container} from '@/components/ui';
import {galleryCategories, galleryItems} from '@/data/gallery';

type PageProps = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'hi' ? 'विधिक जागरूकता एवं संवाद गैलरी' : 'Legal Awareness & Outreach Gallery',
    description: locale === 'hi'
      ? 'SIWA के विधिक जागरूकता सत्रों, अनुपालन कार्यशालाओं और पेशेवर संवाद के लिए तैयार गैलरी।'
      : 'A gallery prepared for SIWA legal-awareness sessions, compliance workshops and professional outreach.',
    alternates: {
      canonical: `/${locale}/gallery`,
      languages: {en: '/en/gallery', hi: '/hi/gallery'},
    },
  };
}

export default async function GalleryPage({params}: PageProps) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale});
  const hi = locale === 'hi';
  const copy = hi
    ? {
        eyebrow: 'विधिक जागरूकता और संवाद', title: 'SIWA विधिक गतिविधि गैलरी',
        description: 'विधिक जागरूकता सत्रों, अनुपालन कार्यशालाओं और पेशेवर नेटवर्क गतिविधियों की तस्वीरें देखें।',
        home: 'मुखपृष्ठ', note: 'इस पूर्वावलोकन में केवल उदाहरण तस्वीरें हैं; ये वास्तविक SIWA कार्यक्रम या उपस्थित व्यक्ति नहीं दर्शातीं। उत्पादन में केवल सहमति-प्राप्त, सत्यापित तस्वीरें प्रकाशित की जानी चाहिए। किसी व्यक्ति या प्राधिकरण की उपस्थिति समर्थन या आधिकारिक संबद्धता नहीं दर्शाती।',
      }
    : {
        eyebrow: 'Legal awareness & outreach', title: 'SIWA Legal Activities Gallery',
        description: 'Explore photographs from legal-awareness sessions, compliance workshops and professional-network activities.',
        home: 'Home', note: 'This preview contains illustrative images only; they do not depict real SIWA activities or attendees. Production must use verified, consented photographs. The presence of a person or authority does not imply endorsement or official affiliation.',
      };

  const translatedCategories = galleryCategories
    .filter((item) => item.value !== 'all')
    .map((item) => ({value: item.value, label: t(item.labelKey)}));
  const categoryLabels = Object.fromEntries(
    translatedCategories.map((category) => [category.value, category.label]),
  );

  const entries: GalleryEntry[] = galleryItems.map((item) => ({
    id: item.id,
    title: t(item.titleKey),
    description: item.descriptionKey ? t(item.descriptionKey) : item.description,
    category: item.category,
    categoryLabel: categoryLabels[item.category],
    date: item.date,
    image: item.image.replace(/\.png$/, '.webp'),
    alt: t(item.altKey),
  }));

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        breadcrumbs={[{label: copy.home, href: `/${locale}`}, {label: copy.title}]}
        aside={<Camera aria-hidden="true" className="size-20 text-sky-300/80" />}
      />
      <section className="section-pad bg-surface">
        <Container>
          <div className="mb-8 flex gap-3 rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm leading-6 text-navy-800">
            <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-industry-600" />
            <p>{copy.note}</p>
          </div>
          <GalleryExplorer
            items={entries}
            locale={locale}
            categories={translatedCategories}
          />
        </Container>
      </section>
    </>
  );
}
