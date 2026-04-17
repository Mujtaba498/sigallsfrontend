import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import HeaderScripts from "@/components/HeaderScripts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { getCategories, getSeoData } from "@/services/api";
import Header from "@/components/Header";
import CookieConsent from "@/components/CookieConsent";

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSeoData();

  if (!seoData) {
    return {
      title: "Sigal Industries - L'art de l'édition",
      description: "Sigal Industries - Votre source d'information",
      icons: {
        icon: [
          { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
          { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: [
          { url: '/apple-touch-icon.png' },
        ],
        shortcut: ['/favicon-32x32.png'],
      },
    };
  }

  return {
    title: seoData.metaTitle,
    description: seoData.metaDescription,
    keywords: seoData.metaKeywords,
    openGraph: {
      title: seoData.ogTitle,
      description: seoData.ogDescription,
      images: seoData.ogImageUrl ? [{ url: seoData.ogImageUrl }] : [],
      type: "website",
    },
    twitter: {
      card: (seoData.twitterCardType as "summary" | "summary_large_image" | "player" | "app") || "summary_large_image",
      title: seoData.twitterTitle,
      description: seoData.twitterDescription,
      images: seoData.twitterImageUrl ? [seoData.twitterImageUrl] : [],
    },
    alternates: {
      canonical: seoData.canonicalURL,
    },
    robots: seoData.robotsDirective,
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png' },
      ],
      shortcut: ['/favicon-32x32.png'],
    },
  };
}

// ... existing imports ...

// ... existing imports ...

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [categories, seoData] = await Promise.all([
    getCategories(),
    getSeoData(),
  ]);

  return (
    <html lang="fr" className="light">
      <head>

        <HeaderScripts scripts={seoData?.headerScripts} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header categories={categories} />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
