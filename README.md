# SIWA Industry Legal Support

A professional, bilingual legal-support website for SIWA-connected industries. It provides general legal information, a legal-assistance intake and a privacy-conscious legal-professionals directory. The frontend uses Next.js App Router, TypeScript, Tailwind CSS, `next-intl`, Lucide icons, React Hook Form and Zod.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`; the bare root always redirects to Hindi at `/hi`. English remains available at `/en` and through the language switcher.

Quality checks:

```bash
npm run typecheck
npm run lint
npm run build
```

To preview the generated static website:

```bash
npm run build
npm start
```

## Routes

- `/[locale]` — home
- `/[locale]/about`
- `/[locale]/legal-professionals`
- `/[locale]/legal-assistance`
- `/[locale]/updates` and `/[locale]/updates/[slug]`
- `/[locale]/events` and `/[locale]/events/[slug]`
- `/[locale]/gallery`
- `/[locale]/resources`
- `/[locale]/contact`
- Privacy, terms and disclaimer pages

Hindi (`hi`) and English (`en`) are supported. Hindi is the deterministic default; explicit locale routes remain stable.

## Before launch

1. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the verified production origin.
2. Approve the visible service name and code-native identity, or replace it with SIWA's authorized brand assets.
3. Update verified contact details, social URLs and map configuration in `config/site.ts`.
4. Replace all clearly labelled sample records with verified legal professionals, sourced legal/regulatory updates, official scheme links, approved notices, programmes and resources.
5. Verify each professional's identity, current enrolment/status, practice details and publication consent. Do not publish private contact details by default.
6. Connect `ContactForm` and `LegalAssistanceForm` to an approved secure workflow. In this preview, both forms validate locally and explicitly state that nothing is transmitted.
7. Complete conflict-check, engagement, deadline-escalation, retention, security and grievance workflows before accepting real matters.
8. Obtain Indian legal/professional-conduct and privacy review before production publication.

Unverified government information, downloads, source links, profiles, social links and map coordinates are intentionally disabled or left null. Because the site is still configured as a placeholder preview, all pages are `noindex` until verified production content and contacts are supplied.

## Content architecture

- `messages/en.json` and `messages/hi.json` contain matching, manually authored locale catalogs.
- `data/` holds typed V1 records that can later be replaced by Sanity, Strapi, Payload, Supabase or another CMS.
- `types/index.ts` defines the shared content contracts.
- `config/site.ts` centralizes service-level settings and placeholders.
- `public/images/` contains optimized project-owned WebP imagery.

## Deployment

Run `npm run build` to generate the complete static website in `out/`. Upload the contents of `out/` to any static hosting service, or preview the exported files locally with `npm start`. Set `NEXT_PUBLIC_SITE_URL` in the build environment before building.
