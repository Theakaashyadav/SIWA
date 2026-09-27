import {Mail, Phone} from 'lucide-react';
import {getTranslations} from 'next-intl/server';
import Link from 'next/link';
import {siteConfig} from '@/config/site';
import {Brand} from './Brand';
import {LanguageSwitcher} from './interactive/LanguageSwitcher';
import {MobileMenu, type MobileNavItem} from './interactive/MobileMenu';

type SiteHeaderProps = {locale: string};

export async function SiteHeader({locale}: SiteHeaderProps) {
  const [top, nav, t] = await Promise.all([
    getTranslations({locale, namespace: 'topBar'}),
    getTranslations({locale, namespace: 'nav'}),
    getTranslations({locale}),
  ]);

  const isHindi = locale === 'hi';
  const professionalLabels = isHindi
    ? {
        legalNetwork: 'विधिक पेशेवर नेटवर्क',
        legalInformation: 'विधिक जानकारी व अपडेट',
        legalSessions: 'विधिक सत्र',
        activityGallery: 'गैलरी',
        utilityNavigation: 'उपयोगी लिंक',
        primaryNavigation: 'SIWA मुख्य नेविगेशन',
      }
    : {
        legalNetwork: 'Legal Professionals',
        legalInformation: 'Legal Information & Updates',
        legalSessions: 'Legal Sessions',
        activityGallery: 'Gallery',
        utilityNavigation: 'Utility links',
        primaryNavigation: 'SIWA primary navigation',
      };
  const hasVerifiedContact = !siteConfig.isPlaceholder;

  const items: MobileNavItem[] = [
    {label: nav('home'), href: '/'},
    {label: nav('about'), href: '/about'},
    {label: professionalLabels.legalNetwork, href: '/legal-professionals'},
    {label: professionalLabels.legalInformation, href: '/updates'},
    {label: t('resources.title'), href: '/resources'},
    {label: nav('contact'), href: '/contact'},
  ];

  const localHref = (href: string) =>
    href === '/' ? `/${locale}` : `/${locale}${href}`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white shadow-[0_8px_30px_-28px_rgba(8,40,63,0.55)]">
      <div className="bg-navy-800 text-white">
        <div className="container-shell flex min-h-10 items-center justify-between gap-4 py-1 text-xs">
          <p className="hidden font-medium text-slate-200 lg:block">
            {top('supporting')}
          </p>
          <div className="ml-auto flex items-center gap-2 sm:gap-4">
            <nav className="hidden md:block" aria-label={professionalLabels.utilityNavigation}>
              <ul className="flex items-center gap-4 font-semibold text-slate-200">
                <li>
                  <Link className="transition hover:text-white" href={`/${locale}/events`}>
                    {professionalLabels.legalSessions}
                  </Link>
                </li>
                <li>
                  <Link className="transition hover:text-white" href={`/${locale}/gallery`}>
                    {professionalLabels.activityGallery}
                  </Link>
                </li>
              </ul>
            </nav>
            {hasVerifiedContact ? (
              <>
                <a
                  className="hidden items-center gap-1.5 text-slate-200 transition hover:text-white 2xl:flex"
                  href={`mailto:${siteConfig.contact.email}`}
                >
                  <Mail aria-hidden="true" className="size-3.5 text-sky-300" />
                  {siteConfig.contact.email}
                </a>
                <a
                  className="hidden items-center gap-1.5 text-slate-200 transition hover:text-white xl:flex"
                  href={`tel:${siteConfig.contact.phone.replace(/[^\d+]/g, '')}`}
                >
                  <Phone aria-hidden="true" className="size-3.5 text-sky-300" />
                  {siteConfig.contact.phone}
                </a>
              </>
            ) : null}
            <LanguageSwitcher
              locale={locale}
              label={top('language')}
              languages={[
                {code: 'hi', label: 'हिन्दी'},
                {code: 'en', label: 'English'},
              ]}
            />
          </div>
        </div>
      </div>

      <div className="container-shell flex min-h-[5rem] items-center justify-between gap-5 py-3">
        <Brand locale={locale} />

        <nav aria-label={professionalLabels.primaryNavigation} className="hidden lg:block">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={localHref(item.href)}
                  className="inline-flex min-h-11 items-center rounded-lg px-2.5 text-[0.78rem] font-semibold text-slate-700 transition hover:bg-surface hover:text-industry-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-industry-600 focus-visible:ring-offset-2 xl:px-3 xl:text-sm"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href={`/${locale}/legal-assistance`}
            className="hidden min-h-11 items-center justify-center rounded-[10px] bg-accent-500 px-4 text-sm font-bold text-navy-950 shadow-[0_10px_25px_-14px_rgba(242,140,40,0.8)] transition hover:-translate-y-0.5 hover:bg-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-industry-600 focus-visible:ring-offset-2 xl:inline-flex"
          >
            {nav('becomeMember')}
          </Link>
          <MobileMenu
            locale={locale}
            items={items}
            menuLabel={nav('openMenu')}
            closeLabel={nav('closeMenu')}
            navigationLabel={professionalLabels.primaryNavigation}
            cta={{label: nav('becomeMember'), href: '/legal-assistance'}}
          />
        </div>
      </div>
    </header>
  );
}
