import type {Metadata} from 'next';
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  FileSearch,
  Scale,
  ShieldAlert,
} from 'lucide-react';
import {setRequestLocale} from 'next-intl/server';
import {PageHero} from '@/components/PageHero';
import {LegalAssistanceForm} from '@/components/interactive/LegalAssistanceForm';
import {Container, SectionHeading} from '@/components/ui';

type PageProps = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  const hi = locale === 'hi';
  return {
    title: hi ? 'विधिक सहायता का अनुरोध करें' : 'Request Legal Assistance',
    description: hi
      ? 'अपने उद्योग से जुड़ी कानूनी समस्या का प्रारंभिक विवरण SIWA विधिक सहायता के साथ साझा करें।'
      : 'Share an initial summary of your industry-related legal issue with SIWA Legal Support.',
    alternates: {
      canonical: `/${locale}/legal-assistance`,
      languages: {en: '/en/legal-assistance', hi: '/hi/legal-assistance'},
    },
  };
}

export default async function LegalAssistancePage({params}: PageProps) {
  const {locale} = await params;
  setRequestLocale(locale);
  const hi = locale === 'hi';
  const copy = hi
    ? {
        eyebrow: 'प्रारंभिक कानूनी संपर्क',
        title: 'विधिक सहायता का अनुरोध करें',
        description:
          'अपने उद्योग से जुड़ी कानूनी समस्या का संक्षिप्त विवरण भेजें। यह केवल प्रारंभिक संपर्क है; इससे अधिवक्ता–मुवक्किल संबंध या प्रतिनिधित्व स्वतः स्थापित नहीं होता।',
        home: 'मुखपृष्ठ',
        formEyebrow: 'सुरक्षित शुरुआत',
        formTitle: 'अपनी कानूनी समस्या साझा करें',
        formDescription:
          'केवल वह प्रारंभिक जानकारी दें जो उपयुक्त विधिक पेशेवर और अगले कदम की पहचान करने के लिए आवश्यक हो।',
        process: [
          ['प्रारंभिक अनुरोध', 'समस्या, संबंधित पक्ष और समय-सीमा का संक्षिप्त विवरण दें।'],
          ['समीक्षा व हित-संघर्ष जाँच', 'उपलब्धता और हित-संघर्ष जाँच के बाद अनुरोध आगे बढ़ाया जा सकता है।'],
          ['औपचारिक स्वीकृति', 'कार्य-क्षेत्र, शुल्क और प्रतिनिधित्व केवल अलग लिखित स्वीकृति के बाद तय होंगे।'],
        ],
        urgentTitle: 'क्या कोई समय-सीमा निकट है?',
        urgentText:
          'यदि नोटिस का जवाब, सुनवाई या वैधानिक समय-सीमा निकट है, तो इस फ़ॉर्म के उत्तर की प्रतीक्षा न करें। तुरंत योग्य अधिवक्ता से संपर्क करें।',
        privacyTitle: 'प्रारंभिक फ़ॉर्म में दस्तावेज़ न भेजें',
        privacyText:
          'गोपनीय, विशेषाधिकार-प्राप्त या अत्यधिक संवेदनशील सामग्री साझा न करें। सुरक्षित माध्यम की पुष्टि के बाद ही दस्तावेज़ भेजें।',
        statusTitle: 'वेबसाइट पूर्वावलोकन',
        statusText:
          'यह फ़ॉर्म अभी किसी बैकएंड से जुड़ा नहीं है। परीक्षण के दौरान भरी गई जानकारी प्रेषित या संग्रहीत नहीं होती।',
        safeguardsTitle: 'अनुरोध भेजने से पहले',
        safeguards: [
          'अनुरोध भेजना किसी मामले की स्वीकृति या परिणाम की गारंटी नहीं है।',
          'अधिवक्ता–मुवक्किल संबंध केवल स्पष्ट लिखित स्वीकृति के बाद स्थापित होगा।',
          'ऑनलाइन अनुरोध किसी कानूनी या वैधानिक समय-सीमा को नहीं रोकता।',
        ],
      }
    : {
        eyebrow: 'Initial legal contact',
        title: 'Request Legal Assistance',
        description:
          'Share a brief summary of your industry-related legal issue. This is an initial contact only; submitting it does not by itself create an advocate–client relationship or confirm representation.',
        home: 'Home',
        formEyebrow: 'A careful first step',
        formTitle: 'Share your legal concern',
        formDescription:
          'Provide only the initial information needed to identify a suitable legal professional and possible next step.',
        process: [
          ['Initial request', 'Summarise the issue, relevant parties and any deadline.'],
          ['Review and conflict check', 'The request may proceed after availability and conflict checks.'],
          ['Formal acceptance', 'Scope, fees and representation are confirmed only through separate written acceptance.'],
        ],
        urgentTitle: 'Is a deadline approaching?',
        urgentText:
          'If a notice response, hearing or statutory deadline is close, do not wait for a reply to this form. Contact a qualified advocate immediately.',
        privacyTitle: 'Do not send documents in the initial form',
        privacyText:
          'Do not share confidential, privileged or highly sensitive material. Send documents only after a secure method has been confirmed.',
        statusTitle: 'Website preview',
        statusText:
          'This form is not connected to a backend yet. Information entered during testing is not transmitted or stored.',
        safeguardsTitle: 'Before you submit',
        safeguards: [
          'Submitting a request does not guarantee acceptance or any outcome.',
          'An advocate–client relationship begins only after explicit written acceptance.',
          'An online request does not pause a legal or statutory deadline.',
        ],
      };

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        breadcrumbs={[
          {label: copy.home, href: `/${locale}`},
          {label: copy.title},
        ]}
        aside={
          <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-6 backdrop-blur-sm">
            <Scale aria-hidden="true" className="size-10 text-sky-300" />
            <ol className="mt-5 space-y-4">
              {copy.process.map(([title, text], index) => (
                <li className="flex gap-3" key={title}>
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent-500 text-xs font-black text-navy-950">{index + 1}</span>
                  <span><strong className="block text-sm text-white">{title}</strong><span className="mt-1 block text-xs leading-5 text-slate-300">{text}</span></span>
                </li>
              ))}
            </ol>
          </div>
        }
      />

      <section className="section-pad bg-surface" aria-labelledby="legal-request-form-title">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
            <div className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-9">
              <SectionHeading
                eyebrow={copy.formEyebrow}
                title={copy.formTitle}
                description={copy.formDescription}
                headingId="legal-request-form-title"
              />
              <LegalAssistanceForm locale={locale} className="mt-9" />
            </div>

            <aside className="space-y-5 lg:sticky lg:top-32">
              <Notice icon={AlertTriangle} title={copy.urgentTitle} text={copy.urgentText} tone="amber" />
              <Notice icon={ShieldAlert} title={copy.privacyTitle} text={copy.privacyText} tone="blue" />
              <Notice icon={FileSearch} title={copy.statusTitle} text={copy.statusText} tone="neutral" />
              <div className="rounded-2xl bg-navy-900 p-6 text-white">
                <ClipboardList aria-hidden="true" className="size-7 text-sky-300" />
                <h2 className="mt-4 text-lg font-extrabold">{copy.safeguardsTitle}</h2>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                  {copy.safeguards.map((item) => (
                    <li className="flex gap-2.5" key={item}>
                      <CheckCircle2 aria-hidden="true" className="mt-1 size-4 shrink-0 text-accent-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}

function Notice({icon: Icon, title, text, tone}: {icon: typeof AlertTriangle; title: string; text: string; tone: 'amber' | 'blue' | 'neutral'}) {
  const styles = {
    amber: 'border-amber-200 bg-amber-50 text-amber-950 [&_svg]:text-amber-700',
    blue: 'border-sky-200 bg-sky-50 text-navy-800 [&_svg]:text-industry-600',
    neutral: 'border-line bg-white text-slate-700 [&_svg]:text-slate-500',
  }[tone];
  return (
    <div className={`rounded-2xl border p-5 ${styles}`}>
      <Icon aria-hidden="true" className="size-6" />
      <h2 className="mt-3 font-extrabold">{title}</h2>
      <p className="mt-2 text-sm leading-6">{text}</p>
    </div>
  );
}
