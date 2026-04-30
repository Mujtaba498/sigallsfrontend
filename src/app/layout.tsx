import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Script from "next/script";
import { getCategories, getSeoData } from "@/services/api";
import Header from "@/components/Header";
import CookieConsent from "@/components/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type ParsedMetaTag = {
  name?: string;
  property?: string;
  content?: string;
  charSet?: string;
  httpEquiv?: string;
};

type ParsedScriptTag = {
  id?: string;
  innerHTML: string;
  src?: string;
  type?: string;
};

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [categories, seoData] = await Promise.all([
    getCategories(),
    getSeoData(),
  ]);
  const headerScripts = seoData?.headerScripts || "";

  const metaTags: ParsedMetaTag[] = [];
  const scripts: ParsedScriptTag[] = [];

  const getAttr = (attrStr: string, name: string): string | undefined => {
    const regex = new RegExp(`${name}=(["'])(.*?)\\1`, "i");
    const match = attrStr.match(regex);
    return match ? match[2] : undefined;
  };

  const metaRegex = /<meta\s+([^>]*?)\s*\/?>/gi;
  let metaMatch;
  while ((metaMatch = metaRegex.exec(headerScripts)) !== null) {
    const attrStr = metaMatch[1];
    metaTags.push({
      name: getAttr(attrStr, "name"),
      property: getAttr(attrStr, "property"),
      content: getAttr(attrStr, "content"),
      charSet: getAttr(attrStr, "charset"),
      httpEquiv: getAttr(attrStr, "http-equiv"),
    });
  }

  const selfClosingRegex = /<[Ss]cript\s+([^>]*?)\/>/gi;
  let selfCloseMatch;
  while ((selfCloseMatch = selfClosingRegex.exec(headerScripts)) !== null) {
    const attrStr = selfCloseMatch[1];
    const src = getAttr(attrStr, "src");
    if (src) {
      scripts.push({
        src,
        id: getAttr(attrStr, "id"),
        type: getAttr(attrStr, "type"),
        innerHTML: "",
      });
    }
  }

  const blockScriptRegex = /<[Ss]cript([^>]*)>([\s\S]*?)<\/[Ss]cript>/gi;
  let blockMatch;
  while ((blockMatch = blockScriptRegex.exec(headerScripts)) !== null) {
    const attrStr = blockMatch[1];
    let innerHTML = blockMatch[2].trim();
    const jsxWrapMatch = innerHTML.match(/^\{\s*`([\s\S]*)`\s*\}$/);
    if (jsxWrapMatch) {
      innerHTML = jsxWrapMatch[1];
    }
    scripts.push({
      src: getAttr(attrStr, "src"),
      id: getAttr(attrStr, "id"),
      type: getAttr(attrStr, "type"),
      innerHTML,
    });
  }

  return (
    <html lang="fr" className="light">
      <head>
        {metaTags.map((meta, i) => (
          <meta
            key={`meta-${i}`}
            {...(meta.name ? { name: meta.name } : {})}
            {...(meta.property ? { property: meta.property } : {})}
            {...(meta.content ? { content: meta.content } : {})}
            {...(meta.charSet ? { charSet: meta.charSet } : {})}
            {...(meta.httpEquiv ? { httpEquiv: meta.httpEquiv } : {})}
          />
        ))}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {scripts.map((script, i) => {
          if (script.src) {
            return (
              <Script
                key={`script-${i}`}
                id={script.id || `dynamic-script-src-${i}`}
                src={script.src}
                strategy="afterInteractive"
                type={script.type}
              />
            );
          }

          if (script.innerHTML) {
            return (
              <Script
                key={`script-${i}`}
                id={script.id || `dynamic-script-inline-${i}`}
                strategy="afterInteractive"
                type={script.type}
                dangerouslySetInnerHTML={{ __html: script.innerHTML }}
              />
            );
          }

          return null;
        })}
        <Header categories={categories} />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
