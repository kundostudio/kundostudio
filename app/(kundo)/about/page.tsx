import type { Metadata } from "next";
import { ABOUT_QUERY } from "~/lib/queries";
import { sanityFetch } from "~/sanity/lib/live";

import { AboutPage } from "./about";

export const metadata: Metadata = {
	title: {
		absolute: "About Kundo Studio — Design Studio for Startups & Companies",
	},
	description:
		"Founded by Facu Montanaro. A design studio helping startups and companies with branding, web design, product design and motion. Based in Argentina, working globally.",
	openGraph: {
		title: "About Kundo Studio — Design Studio for Startups & Companies",
		description:
			"Founded by Facu Montanaro. A design studio helping startups and companies with branding, web design, product design and motion. Based in Argentina, working globally.",
		url: "https://www.kundo.studio/about",
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
		title: "About Kundo Studio — Design Studio for Startups & Companies",
		description:
			"Founded by Facu Montanaro. A design studio helping startups and companies with branding, web design, product design and motion. Based in Argentina, working globally.",
		images: ["https://www.kundo.studio/og.png"],
	},
	alternates: {
		canonical: "https://www.kundo.studio/about",
	},
};

export default async function About() {
  const { data: aboutData } = await sanityFetch({ query: ABOUT_QUERY });

  return (
    <AboutPage aboutData={aboutData} />
  );
}
 