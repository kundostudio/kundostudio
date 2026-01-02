import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";

import { Columns } from "~/components/columns";
import { DisableDraftMode } from "~/components/disable-draft-mode";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";

import { SanityLive } from "~/sanity/lib/live";

import "~/styles/global.css";

export const metadata: Metadata = {
	title: "Kundo Studio",
	description: "Creative studio from Argentina",

	// Open Graph
	openGraph: {
		title: "Kundo Studio",
		description: "Creative studio from Argentina",
		url: "https://kundo.studio",
		siteName: "Kundo Studio",
		images: [
			{
				url: "/OG.png",
				width: 1200,
				height: 630,
				alt: "Kundo Studio",
			},
		],
		type: "website",
	},

	// Twitter Card
	twitter: {
		card: "summary_large_image",
		title: "Kundo Studio",
		description: "Creative studio from Argentina",
		images: ["/OG.png"],
	},

	// Icons
	icons: {
		icon: "/favicon.svg",
		apple: "/favicon.svg",
		other: [
			{
				rel: "mask-icon",
				url: "/favicon.svg",
			},
		],
	},

	// Manifest
	manifest: "/manifest.json",
};

const COLUMNS_DIMENSIONS = {
	mobile: 4,
	mobileXL: 4,
	tablet: 8,
	laptop: 12,
	desktop: 12,
	desktopXL: 12,
} as const;

const COLUMNS_GAP = {
	mobile: 20,
	mobileXL: 20,
	tablet: 24,
	laptop: 32,
	desktop: 32,
	desktopXL: 32,
} as const;

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const isDraftMode = await (await draftMode()).isEnabled;
	return (
		<div className="relative flex flex-col min-h-svh">
			<Header className="absolute top-10 left-0 right-0 z-100" />
			{children}
			<SanityLive />
			{isDraftMode && (
				<>
					<DisableDraftMode />
					<VisualEditing />
				</>
			)}
			<Footer />
			<Columns dimensions={COLUMNS_DIMENSIONS} gap={COLUMNS_GAP} color="rgba(255, 0, 0, 0.2)" />
		</div>
	);
}
