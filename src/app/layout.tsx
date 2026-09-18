import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { RevealInit } from "@/components/reveal";
import { site } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
    { media: "(prefers-color-scheme: light)", color: "#faf8f3" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  keywords: [
    "senior React developer",
    "Next.js developer",
    "full-stack TypeScript engineer",
    "Node.js developer",
    "PostgreSQL",
    "React Native developer",
    "freelance full-stack developer",
    "remote engineer for US startups",
    "Islamabad",
  ],
  authors: [{ name: site.fullName, url: site.url }],
  creator: site.fullName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    firstName: "Muhammad Adnan",
    lastName: "Riaz",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.fullName,
      alternateName: site.name,
      url: site.url,
      jobTitle: "Senior Full-Stack Engineer",
      description: site.description,
      worksFor: { "@type": "Organization", name: "EnrouteAI" },
      address: { "@type": "PostalAddress", addressLocality: "Islamabad", addressCountry: "PK" },
      knowsAbout: [
        "React", "Next.js", "TypeScript", "Node.js", "NestJS", "PostgreSQL",
        "React Native", "GraphQL", "Python", "Django",
      ],
      sameAs: [site.links.github, site.links.linkedin, site.links.upwork],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      publisher: { "@id": `${site.url}/#person` },
      inLanguage: "en",
    },
    {
      "@type": "ProfilePage",
      "@id": `${site.url}/#profile`,
      url: site.url,
      name: site.title,
      mainEntity: { "@id": `${site.url}/#person` },
      isPartOf: { "@id": `${site.url}/#website` },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:btn focus:btn-primary"
        >
          Skip to content
        </a>
        <RevealInit />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
