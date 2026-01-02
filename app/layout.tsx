import localFont from "next/font/local";

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
			<body className={`${neue.variable} relative flex flex-col min-h-svh`}>{children}</body>
		</html>
	);
}
