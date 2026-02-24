import { TESTIMONIALS_QUERY } from "~/lib/queries";
import { sanityFetch } from "~/sanity/lib/live";
import { HomePage } from "./home/home";

export default async function Home() {
	const { data: testimonials } = await sanityFetch({
		query: TESTIMONIALS_QUERY,
	});

	return <HomePage testimonials={testimonials ?? []} />;
}
