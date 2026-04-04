import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { siteConfig } from "@/lib/constants";
import "./globals.css";

const spaceGrotesk = localFont({
  src: [
    { path: "../../public/fonts/SpaceGrotesk-Regular.woff2", weight: "400" },
    { path: "../../public/fonts/SpaceGrotesk-Bold.woff2", weight: "700" },
  ],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
});

const manrope = localFont({
  src: [
    { path: "../../public/fonts/Manrope-Regular.woff2", weight: "400" },
    { path: "../../public/fonts/Manrope-Bold.woff2", weight: "700" },
  ],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "web developer",
    "mobile developer",
    "React",
    "Next.js",
    "Flutter",
    "full-stack developer",
    "freelance developer",
    "TypeScript",
    "Node.js",
    "portfolio",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.title,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Developer Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  jobTitle: "Full-Stack Developer",
  knowsAbout: [
    "React",
    "Next.js",
    "Flutter",
    "TypeScript",
    "Node.js",
    "GraphQL",
    "PostgreSQL",
  ],
  sameAs: [
    "https://github.com/MuhammadAdnanRiaz/",
    "https://www.linkedin.com/in/muhammadadnanriaz/",
    "https://www.upwork.com/freelancers/~01671c7ab4a7952104",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${manrope.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <LenisProvider>{children}</LenisProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
