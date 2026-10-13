# Habeeb Oke — Portfolio

My personal portfolio site: experience, selected work, community involvement, and what I'm building now.

**Live:** [native-dev.vercel.app](https://native-dev.vercel.app)

<!-- Add a screenshot: save one to public/ and uncomment the line below -->
<!-- ![Portfolio screenshot](public/screenshot.png) -->

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4, `next-themes` for light/dark mode
- **Motion:** Framer Motion, Lenis smooth scrolling
- **3D / WebGL:** Three.js via React Three Fiber, Drei, and postprocessing
- **Analytics:** Vercel Analytics
- **Hosting:** Vercel

## Highlights

- **Custom GLSL hero background.** A shader-driven starfield that reacts to the mouse and switches between a dark-space and a light theme. It renders with React Three Fiber and a bloom pass.
- **Performance-conscious 3D.** The WebGL canvas loads client-side only, so it never blocks server rendering.
- **Micro-interactions.** Reusable `useMagnet` and `useTilt` hooks built on Framer Motion springs, plus a custom cursor and a scroll progress indicator.
- **SEO built in.** Generated Open Graph images, `sitemap.ts`, `robots.ts`, and an `llms.txt` for AI crawlers.
- **Downloadable contact card.** A vCard in `public/` so visitors can save my details in one tap.

## Project Structure

```
app/            Routes, layout, OG image, sitemap, robots
components/     Page sections (Hero, Experience, Work, Community, Now, Contact, …)
lib/hooks/      useMagnet, useTilt interaction hooks
lib/motion.ts   Shared animation variants
public/         Static assets, community photos, vCard, llms.txt
```

## Running Locally

```bash
git clone https://github.com/Adedayoke/my-portfolio.git
cd my-portfolio
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Contact

- **LinkedIn:** [linkedin.com/in/habeeb-oke](https://linkedin.com/in/habeeb-oke)
- **Email:** [adedayoke2006@gmail.com](mailto:adedayoke2006@gmail.com)
- **GitHub:** [@Adedayoke](https://github.com/Adedayoke)
