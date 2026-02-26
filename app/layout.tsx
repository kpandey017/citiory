import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Citiory - City Intelligence Platform",
    template: "%s | Citiory",
  },
  description: "Discover and compare cities worldwide with cost, safety, climate, reviews, and more.",
  applicationName: "Citiory",
  keywords: [
    "city comparison",
    "cost of living",
    "digital nomad cities",
    "city rankings",
    "city reviews",
    "quality of life",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Citiory",
    title: "Citiory - City Intelligence Platform",
    description: "Discover and compare cities worldwide with cost, safety, climate, reviews, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Citiory - City Intelligence Platform",
    description: "Discover and compare cities worldwide with cost, safety, climate, reviews, and more.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "")
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Citiory",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/cities?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
