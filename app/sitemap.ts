import type {MetadataRoute} from 'next';
import {resolvedSiteUrl} from '@/config/site';
import {events} from '@/data/events';
import {industryUpdates} from '@/data/updates';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '',
    '/about',
    '/legal-professionals',
    '/updates',
    '/events',
    '/gallery',
    '/resources',
    '/legal-assistance',
    '/contact',
    '/privacy',
    '/terms',
    '/disclaimer',
  ];
  const publishedDetails = [
    ...industryUpdates
      .filter((item) => !item.isPlaceholder)
      .map((item) => ({path: `/updates/${item.slug}`, date: item.publishedDate})),
    ...events
      .filter((item) => !item.isPlaceholder)
      .map((item) => ({path: `/events/${item.slug}`, date: undefined})),
  ];

  return ['en', 'hi'].flatMap((locale) =>
    [
      ...paths.map((path) => ({
        url: `${resolvedSiteUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' || path === '/updates' ? ('weekly' as const) : ('monthly' as const),
        priority: path === '' ? 1 : 0.7,
        alternates: {
          languages: {
            en: `${resolvedSiteUrl}/en${path}`,
            hi: `${resolvedSiteUrl}/hi${path}`,
          },
        },
      })),
      ...publishedDetails.map(({path, date}) => ({
        url: `${resolvedSiteUrl}/${locale}${path}`,
        ...(date ? {lastModified: new Date(`${date}T00:00:00`)} : {}),
        changeFrequency: 'monthly' as const,
        priority: 0.65,
        alternates: {
          languages: {
            en: `${resolvedSiteUrl}/en${path}`,
            hi: `${resolvedSiteUrl}/hi${path}`,
          },
        },
      })),
    ],
  );
}
