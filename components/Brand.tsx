import Link from 'next/link';

type BrandProps = {
  locale: string;
  inverse?: boolean;
  compact?: boolean;
};

export function Brand({locale, inverse = false, compact = false}: BrandProps) {
  const isHindi = locale === 'hi';
  const serviceName = isHindi ? 'औद्योगिक विधिक सहायता' : 'Industry Legal Support';

  return (
    <Link
      href={`/${locale}`}
      className={`group inline-flex min-w-0 items-center gap-3.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        inverse
          ? 'focus-visible:ring-accent-500 focus-visible:ring-offset-navy-950'
          : 'focus-visible:ring-industry-600 focus-visible:ring-offset-white'
      }`}
      aria-label={`SIWA — ${serviceName}`}
    >
      <span
        className={`relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-xl border shadow-[0_8px_22px_-13px_rgba(8,40,63,0.8)] transition duration-200 group-hover:-translate-y-0.5 ${
          inverse
            ? 'border-white/20 bg-white text-navy-900'
            : 'border-navy-950/15 bg-navy-800 text-white'
        }`}
        aria-hidden="true"
      >
        <span className="absolute inset-x-0 bottom-0 h-1 bg-accent-500" />
        <svg
          className="size-8"
          fill="none"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M24 7v31M14 12h20M18 38h12" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
          <path d="m14 13-6 11h12l-6-11Zm20 0-6 11h12l-6-11Z" stroke={inverse ? '#176b9c' : '#f28c28'} strokeLinejoin="round" strokeWidth="2.4" />
          <path d="M8 24c.7 4 3 6 6 6s5.3-2 6-6M28 24c.7 4 3 6 6 6s5.3-2 6-6" stroke="currentColor" strokeLinecap="round" strokeWidth="2.4" />
        </svg>
      </span>
      <span className="min-w-0">
        <span
          className={`block text-[1.35rem] font-extrabold leading-none tracking-[0.14em] ${
            inverse ? 'text-white' : 'text-navy-800'
          }`}
        >
          SIWA <span className="tracking-normal text-industry-600">LEGAL</span>
        </span>
        {!compact ? (
          <span
            className={`mt-1.5 block max-w-[14rem] text-[0.68rem] font-semibold leading-[1.3] sm:text-[0.72rem] ${
              inverse ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            {serviceName}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
