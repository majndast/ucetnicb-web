import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const SITE_URL = "https://ucetnicb-web.vercel.app";
const SITE_NAME = "Účetnictví Kotmanová";
const SITE_DESCRIPTION =
  "Kompletní vedení účetnictví, daňová evidence, mzdy a daňové poradenství v Českých Budějovicích. Šárka Kotmanová - vaše spolehlivá účetní s více než 18 lety zkušeností.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Účetnictví Kotmanová | České Budějovice",
    template: "%s | Účetnictví Kotmanová",
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: "Šárka Kotmanová" }],
  creator: "Účetnictví Kotmanová",
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
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Účetnictví Kotmanová | České Budějovice",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og/image",
        width: 1200,
        height: 630,
        alt: "Účetnictví Kotmanová - účetní služby v Českých Budějovicích",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Účetnictví Kotmanová | České Budějovice",
    description: SITE_DESCRIPTION,
    images: ["/og/image"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={`${inter.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
