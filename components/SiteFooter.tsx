import {ArrowRight, Clock3, Mail, MapPin, MessageSquareText, Phone} from 'lucide-react';
import {getTranslations} from 'next-intl/server';
import Link from 'next/link';
import type {ReactNode} from 'react';
import {siteConfig} from '@/config/site';
import {Brand} from './Brand';

type SiteFooterProps = {locale: string};

export async function SiteFooter({locale}: SiteFooterProps) {
  const [footer, nav] = await Promise.all([
    getTranslations({locale, namespace: 'footer'}),
    getTranslations({locale, namespace: 'nav'}),
  ]);
  const year = new Date().getFullYear();
  const href = (path: string) => `/${locale}${path}`;
  const isHindi = locale === 'hi';
  const professionalLabels = isHindi
    ? {
        legalNetwork: 'विधिक पेशेवर नेटवर्क',
        legalInformation: 'विधिक जानकारी व अपडेट',
        contactTitle: 'कानूनी समस्या साझा करें',
        contactText: 'अपने उद्योग से जुड़ी कानूनी समस्या का संक्षिप्त विवरण प्रारंभिक समीक्षा के लिए भेजें।',
        contactCta: 'सहायता अनुरोध भेजें',
        socialNavigation: 'SIWA सोशल मीडिया',
      }
    : {
        legalNetwork: 'Legal Professionals Network',
        legalInformation: 'Legal Information & Updates',
        contactTitle: 'Share a legal concern',
        contactText: 'Send a brief summary of your industry-related legal issue for initial review.',
        contactCta: 'Request legal assistance',
        socialNavigation: 'SIWA social media',
      };
  const hasVerifiedContact = !siteConfig.isPlaceholder;

  const quickLinks = [
    [nav('home'), ''],
    [nav('about'), '/about'],
    [professionalLabels.legalNetwork, '/legal-professionals'],
    [nav('gallery'), '/gallery'],
    [nav('contact'), '/contact'],
  ];
  const resourceLinks = [
    [professionalLabels.legalInformation, '/updates'],
    [footer('notices'), '/updates#siwa-notices'],
    [footer('events'), '/events'],
    [footer('membership'), '/legal-assistance'],
    [footer('documents'), '/resources'],
  ];
  const socialLinks: {label: string; href: string | null}[] = [
    {label: 'Facebook', href: siteConfig.socialLinks.facebook},
    {label: 'LinkedIn', href: siteConfig.socialLinks.linkedin},
    {label: 'YouTube', href: siteConfig.socialLinks.youtube},
    {label: 'Instagram', href: siteConfig.socialLinks.instagram},
  ];
  const publishedSocialLinks = socialLinks.filter(
    (link): link is {label: string; href: string} => link.href !== null,
  );

  return (
    <footer className="bg-navy-950 text-slate-300">
      <div className="border-b border-white/10">
        <div className="container-shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.72fr_0.88fr_1.15fr] lg:gap-9 lg:py-18">
          <div>
            <Brand locale={locale} inverse />
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              {footer('description')}
            </p>
            {publishedSocialLinks.length ? (
              <nav className="mt-6" aria-label={professionalLabels.socialNavigation}>
                <ul className="flex flex-wrap gap-2">
                  {publishedSocialLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        aria-label={link.label}
                        className="inline-flex min-h-10 items-center justify-center rounded-lg border border-white/15 px-3 text-xs font-semibold text-slate-300 transition hover:border-sky-300 hover:text-white"
                        href={link.href}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </div>

          <FooterLinks title={footer('quickLinks')} links={quickLinks.map(([label, path]) => [label, href(path)])} />
          <FooterLinks title={footer('resources')} links={resourceLinks.map(([label, path]) => [label, href(path)])} />

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-white">
              {footer('contact')}
            </h2>
            {hasVerifiedContact ? (
              <ul className="mt-5 space-y-4 text-sm">
                <ContactRow icon={<MapPin />} label={footer('address')} value={siteConfig.contact.address} />
                <ContactRow
                  href={`tel:${siteConfig.contact.phone.replace(/[^\d+]/g, '')}`}
                  icon={<Phone />}
                  label={footer('phone')}
                  value={siteConfig.contact.phone}
                />
                <ContactRow
                  href={`mailto:${siteConfig.contact.email}`}
                  icon={<Mail />}
                  label={footer('email')}
                  value={siteConfig.contact.email}
                />
                <ContactRow icon={<Clock3 />} label={footer('officeHours')} value={siteConfig.contact.officeHours} />
              </ul>
            ) : (
              <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.055] p-4">
                <MessageSquareText aria-hidden="true" className="size-6 text-sky-300" />
                <p className="mt-3 font-semibold text-white">{professionalLabels.contactTitle}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{professionalLabels.contactText}</p>
                <Link
                  className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-md text-sm font-bold text-sky-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                  href={href('/legal-assistance')}
                >
                  {professionalLabels.contactCta}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container-shell flex flex-col gap-4 py-5 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>{footer('copyright', {year})}</p>
        <nav aria-label="Legal">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><Link className="hover:text-white" href={href('/privacy')}>{footer('privacy')}</Link></li>
            <li><Link className="hover:text-white" href={href('/terms')}>{footer('terms')}</Link></li>
            <li><Link className="hover:text-white" href={href('/disclaimer')}>{footer('disclaimer')}</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

function FooterLinks({title, links}: {title: string; links: string[][]}) {
  return (
    <div>
      <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-white">{title}</h2>
      <ul className="mt-5 space-y-3 text-sm">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link className="transition hover:text-white" href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="block font-semibold text-slate-200">{label}</span>
      {value}
    </>
  );

  return (
    <li className="flex gap-3">
      <span className="mt-0.5 text-sky-300 [&>svg]:size-4" aria-hidden="true">{icon}</span>
      {href ? (
        <a className="transition hover:text-white" href={href}>{content}</a>
      ) : (
        <span>{content}</span>
      )}
    </li>
  );
}
