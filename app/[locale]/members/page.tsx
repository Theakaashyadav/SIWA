import { permanentRedirect } from "next/navigation";

type LegacyDirectoryPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LegacyDirectoryPage({ params }: LegacyDirectoryPageProps) {
  const { locale } = await params;
  permanentRedirect(`/${locale}/legal-professionals`);
}
