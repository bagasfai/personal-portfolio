import type { Metadata } from "next";
import { Instrument_Serif, Manrope, Caveat } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bagaskara.com"),
  title: "Bagaskara - Floating Sky Portfolio",
  description:
    "An immersive, single-page developer portfolio — fly through seven floating islands of hero, about, skills, experience, projects, blog, and contact.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    title: "Bagaskara - Floating Sky Portfolio",
    description:
      "An immersive, single-page developer portfolio — fly through seven floating islands of hero, about, skills, experience, projects, blog, and contact.",
    images: "/og.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bagaskara - Floating Sky Portfolio",
    description:
      "An immersive, single-page developer portfolio — fly through seven floating islands of hero, about, skills, experience, projects, blog, and contact.",
    images: "/og.png",
  },
  icons: {
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  keywords: [
    "Bagaskara",
    "Muhammad Bagaskara",
    "Web Developer",
    "Personal Page",
    "freelance",
    "Web Dev",
    "Fullstack",
  ],
  authors: [{ name: "Bagaskara", url: "https://bagaskara.com" }],
  creator: "Bagaskara",
  publisher: "Bagaskara",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${manrope.variable} ${caveat.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
