import type { Metadata } from "next";
import { TESTIMONIALS_QUERY } from "~/lib/queries";
import { sanityFetch } from "~/sanity/lib/live";
import { FAQSchema, OrganizationSchema, WebSiteSchema } from "~/components/seo/structured-data";
import { HomePage } from "./home/home";

export const metadata: Metadata = {
	title: {
		absolute: "Kundo Studio — Branding & Website Design for Startups & Companies",
	},
	description:
		"Branding, website design, product design and motion for startups and growing companies. From strategy to launch — cohesive systems built to scale.",
	openGraph: {
		title: "Kundo Studio — Branding & Website Design for Startups & Companies",
		description:
			"Branding, website design, product design and motion for startups and growing companies. From strategy to launch — cohesive systems built to scale.",
		url: "https://www.kundo.studio",
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
		title: "Kundo Studio — Branding & Website Design for Startups & Companies",
		description:
			"Branding, website design, product design and motion for startups and growing companies. From strategy to launch — cohesive systems built to scale.",
		images: ["https://www.kundo.studio/og.png"],
	},
	alternates: {
		canonical: "https://www.kundo.studio",
	},
};

export default async function Home() {
	const { data: testimonials } = await sanityFetch({
		query: TESTIMONIALS_QUERY,
	});

	return (
		<>
			<OrganizationSchema />
			<WebSiteSchema />
			<FAQSchema />
			<HomePage testimonials={testimonials ?? []} />
		</>
	);
}
