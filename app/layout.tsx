import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/data/site-config";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${siteConfig.title} — ${siteConfig.name}`,
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.title} — ${siteConfig.name}`,
    description: `${siteConfig.birthDateDisplay} — ${siteConfig.deathDateDisplay}. A life well lived.`,
    images: [siteConfig.ogImage],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.title} — ${siteConfig.name}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${siteConfig.title} — ${siteConfig.name}`,
    startDate: siteConfig.serviceDate,
    location: {
      "@type": "Place",
      name: siteConfig.venue.name,
      address: siteConfig.venue.address,
    },
    description: `Memorial service celebrating the life of ${siteConfig.name} (${siteConfig.birthDateDisplay} – ${siteConfig.deathDateDisplay}).`,
  };

  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
      </head>
      <body className="bg-bg font-sans text-text antialiased">
        {children}
      </body>
    </html>
  );
}
