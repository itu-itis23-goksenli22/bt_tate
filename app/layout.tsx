import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MetaPixel from "@/components/MetaPixel";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.therealworldportal.com'),
  title: "AI Scale App - Yapay Zeka ile Para Kazanın | Online Eğitim Platformu",
  description: "10+ zenginlik yaratma yöntemi ile finansal özgürlüğe ulaşın. AI otomasyonu, kripto yatırımları, e-ticaret ve daha fazlası. Başarılı bir online iş kurun.",
  keywords: "yapay zeka eğitimi, online para kazanma, AI otomasyonu, kripto yatırımları, e-ticaret, freelancing, dijital pazarlama, finansal özgürlük",
  authors: [{ name: "AI Scale App" }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://www.therealworldportal.com",
    siteName: "AI Scale App",
    title: "AI Scale App - Yapay Zeka ile Para Kazanın",
    description: "10+ zenginlik yaratma yöntemi ile finansal özgürlüğe ulaşın.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI Scale App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Scale App - Yapay Zeka ile Para Kazanın",
    description: "10+ zenginlik yaratma yöntemi ile finansal özgürlüğe ulaşın.",
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={inter.variable}>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
