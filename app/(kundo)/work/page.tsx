import { WORKS_QUERY } from "~/lib/queries";
import { sanityFetch } from "~/sanity/lib/live";

import { WorksPage } from "./works";

export default async function Work() {
  const { data: worksData } = await sanityFetch({ query: WORKS_QUERY });

  return (
    <WorksPage worksData={worksData} />
  );
}
