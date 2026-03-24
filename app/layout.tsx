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
  metadataBase: new URL('https://www.aiscaleapp.com'),
  title: {
    default: "AI Scale App - Yapay Zeka ile Para Kazanın",
    template: "%s | AI Scale App"
  },
  description: "10+ zenginlik yaratma yöntemi ile finansal özgürlüğe ulaşın. AI otomasyonu, kripto yatırımları, e-ticaret ve daha fazlası. Başarılı bir online iş kurun.",
  keywords: "yapay zeka eğitimi, online para kazanma, AI otomasyonu, kripto yatırımları, e-ticaret, freelancing, dijital pazarlama, finansal özgürlük",
  authors: [{ name: "AI Scale App" }],
  applicationName: "AI Scale App",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://www.aiscaleapp.com",
    siteName: "AI Scale App",
    title: "AI Scale App - Yapay Zeka ile Para Kazanın",
    description: "10+ zenginlik yaratma yöntemi ile finansal özgürlüğe ulaşın.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "AI Scale App - Yapay Zeka Eğitim Platformu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Scale App - Yapay Zeka ile Para Kazanın",
    description: "10+ zenginlik yaratma yöntemi ile finansal özgürlüğe ulaşın.",
    images: ["/twitter-image.png"],
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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  other: {
    "facebook-domain-verification": "1rdvh63um2pq53vmblo44tle2mg7y0",
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
        <meta name="facebook-domain-verification" content="cay5i2fp2p3cmrbhybm9d385v9xxj0" />
      </head>
      <body className={inter.className}>
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
