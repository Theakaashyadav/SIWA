import {ArrowLeft, FileQuestion} from 'lucide-react';
import {getLocale} from 'next-intl/server';
import {ButtonLink, Container} from '@/components/ui';

export default async function NotFound() {
  const locale = await getLocale();
  const hi = locale === 'hi';

  return (
    <section className="bg-surface py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl rounded-2xl border border-line bg-white p-8 text-center shadow-card sm:p-12">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-sky-50 text-industry-700">
            <FileQuestion aria-hidden="true" className="size-7" />
          </span>
          <p className="mt-6 text-sm font-extrabold uppercase tracking-[0.14em] text-industry-700">404</p>
          <h1 className="mt-3 text-3xl font-extrabold text-navy-800 sm:text-4xl">
            {hi ? 'पृष्ठ नहीं मिला' : 'Page not found'}
          </h1>
          <p className="mx-auto mt-4 max-w-lg leading-7 text-slate-600">
            {hi
              ? 'आप जिस पृष्ठ को खोज रहे हैं वह उपलब्ध नहीं है या उसका पता बदल गया है।'
              : 'The page you are looking for is unavailable or may have moved.'}
          </p>
          <ButtonLink
            className="mt-8"
            href={`/${hi ? 'hi' : 'en'}`}
            leadingIcon={<ArrowLeft className="size-4" />}
          >
            {hi ? 'होम पर वापस जाएँ' : 'Return home'}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
