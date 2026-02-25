import type { Metadata } from "next";
import { ABOUT_QUERY } from "~/lib/queries";
import { sanityFetch } from "~/sanity/lib/live";

import { AboutPage } from "./about";

export const metadata: Metadata = {
	title: "About",
	description:
		"Shaped by intent, precision, simplicity, and care. We work with intention — tuning every element to reflect clarity, utility, and strength.",
	alternates: {
		canonical: "https://kundo.studio/about",
	},
};

export default async function About() {
  const { data: aboutData } = await sanityFetch({ query: ABOUT_QUERY });

  return (
    <AboutPage aboutData={aboutData} />
  );
}
 