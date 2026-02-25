import type { Metadata } from "next";
import { TESTIMONIALS_QUERY } from "~/lib/queries";
import { sanityFetch } from "~/sanity/lib/live";
import { FAQSchema, WebSiteSchema } from "~/components/seo/structured-data";
import { HomePage } from "./home/home";

export const metadata: Metadata = {
	title: "Kundo Studio — Design that moves you forward",
	description:
		"We offer outcomes, not deliverables. Branding, websites, product design, and motion for teams ready to grow. Book an intro call.",
	alternates: {
		canonical: "https://kundo.studio",
	},
};

export default async function Home() {
	const { data: testimonials } = await sanityFetch({
		query: TESTIMONIALS_QUERY,
	});

	return (
		<>
			<WebSiteSchema />
			<FAQSchema />
			<HomePage testimonials={testimonials ?? []} />
		</>
	);
}
