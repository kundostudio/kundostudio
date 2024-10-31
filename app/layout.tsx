import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { DM_Mono } from "next/font/google";
import localFont from "next/font/local";

import { Favicon } from "~/components/favicon";

import "~/styles/global.scss";

const App = dynamic(() => import("~/components/app").then((mod) => mod.App), {
  ssr: false,
});

const dm_mono = DM_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-mono",
  display: "swap",
});

const youth = localFont({
  src: [
    {
      path: "../public/fonts/youth-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/youth-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-youth",
});

export const metadata: Metadata = {
  title: "MEOW",
  description: "a hyper-fast blockchain",
  openGraph: {
    images: [
      {
        url: "https://meow.kundo.studio/opengraph-image.png",
        width: 1200,
        height: 630,
      },
      {
        url: "https://meow.kundo.studio/twitter-image.png",
        width: 1500,
        height: 500,
      },
    ],
  },
  twitter: {
    title: "MEOW",
    description: "a hyper-fast blockchain",
    card: "summary_large_image",
    images: ["https://meow.kundo.studio/twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dm_mono.variable} ${youth.variable}`}>
      <Favicon />
      <body>
        <App>{children}</App>
      </body>
    </html>
  );
}
