import { ArrowRight, Info, Scale, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/PageHero";
import { LegalProfessionalDirectory } from "@/components/interactive/LegalProfessionalDirectory";
import { ButtonLink, Container } from "@/components/ui";
import {
  activeLegalProfessionals,
  localizeLegalProfessional,
} from "@/data/legal-professionals";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isHindi = locale === "hi";

  return {
    title: isHindi ? "विधिक पेशेवर नेटवर्क" : "Legal Professionals Network",
    description: isHindi
      ? "औद्योगिक, वाणिज्यिक, श्रम और अनुपालन मामलों के लिए SIWA के विधिक पेशेवर नेटवर्क की प्रदर्शन निर्देशिका देखें।"
      : "Explore SIWA's demonstration directory for legal professionals supporting industrial, commercial, labour and compliance matters.",
    alternates: {
      canonical: `/${locale}/legal-professionals`,
      languages: {
        en: "/en/legal-professionals",
        hi: "/hi/legal-professionals",
      },
    },
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
  };
}

export default async function LegalProfessionalsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isHindi = locale === "hi";
  const professionals = activeLegalProfessionals.map((professional) =>
    localizeLegalProfessional(professional, locale),
  );
  const copy = isHindi
    ? {
        eyebrow: "उद्योगों के लिए विधिक सहयोग",
        title: "SIWA विधिक पेशेवर नेटवर्क",
        description:
          "सत्यापन के बाद औद्योगिक, वाणिज्यिक, श्रम और अनुपालन मामलों से जुड़े अधिवक्ताओं एवं अन्य विधिक पेशेवरों की जानकारी इस निर्देशिका में प्रकाशित की जा सकती है।",
        home: "मुखपृष्ठ",
        directoryAction: "विधिक पेशेवर देखें",
        profiles: "नमूना प्रोफ़ाइल",
        placeholderNotice:
          "दिखाई गई सभी प्रोफ़ाइल काल्पनिक प्रदर्शन रिकॉर्ड हैं। वे सत्यापित पेशेवर, नियुक्त पैनल सदस्य या SIWA की अनुशंसा नहीं हैं।",
        privacyTitle: "पेशेवर विवरण जिम्मेदारी से प्रकाशित किए जाते हैं",
        privacy:
          "व्यक्तिगत फोन नंबर और ईमेल सार्वजनिक नहीं किए जाते। किसी वास्तविक प्रोफ़ाइल को पहचान, पेशेवर प्रमाण और प्रकाशन-सहमति की पुष्टि के बाद ही जोड़ा जाना चाहिए।",
        ctaTitle: "क्या आपके उद्योग को कानूनी सहायता चाहिए?",
        ctaText:
          "अपनी समस्या का संक्षिप्त विवरण साझा करें। उपलब्धता, हित-संघर्ष जाँच और औपचारिक स्वीकृति के अधीन उपयुक्त विधिक पेशेवर आपसे संपर्क कर सकता है।",
        cta: "कानूनी सहायता का अनुरोध करें",
      }
    : {
        eyebrow: "Legal support for industry",
        title: "SIWA Legal Professionals Network",
        description:
          "After verification, this directory may publish information about advocates and other legal professionals working across industrial, commercial, labour and compliance matters.",
        home: "Home",
        directoryAction: "Explore legal professionals",
        profiles: "sample profiles",
        placeholderNotice:
          "Every profile shown is a fictional demonstration record. These are not verified professionals, appointed panel members, or SIWA endorsements.",
        privacyTitle: "Professional details, responsibly published",
        privacy:
          "Personal phone numbers and email addresses are not displayed publicly. A real profile should be added only after identity, professional credentials, and publication consent are confirmed.",
        ctaTitle: "Does your industry need legal assistance?",
        ctaText:
          "Share a brief summary of the issue. A suitable legal professional may contact you subject to availability, conflict checks and formal acceptance.",
        cta: "Request Legal Assistance",
      };

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        breadcrumbs={[
          { label: copy.home, href: `/${locale}` },
          { label: copy.title },
        ]}
        actions={
          <ButtonLink href="#legal-professionals-directory" size="lg">
            {copy.directoryAction}
          </ButtonLink>
        }
        aside={
          <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-6 shadow-2xl backdrop-blur-sm">
            <span className="flex size-11 items-center justify-center rounded-xl bg-accent-500 text-navy-950">
              <Scale aria-hidden="true" className="size-6" />
            </span>
            <p className="mt-4 text-3xl font-extrabold text-white">
              {professionals.length}
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-300">
              {copy.profiles}
            </p>
          </div>
        }
      />

      <section
        aria-labelledby="legal-professionals-heading"
        className="section-pad scroll-mt-36 bg-surface"
        id="legal-professionals-directory"
      >
        <Container>
          <div className="mb-8 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
            <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
            <p>{copy.placeholderNotice}</p>
          </div>
          <h2 className="sr-only" id="legal-professionals-heading">
            {copy.title}
          </h2>
          <LegalProfessionalDirectory
            locale={locale}
            pageSize={6}
            professionals={professionals}
          />
        </Container>
      </section>

      <section className="border-y border-line bg-white py-12">
        <Container className="flex items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-sky-50 text-industry-600">
            <ShieldCheck aria-hidden="true" className="size-5" />
          </span>
          <div>
            <h2 className="text-lg font-extrabold text-navy-800">
              {copy.privacyTitle}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              {copy.privacy}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-navy-800 py-14 text-white">
        <Container className="flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              {copy.ctaTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-slate-200">{copy.ctaText}</p>
          </div>
          <ButtonLink
            href={`/${locale}/legal-assistance`}
            trailingIcon={<ArrowRight className="size-4" />}
          >
            {copy.cta}
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
