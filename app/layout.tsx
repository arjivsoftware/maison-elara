import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { getSettings, getCategories, getCollections, getPages, getSEO } from '@/lib/data';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const seo = getSEO();
  const settings = getSettings();

  const titleDefault = seo?.siteTitle || `${settings?.business?.name || 'Maison Elara'} | ${settings?.business?.tagline || 'Crafted to Last a Lifetime'}`;
  const description = seo?.siteDescription || settings?.business?.description || "Luxury women's leather bag atelier based in India. Quiet luxury, timeless silhouettes, and bespoke craftsmanship.";
  const siteUrl = seo?.siteUrl || 'https://maisonelara.com';
  const ogImage = seo?.defaultOgImage || '/og-image.jpg';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: titleDefault,
      template: `%s | ${settings?.business?.name || 'Maison Elara'}`,
    },
    description: description,
    robots: seo?.robots || 'index, follow',
    openGraph: {
      title: titleDefault,
      description: description,
      url: siteUrl,
      siteName: settings?.business?.name || 'Maison Elara',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: settings?.business?.name || 'Maison Elara Atelier',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: titleDefault,
      description: description,
      images: [ogImage],
    },
    icons: {
      icon: settings?.business?.favicon || '/favicon.ico',
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = getSettings();
  const categories = getCategories();
  const collections = getCollections();
  const pages = getPages();

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-[var(--color-surface)] text-[var(--color-text)] antialiased" suppressHydrationWarning>
        <AnnouncementBar announcement={settings.announcement} />
        <Header categories={categories} settings={settings} />
        <main className="flex-grow">{children}</main>
        <Footer settings={settings} collections={collections} pages={pages} />
        <FloatingWhatsApp settings={settings} />
      </body>
    </html>
  );
}



