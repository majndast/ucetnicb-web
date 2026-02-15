import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Účetnictví Kotmanová | České Budějovice",
  description:
    "Kompletní vedení účetnictví, daňová evidence, mzdy a daňové poradenství v Českých Budějovicích. Šárka Kotmanová - vaše spolehlivá účetní.",
  keywords: [
    "účetnictví",
    "České Budějovice",
    "daňové poradenství",
    "mzdy",
    "daňová evidence",
    "účetní",
  ],
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
