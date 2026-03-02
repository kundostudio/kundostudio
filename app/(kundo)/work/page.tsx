import type { Metadata } from "next";
import { WORKS_QUERY } from "~/lib/queries";
import { sanityFetch } from "~/sanity/lib/live";

import { WorksPage } from "./works";

export const metadata: Metadata = {
	title: {
		absolute: "Our Work — Branding & Web Design Case Studies | Kundo Studio",
	},
	description:
		"See how we help startups and companies build brands, websites, and products that scale. Detailed case studies with real outcomes.",
	openGraph: {
		title: "Our Work — Branding & Web Design Case Studies | Kundo Studio",
		description:
			"See how we help startups and companies build brands, websites, and products that scale. Detailed case studies with real outcomes.",
		url: "https://www.kundo.studio/work",
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
		title: "Our Work — Branding & Web Design Case Studies | Kundo Studio",
		description:
			"See how we help startups and companies build brands, websites, and products that scale. Detailed case studies with real outcomes.",
		images: ["https://www.kundo.studio/og.png"],
	},
	alternates: {
		canonical: "https://www.kundo.studio/work",
	},
};

export default async function Work() {
  const { data: worksData } = await sanityFetch({ query: WORKS_QUERY });

  return (
    <WorksPage worksData={worksData} />
  );
}
