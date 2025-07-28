import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kundo Studio",
  description: "A collaborative studio practice.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Forzar dark mode en el primer render */}
        <style>{`
          html {
            background: black;
            color-scheme: dark;
          }
          html:not(.dark) {
            transition: none !important;
            color-scheme: dark !important;
          }
        `}</style>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.documentElement.classList.remove('light');
              document.documentElement.classList.add('dark');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
