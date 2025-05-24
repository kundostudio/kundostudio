<head>
  {/* Force dark mode on first paint */}
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
