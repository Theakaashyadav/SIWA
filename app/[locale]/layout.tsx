import type {Metadata, Viewport} from 'next';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import type {ReactNode} from 'react';
import {SiteFooter} from '@/components/SiteFooter';
import {SiteHeader} from '@/components/SiteHeader';
import {resolvedSiteUrl, siteConfig} from '@/config/site';
import {routing} from '@/i18n/routing';
import '../globals.css';

type LayoutProps = {
  children: ReactNode;
  params: Promise<{locale: string}>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: Pick<LayoutProps, 'params'>): Promise<Metadata> {
  const {locale} = await params;
  const isHindi = locale === 'hi';
  return {
    metadataBase: new URL(resolvedSiteUrl),
    title: {
      default: isHindi
        ? 'SIWA विधिक सहायता | उद्योगों के लिए कानूनी जानकारी'
        : 'SIWA Legal Support | Legal Information for Industry',
      template: `%s | SIWA`,
    },
    description: isHindi
      ? 'उद्योग-संबंधी कानूनी जानकारी पढ़ें, प्रारंभिक सहायता अनुरोध भेजें और विधिक पेशेवरों के नेटवर्क से संपर्क करें।'
      : 'Read industry-related legal information, submit an initial assistance request and connect with a network of legal professionals.',
    alternates: {
      canonical: `/${locale}`,
      languages: {en: '/en', hi: '/hi'},
    },
    openGraph: {
      type: 'website',
      locale: isHindi ? 'hi_IN' : 'en_IN',
      siteName: isHindi ? 'SIWA औद्योगिक विधिक सहायता' : 'SIWA Industry Legal Support',
      images: [{url: '/images/siwa-industrial-estate.webp', width: 1672, height: 941, alt: isHindi ? 'भारतीय औद्योगिक क्षेत्र का दृश्य' : 'An Indian industrial estate'}],
    },
    twitter: {card: 'summary_large_image'},
    robots: siteConfig.isPlaceholder
      ? {index: false, follow: true, googleBot: {index: false, follow: true}}
      : {index: true, follow: true},
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#123B5D',
};

export default async function LocaleLayout({children, params}: LayoutProps) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const isHindi = locale === 'hi';
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: isHindi ? 'SIWA औद्योगिक विधिक सहायता' : 'SIWA Industry Legal Support',
    legalName: 'Small Industrial Welfare Association',
    alternateName: 'SIWA Legal Support',
    url: `${resolvedSiteUrl}/${locale}`,
    description: isHindi
      ? 'उद्योगों के लिए सामान्य विधिक जानकारी, प्रारंभिक सहायता अनुरोध और पेशेवर संपर्क का मंच।'
      : 'A platform for general legal information, initial assistance requests and professional connections for industry.',
    inLanguage: locale,
  };

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body data-locale={locale}>
        <a
          href="#main-content"
          className="fixed left-4 top-3 z-[100] -translate-y-24 rounded-md bg-white px-4 py-3 font-bold text-navy-800 shadow-lg transition focus:translate-y-0"
        >
          {locale === 'hi' ? 'मुख्य सामग्री पर जाएँ' : 'Skip to main content'}
        </a>
        <SiteHeader locale={locale} />
        <main id="main-content">{children}</main>
        <SiteFooter locale={locale} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(organizationSchema).replace(/</g, '\\u003c')}}
        />
      </body>
    </html>
  );
}
