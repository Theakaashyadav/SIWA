import type {MetadataRoute} from 'next';
import {resolvedSiteUrl} from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {userAgent: '*', allow: '/'},
    sitemap: `${resolvedSiteUrl}/sitemap.xml`,
  };
}
