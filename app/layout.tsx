import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { DM_Mono } from "next/font/google";
import localFont from "next/font/local";

import { Favicon } from "~/components/favicon";

import { QueryProvider } from "./query-client";

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

const neue = localFont({
  src: [
    {
      path: "../public/fonts/neue.woff2",
      weight: "400",
      style: "regular",
    },
  ],
  variable: "--font-neue",
});

export const metadata: Metadata = {
  title: "MEOW",
  description: "a hyper-fast blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dm_mono.variable} ${youth.variable} ${neue.variable}`}>
      <Favicon />
      <body>
        <QueryProvider>
          <App>{children}</App>
        </QueryProvider>
      </body>
    </html>
  );
}
