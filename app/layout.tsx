import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope, Caveat } from "next/font/google";
import "./globals.css";
import {
  INTRO_STORAGE_KEY,
  REDUCED_MOTION_QUERY,
} from "@/components/floating-sky/introTiming";
import { THEME_STORAGE_KEY } from "@/lib/theme";

// Runs synchronously during HTML parsing, before any body content is parsed, so both
// decisions are recorded before the browser paints. useEffect runs after paint and
// useLayoutEffect runs after hydration — neither is early enough. See
// node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md
// One blocking script rather than two: the intro decision and the theme decision want
// exactly the same timing, so there is nothing to gain by splitting them.
const prePaintScript = `(function(){var m=false;try{m=!!(window.matchMedia&&window.matchMedia(${JSON.stringify(
  REDUCED_MOTION_QUERY,
)}).matches);}catch(e){}var s=false;try{s=sessionStorage.getItem(${JSON.stringify(
  INTRO_STORAGE_KEY,
)})==="1";}catch(e){}document.documentElement.dataset.skyIntro=(s||m)?"0":"1";var t=null;try{t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});}catch(e){}if(t!=="day"&&t!=="night"){t="day";try{if(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches)t="night";}catch(e){}}document.documentElement.dataset.theme=t;})();`;

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
  openGraph: {
    title: "Bagaskara - Floating Sky Portfolio",
    description:
      "An immersive, single-page developer portfolio — fly through seven floating islands of hero, about, skills, experience, projects, blog, and contact.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bagaskara - Floating Sky Portfolio",
    description:
      "An immersive, single-page developer portfolio — fly through seven floating islands of hero, about, skills, experience, projects, blog, and contact.",
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-sky-intro="1"
      data-theme="day"
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${manrope.variable} ${caveat.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: prePaintScript }} />
        <noscript>
          <style>{`[data-intro-curtain]{display:none}[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[300] focus:px-4 focus:py-2 focus:rounded-full focus:bg-white focus:text-[#3b3e63] focus:font-semibold focus:shadow-lg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
