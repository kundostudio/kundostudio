export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* FORCE DARK MODE BEFORE HYDRATION */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.documentElement.classList.add('dark');
              localStorage.setItem('theme', 'dark');
            `,
          }}
        />
      </head>
      <body className="bg-background text-foreground" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
