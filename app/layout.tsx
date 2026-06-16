import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { SITE_URL, META, ORG_JSONLD } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: META.title,
    template: META.titleTemplate,
  },
  description: META.description,
  applicationName: "EnterX",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: META.locale,
    url: SITE_URL,
    siteName: "EnterX",
    title: META.title,
    description: META.description,
    // La imagen la provee app/opengraph-image.tsx (convención de Next).
  },
  twitter: {
    card: "summary_large_image",
    title: META.title,
    description: META.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        {children}
        {/* JSON-LD Organization (CETEMIN → Enter Tech School → EnterX). */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
        />
      </body>
    </html>
  );
}
