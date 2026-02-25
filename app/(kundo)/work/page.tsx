import type { Metadata } from "next";
import { WORKS_QUERY } from "~/lib/queries";
import { sanityFetch } from "~/sanity/lib/live";

import { WorksPage } from "./works";

export const metadata: Metadata = {
	title: "Work",
	description:
		"Selected projects across branding, websites, product design, and motion. See how we help teams look established and sell with confidence.",
	alternates: {
		canonical: "https://kundo.studio/work",
	},
};

export default async function Work() {
  const { data: worksData } = await sanityFetch({ query: WORKS_QUERY });

  return (
    <WorksPage worksData={worksData} />
  );
}
