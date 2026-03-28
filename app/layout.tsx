import { Inter } from "next/font/google";

const inter = Inter({
	subsets: ["latin"],
	weight: ["400", "500", "600"],
	variable: "--font-inter",
	display: "optional",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<link rel="preconnect" href="https://image.mux.com" />
				<link rel="preload" as="image" href="https://image.mux.com/HloZlUniR6E5700REH01hfoPdy57D9g02tLo7UU100ctsS00/thumbnail.webp?width=960&height=540&time=0&fit_mode=smartcrop" fetchPriority="high" />
				<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
			</head>
			<body className={`${inter.variable} antialiased relative flex flex-col min-h-svh`}>
				{children}
			</body>
		</html>
	);
}
