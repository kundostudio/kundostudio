import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";

import { Columns } from "~/components/columns";
import { DisableDraftMode } from "~/components/disable-draft-mode";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { OrganizationSchema } from "~/components/seo/structured-data";

import { SanityLive } from "~/sanity/lib/live";

import "~/styles/global.css";

export const metadata: Metadata = {
	metadataBase: new URL("https://www.kundo.studio"),
	title: {
		default: "Kundo Studio — Branding & Website Design for Startups & Companies",
		template: "%s | Kundo Studio",
	},
	description:
		"Branding, website design, product design and motion for startups and growing companies. From strategy to launch — cohesive systems built to scale.",
	keywords: [
		"design studio",
		"branding",
		"web design",
		"product design",
		"motion design",
		"UI/UX",
		"design agency",
		"startup branding",
		"website design for startups",
		"branding for companies",
		"website design for companies",
	],
	authors: [{ name: "Kundo Studio" }],
	creator: "Kundo Studio",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://www.kundo.studio",
		siteName: "Kundo Studio",
		title: "Kundo Studio — Branding & Website Design for Startups & Companies",
		description:
			"Branding, website design, product design and motion for startups and growing companies. From strategy to launch — cohesive systems built to scale.",
		images: [
			{
				url: "https://www.kundo.studio/og.png",
				width: 1200,
				height: 630,
				alt: "Kundo Studio",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Kundo Studio — Branding & Website Design for Startups & Companies",
		description:
			"Branding, website design, product design and motion for startups and growing companies. From strategy to launch — cohesive systems built to scale.",
		images: ["https://www.kundo.studio/og.png"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
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
			<OrganizationSchema />
			<Header className="absolute top-0 left-0 right-0 z-100" />
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
