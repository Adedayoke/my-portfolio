import type { Metadata } from "next";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "./globals.css";

// TODO: replace with your real domain once you have one (custom domain or
// the vercel.app URL Vercel gives you on deploy). This value is used to
// build absolute URLs for Open Graph images, canonical links, and the
// sitemap — search engines and social platforms need real, resolvable URLs.
const SITE_URL = "https://habeeb-portfolio.vercel.app";

const title = "Habeeb Oke — Native Dev | Software Engineer";
const description =
  "Habeeb Oke (Native Dev) is a software engineer out of Lagos, Nigeria — full-stack developer, LASU Computer Science graduate, building across frontend, mobile, and backend systems.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s | Habeeb Oke",
  },
  description,
  keywords: [
    "Habeeb Oke",
    "Native Dev",
    "NativeDev",
    "Habeeb Oke Developer",
    "Habeeb Oke Software Engineer",
    "Habeeb Oke LASU",
    "Habeeb Oke Lagos",
    "Habeeb Oke Nigeria",
    "Habeeb Oke Full Stack Developer",
    "Habeeb Oke Backend Engineer",
    "Adedayoke",
  ],
  authors: [{ name: "Habeeb Oke", url: SITE_URL }],
  creator: "Habeeb Oke",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Habeeb Oke — Native Dev",
    title,
    description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Habeeb Oke — Native Dev, Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@Adedayoke",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Habeeb Oke",
              alternateName: ["Native Dev", "NativeDev", "Adedayoke"],
              url: SITE_URL,
              jobTitle: "Software Engineer",
              description,
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Lagos State University",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Lagos",
                addressCountry: "NG",
              },
              sameAs: [
                "https://github.com/Adedayoke",
                "https://linkedin.com/in/habeeb-oke",
                "https://x.com/Adedayoke",
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
