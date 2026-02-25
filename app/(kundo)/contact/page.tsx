import type { Metadata } from "next";
import { CONTACT_QUERY } from "~/lib/queries";
import { sanityFetch } from "~/sanity/lib/live";

import { ContactPage } from "./contact";

export const metadata: Metadata = {
	title: "Contact",
	description:
		"Get in touch with Kundo Studio. Book an intro call or reach out to discuss your next branding, web, or product design project.",
	alternates: {
		canonical: "https://kundo.studio/contact",
	},
};

export default async function Contact() {
  const { data: contactData } = await sanityFetch({ query: CONTACT_QUERY });

  return (
    <ContactPage contactData={contactData} />
  );
}
 