import { permanentRedirect } from "next/navigation";

type LegacyIndustryNetworkPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LegacyIndustryNetworkPage({
  params,
}: LegacyIndustryNetworkPageProps) {
  const { locale } = await params;
  permanentRedirect(`/${locale}/legal-professionals`);
}
