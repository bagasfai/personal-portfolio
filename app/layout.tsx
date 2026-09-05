import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope, Caveat } from "next/font/google";
import "./globals.css";
import {
  INTRO_STORAGE_KEY,
  REDUCED_MOTION_QUERY,
} from "@/components/floating-sky/introTiming";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import StructuredData from "@/components/seo/StructuredData";
import {
  EXPERTISE,
  FIRST_NAME,
  FULL_NAME,
  LAST_NAME,
  ROLE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  USERNAMES,
} from "@/content/site";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  applicationName: SITE_NAME,
  openGraph: {
    type: "profile",
    firstName: FIRST_NAME,
    lastName: LAST_NAME,
    username: USERNAMES[0],
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
    FULL_NAME,
    SITE_NAME,
    ...USERNAMES,
    `${FULL_NAME} developer`,
    `${SITE_NAME} portfolio`,
    ROLE,
    "full-stack developer portfolio",
    "web developer",
    "freelance developer",
    ...EXPERTISE,
  ],
  authors: [{ name: FULL_NAME, url: SITE_URL }],
  creator: FULL_NAME,
  publisher: FULL_NAME,
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
        <StructuredData />
        <noscript>
          <style>{`[data-intro-curtain]{display:none}[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-300 focus:px-4 focus:py-2 focus:rounded-full focus:bg-white focus:text-[#3b3e63] focus:font-semibold focus:shadow-lg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
