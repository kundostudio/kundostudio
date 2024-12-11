import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";

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
      path: "../public/fonts/SuisseIntl-Medium.otf",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${mono.variable} ${suisse.variable}`}>
      <body>{children}</body>
    </html>
  );
}
