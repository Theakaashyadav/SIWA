import type {Metadata} from 'next';
import {Clock3, Mail, Map, MapPin, MessageSquareText, Phone, ShieldCheck} from 'lucide-react';
import {setRequestLocale} from 'next-intl/server';
import {PageHero} from '@/components/PageHero';
import {ContactForm} from '@/components/interactive/ContactForm';
import {ButtonLink, Container} from '@/components/ui';
import {siteConfig} from '@/config/site';

type PageProps = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'hi' ? 'संपर्क करें' : 'Contact SIWA',
    description: locale === 'hi'
      ? 'विधिक जानकारी, पेशेवर नेटवर्क, कार्यक्रम या सामान्य प्रश्न के लिए SIWA विधिक सहायता से संपर्क करें।'
      : 'Contact SIWA Legal Support about legal information, the professional network, programmes or a general enquiry.',
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {en: '/en/contact', hi: '/hi/contact'},
    },
  };
}

export default async function ContactPage({params}: PageProps) {
  const {locale} = await params;
  setRequestLocale(locale);
  const hi = locale === 'hi';
  const copy = hi
    ? {
        eyebrow: 'सेवा संपर्क', title: 'SIWA विधिक सहायता से संपर्क करें', home: 'मुखपृष्ठ',
        description: 'विधिक जानकारी, संसाधन, जागरूकता कार्यक्रम या पेशेवर नेटवर्क से जुड़े सामान्य प्रश्न के लिए संपर्क करें। कानूनी समस्या के लिए समर्पित सहायता अनुरोध फ़ॉर्म का उपयोग करें।',
        info: 'संपर्क जानकारी', address: 'कार्यालय का पता', phone: 'फोन', email: 'ईमेल', hours: 'कार्यालय समय',
        formTitle: 'सामान्य पूछताछ भेजें', formText: 'नीचे दिए गए फ़ॉर्म को भरें। यह वेबसाइट पूर्वावलोकन जानकारी की जाँच करता है, पर अभी किसी सर्वर पर संदेश नहीं भेजता। गोपनीय दस्तावेज़ शामिल न करें।',
        mapTitle: 'कार्यालय का स्थान', mapText: 'वास्तविक SIWA कार्यालय पता या निर्देशांक मिलने पर मानचित्र यहाँ दिखाई देगा।', mapPlaceholder: 'मानचित्र स्थान अभी कॉन्फ़िगर नहीं किया गया है',
        verificationTitle: 'सत्यापित सेवा संपर्क', verificationText: 'SIWA द्वारा अनुमोदित कार्यालय पता, फोन और ईमेल सत्यापन के बाद यहाँ प्रकाशित किए जाएँगे।',
        assistanceCta: 'विधिक सहायता का अनुरोध करें',
      }
    : {
        eyebrow: 'Service contact', title: 'Contact SIWA Legal Support', home: 'Home',
        description: 'Contact us with a general question about legal information, resources, awareness programmes or the professional network. Use the dedicated assistance form for a legal issue.',
        info: 'Contact information', address: 'Office address', phone: 'Phone', email: 'Email', hours: 'Office hours',
        formTitle: 'Send a general enquiry', formText: 'Complete the form below. This website preview validates your details, but does not send them to a server yet. Do not include confidential documents.',
        mapTitle: 'Office location', mapText: 'A map will appear here after the verified SIWA office address or coordinates are supplied.', mapPlaceholder: 'Map location is not configured yet',
        verificationTitle: 'Verified service contacts', verificationText: 'SIWA-approved office, phone and email details will be published here as soon as verification is complete.',
        assistanceCta: 'Request legal assistance',
      };

  const details = [
    {icon: MapPin, label: copy.address, value: siteConfig.contact.address},
    {icon: Phone, label: copy.phone, value: siteConfig.contact.phone},
    {icon: Mail, label: copy.email, value: siteConfig.contact.email},
    {icon: Clock3, label: copy.hours, value: siteConfig.contact.officeHours},
  ];
  const hasVerifiedContact = !siteConfig.isPlaceholder;

  return (
    <>
      <PageHero eyebrow={copy.eyebrow} title={copy.title} description={copy.description} breadcrumbs={[{label: copy.home, href: `/${locale}`}, {label: copy.title}]} actions={<ButtonLink href={`/${locale}/legal-assistance`} size="lg">{copy.assistanceCta}</ButtonLink>} />
      <section className="section-pad bg-surface">
        <Container className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12">
          <aside className="rounded-2xl bg-navy-800 p-6 text-white shadow-xl sm:p-8">
            <h2 className="text-2xl font-extrabold">{copy.info}</h2>
            {hasVerifiedContact ? (
              <div className="mt-7 space-y-6">
                {details.map(({icon: Icon, label, value}) => (
                  <div key={label} className="flex gap-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-sky-300"><Icon aria-hidden="true" className="size-5" /></span>
                    <div><h3 className="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-300">{label}</h3><p className="mt-1 text-sm font-semibold">{value}</p></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-7 rounded-2xl border border-white/12 bg-white/[0.06] p-5">
                <span className="grid size-11 place-items-center rounded-xl bg-white/10 text-sky-300">
                  <ShieldCheck aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-4 font-extrabold text-white">{copy.verificationTitle}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{copy.verificationText}</p>
                <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-xs font-semibold text-slate-300">
                  <MessageSquareText aria-hidden="true" className="size-4 text-sky-300" />
                  {copy.formTitle}
                </div>
              </div>
            )}
          </aside>
          <div className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8 lg:p-10">
            <h2 className="text-2xl font-extrabold text-navy-800 sm:text-3xl">{copy.formTitle}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{copy.formText}</p>
            <ContactForm locale={locale} className="mt-8" />
          </div>
        </Container>
      </section>
      {siteConfig.contact.mapEmbedUrl ? <section className="bg-white py-16">
        <Container>
          <div className="grid overflow-hidden rounded-2xl border border-line bg-surface lg:grid-cols-[0.75fr_1.25fr]">
            <div className="p-7 sm:p-10">
              <Map aria-hidden="true" className="size-8 text-industry-600" />
              <h2 className="mt-5 text-2xl font-extrabold text-navy-800">{copy.mapTitle}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{copy.mapText}</p>
            </div>
            <iframe
              allowFullScreen
              className="h-80 min-h-72 w-full border-0 lg:h-full lg:min-h-80 lg:border-l lg:border-line"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              sandbox="allow-scripts allow-same-origin allow-popups"
              src={siteConfig.contact.mapEmbedUrl}
              title={copy.mapTitle}
            />
          </div>
        </Container>
      </section> : null}
    </>
  );
}
