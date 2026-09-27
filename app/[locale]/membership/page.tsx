import {permanentRedirect} from 'next/navigation';

type PageProps = {params: Promise<{locale: string}>};

export default async function MembershipRedirect({params}: PageProps) {
  const {locale} = await params;
  permanentRedirect(`/${locale}/legal-assistance`);
}
