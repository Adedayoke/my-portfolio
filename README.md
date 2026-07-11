# Habeeb Oke — Portfolio

Personal portfolio site for Habeeb Oke (Native Dev) — software engineer out of Lagos, Nigeria.

🔗 [Live site](#) <!-- add your deployed URL once live -->

## About

Built to be honest rather than templated — real projects, real status (including the ones that aren't live yet), and a long-form "About" page instead of generic bio copy.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- Self-hosted fonts via [Fontsource](https://fontsource.org/) — JetBrains Mono + Inter
- Deployed on [Vercel](https://vercel.com/)

## Features

- Left-side status rail that tracks scroll position across sections
- Full project write-ups, including honest status (live / in development / not live / coming soon)
- Long-form About page ("Connecting the Dots") separate from the homepage teaser
- SEO: Open Graph image (dynamically generated), JSON-LD `Person` schema, sitemap, robots.txt
- Contact form (opens a pre-filled email draft — no backend yet)

## Getting Started

Install dependencies:

    npm install

Run the dev server:

    npm run dev

Open [http://localhost:3000](http://localhost:3000).

### Build

    npm run build
    npm run start

## Project Structure

    app/
      layout.tsx          # root layout, fonts, SEO metadata, JSON-LD
      page.tsx            # homepage — assembles all sections
      about/page.tsx      # full "Connecting the Dots" essay
      opengraph-image.tsx # dynamic social share image
      sitemap.ts
      robots.ts
    components/
      Nav.tsx
      StatusRail.tsx
      Hero.tsx
      About.tsx
      Work.tsx
      Experience.tsx
      Now.tsx
      Contact.tsx
      Footer.tsx

## Before Deploying

Update `SITE_URL` in `app/layout.tsx`, `app/sitemap.ts`, and `app/robots.ts` to match your actual deployed domain — it's currently a placeholder.

## Contact

- [GitHub](https://github.com/Adedayoke)
- [LinkedIn](https://linkedin.com/in/habeeb-oke)
- [X](https://x.com/Adedayoke)
- adedayoke2006@gmail.com

---

Made by Habeeb Oke — Native Dev