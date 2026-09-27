import type {MetadataRoute} from 'next';
import {resolvedSiteUrl} from '@/config/site';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {userAgent: '*', allow: '/'},
    sitemap: `${resolvedSiteUrl}/sitemap.xml`,
  };
}
