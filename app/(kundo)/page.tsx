import { HOME_QUERY } from "~/lib/queries";
import { sanityFetch } from "~/sanity/lib/live";

import { HomePage } from "./home/home";

export default async function Home() {
	const { data } = await sanityFetch({ query: HOME_QUERY });

	return <HomePage title={data?.title} assets={data?.assets} imageDuration={data?.imageDuration} />;
}
