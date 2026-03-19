import type { Metadata } from "next";

import { ContactPageSchema } from "~/components/seo/structured-data";
import { ContactPage } from "./contact";

export const metadata: Metadata = {
	title: "Contact",
	description:
		"Tell us about your project. Branding, website design, product design and motion for startups and growing companies.",
	openGraph: {
		title: "Contact Kundo Studio",
		description:
			"Tell us about your project. Branding, website design, product design and motion for startups and growing companies.",
		url: "https://www.kundo.studio/contact",
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
		title: "Contact Kundo Studio",
		description:
			"Tell us about your project. Branding, website design, product design and motion for startups and growing companies.",
		images: ["https://www.kundo.studio/og.png"],
	},
	alternates: {
		canonical: "https://www.kundo.studio/contact",
	},
};

export default function Contact() {
	return (
		<>
			<ContactPageSchema />
			<ContactPage />
		</>
	);
}
