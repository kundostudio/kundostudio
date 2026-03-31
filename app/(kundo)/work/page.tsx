import type { Metadata } from "next";
import { WORKS_QUERY } from "~/lib/queries";
import { sanityFetch } from "~/sanity/lib/live";
import { WorksPage } from "./works";

export const metadata: Metadata = {
	title: {
		absolute:
			"Our Work — Branding, Web & Product Design Case Studies | Kundo Studio",
	},
	description:
		"Selected projects by Kundo Studio. Branding, website design, product design, and development for startups and growing companies.",
	openGraph: {
		title:
			"Our Work — Branding, Web & Product Design Case Studies | Kundo Studio",
		description:
			"Selected projects by Kundo Studio. Branding, website design, product design, and development for startups and growing companies.",
		url: "https://www.kundo.studio/work",
		siteName: "Kundo Studio",
		locale: "en_US",
		type: "website",
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
		title:
			"Our Work — Branding, Web & Product Design Case Studies | Kundo Studio",
		description:
			"Selected projects by Kundo Studio. Branding, website design, product design, and development for startups and growing companies.",
		images: ["https://www.kundo.studio/og.png"],
	},
	alternates: {
		canonical: "https://www.kundo.studio/work",
	},
};

export default async function Work() {
	const { data: worksData } = await sanityFetch({ query: WORKS_QUERY });
	return <WorksPage worksData={worksData} />;
}
