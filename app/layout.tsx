import { Inter } from "next/font/google";

const inter = Inter({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-inter",
	display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon-light.svg" media="(prefers-color-scheme: light)" />
				<link rel="icon" href="/favicon-dark.svg" media="(prefers-color-scheme: dark)" />
			</head>
			<body className={`${inter.variable} antialiased relative flex flex-col min-h-svh`}>
				<svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
					<filter id="glassNoiseFilter">
						<feTurbulence type="fractalNoise" baseFrequency="6.29" numOctaves="2" stitchTiles="stitch" />
						<feColorMatrix type="saturate" values="0" />
					</filter>
				</svg>
				{children}
			</body>
		</html>
	);
}
