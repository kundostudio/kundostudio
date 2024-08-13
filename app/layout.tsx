import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { DM_Mono } from "next/font/google";
import localFont from "next/font/local";

import "~/styles/global.scss";
// import { App } from "../src/components/app";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dm_mono.variable} ${youth.variable}`}>
      <link rel="icon" href="/favicon.png" sizes="any" />
      <body>
        <App>{children}</App>
      </body>
    </html>
  );
}
