import {PageHero} from './PageHero';
import {Container} from './ui';

export type LegalSection = {heading: string; paragraphs: string[]};

export function LegalPage({
  locale,
  eyebrow,
  title,
  description,
  sections,
}: {
  locale: string;
  eyebrow: string;
  title: string;
  description: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        breadcrumbs={[
          {label: locale === 'hi' ? 'होम' : 'Home', href: `/${locale}`},
          {label: title},
        ]}
      />
      <section className="section-pad bg-surface">
        <Container>
          <article className="mx-auto max-w-4xl rounded-2xl border border-line bg-white p-6 shadow-card sm:p-10">
            <div className="space-y-9">
              {sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-xl font-extrabold text-navy-800 sm:text-2xl">{section.heading}</h2>
                  <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </Container>
      </section>
    </>
  );
}
