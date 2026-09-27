import { permanentRedirect } from "next/navigation";

type LegacySchemesPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LegacySchemesPage({ params }: LegacySchemesPageProps) {
  const { locale } = await params;
  permanentRedirect(`/${locale}/updates#government-schemes`);
}
