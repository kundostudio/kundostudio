import type { MetadataRoute } from "next";
import { client } from "~/sanity/lib/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const slugs: string[] = await client.fetch(
		`*[_type == "project" && defined(slug.current) && visible == true].slug.current`,
	);

	const projectUrls = slugs.map((slug) => ({
		url: `https://www.kundo.studio/work/${slug}`,
		lastModified: new Date(),
		changeFrequency: "monthly" as const,
		priority: 0.7,
	}));

	return [
		{
			url: "https://www.kundo.studio",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1.0,
		},
		{
			url: "https://www.kundo.studio/about",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: "https://www.kundo.studio/work",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: "https://www.kundo.studio/contact",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.6,
		},
		...projectUrls,
	];
}
