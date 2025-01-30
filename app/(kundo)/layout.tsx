import type { Metadata } from "next";
import { VisualEditing } from "next-sanity";
import { Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";
import { draftMode } from "next/headers";

import { Columns } from "~/components/columns";
import { DisableDraftMode } from "~/components/disable-draft-mode";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { ThemeProvider } from "~/components/theme-provider";
import { SanityLive } from "~/sanity/lib/live";

import "~/styles/global.scss";

const mono = Roboto_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
  display: "swap",
});

const suisse = localFont({
  src: [
    {
      path: "../../public/fonts/SuisseIntl-Medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-suisse",
});

export const metadata: Metadata = {
  title: "Kundo Studio",
  description: "Creative studio from Argentina",

  // Open Graph
  openGraph: {
    title: "Kundo Studio",
    description: "Creative studio from Argentina",
    images: [
      {
        url: "/OG_light.png",
        width: 1200,
        height: 630,
        alt: "Kundo Studio",
      },
    ],
  },

  // Icons
  icons: {
    icon: [
      {
        url: "/favicon_light.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon_dark.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [
      {
        url: "/favicon_light.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon_dark.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon_dark.png",
      },
    ],
  },

  // Manifest
  manifest: "/manifest.json",
};

const COLUMNS_DIMENSIONS = {
  mobile: 4,
  mobileXL: 4,
  tablet: 8,
  laptop: 12,
  desktop: 12,
  desktopXL: 12,
} as const;

const COLUMNS_GAP = {
  mobile: 20,
  mobileXL: 20,
  tablet: 24,
  laptop: 32,
  desktop: 32,
  desktopXL: 32,
} as const;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraftMode = await (await draftMode()).isEnabled;
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className={`${mono.variable} ${suisse.variable} relative flex flex-col min-h-screen`}>
        <Header />
        {children}
        <SanityLive />
        {isDraftMode && (
          <>
            <DisableDraftMode />
            <VisualEditing />
          </>
        )}
        <Footer />
        <Columns dimensions={COLUMNS_DIMENSIONS} gap={COLUMNS_GAP} color="rgba(255, 0, 0, 0.2)" />
      </div>
    </ThemeProvider>
  );
}
