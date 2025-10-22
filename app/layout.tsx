import { Inter, Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({
	subsets: ["latin"],
	weight: "500",
	variable: "--font-inter",
	display: "swap",
});

const mono = Roboto_Mono({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-mono",
	display: "swap",
});

const neue = localFont({
	src: [
		{
			path: "../public/fonts/NeueHaasDisplayMedium.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "../public/fonts/NeueHaasDisplayBold.woff2",
			weight: "700",
			style: "normal",
		},
	],
	variable: "--font-neue",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body
				className={`${mono.variable} ${neue.variable} ${inter.variable} relative flex flex-col min-h-svh`}
			>
				{children}
			</body>
		</html>
	);
}
