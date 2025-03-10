import { ABOUT_QUERY } from "~/lib/queries";
import { sanityFetch } from "~/sanity/lib/live";

import { AboutPage } from "./about";

export default async function About() {
  const { data: aboutData } = await sanityFetch({ query: ABOUT_QUERY });

  return (
    <AboutPage aboutData={aboutData} />
  );
}
 