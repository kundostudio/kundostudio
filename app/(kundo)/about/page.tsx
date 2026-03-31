import type { Metadata } from "next";
import { ABOUT_V2_QUERY } from "~/lib/queries";
import { sanityFetch } from "~/sanity/lib/live";
import { AboutPage } from "./about";

export const metadata: Metadata = {
	title: {
		absolute:
			"Kundo Studio — Design & Development Studio for Brands, Websites & Products | Buenos Aires",
	},
	description:
		"Kundo is a design and development studio based in Buenos Aires. We work with founders, startups, and growing companies to build brands, websites, and products shaped by intention and craft.",
	openGraph: {
		title:
			"Kundo Studio — Design & Development Studio for Brands, Websites & Products | Buenos Aires",
		description:
			"Kundo is a design and development studio based in Buenos Aires. We work with founders, startups, and growing companies to build brands, websites, and products shaped by intention and craft.",
		url: "https://www.kundo.studio/about",
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
			"Kundo Studio — Design & Development Studio for Brands, Websites & Products | Buenos Aires",
		description:
			"Kundo is a design and development studio based in Buenos Aires. We work with founders, startups, and growing companies to build brands, websites, and products shaped by intention and craft.",
		images: ["https://www.kundo.studio/og.png"],
	},
	alternates: {
		canonical: "https://www.kundo.studio/about",
	},
};

export default async function About() {
	const { data: aboutData } = await sanityFetch({ query: ABOUT_V2_QUERY });
	return <AboutPage aboutData={aboutData} />;
}
