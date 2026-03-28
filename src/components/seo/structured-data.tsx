export function OrganizationSchema() {
	const data = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "Kundo Studio",
		url: "https://www.kundo.studio",
		logo: "https://www.kundo.studio/og.png",
		description:
			"Branding, website design, product design and motion for startups and growing companies.",
		foundingDate: "2021",
		founder: {
			"@type": "Person",
			name: "Facundo Montanaro",
		},
		address: {
			"@type": "PostalAddress",
			addressCountry: "AR",
		},
		sameAs: [
			"https://twitter.com/kundostudio",
			"https://www.instagram.com/kundo.studio",
			"https://dribbble.com/kundostudio",
			"https://www.linkedin.com/company/kundostio",
		],
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
		/>
	);
}

export function WebSiteSchema() {
	const data = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "Kundo Studio",
		url: "https://www.kundo.studio",
		description:
			"Design the company you're becoming. Independent studio for branding, websites, product design, and motion.",
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
		/>
	);
}

interface ProjectSchemaProps {
	title: string;
	description?: string;
	slug: string;
	coverImage?: string;
	keywords?: string[];
}

export function ProjectSchema({
	title,
	description,
	slug,
	coverImage,
	keywords,
}: ProjectSchemaProps) {
	const data = {
		"@context": "https://schema.org",
		"@type": "CreativeWork",
		name: title,
		description: description || `${title} \u2014 A Kundo Studio project`,
		url: `https://www.kundo.studio/work/${slug}`,
		...(coverImage ? { image: coverImage } : {}),
		creator: {
			"@type": "Organization",
			name: "Kundo Studio",
			url: "https://www.kundo.studio",
		},
		...(keywords?.length ? { keywords: keywords.join(", ") } : {}),
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
		/>
	);
}

export function ContactPageSchema() {
	const data = {
		"@context": "https://schema.org",
		"@type": "ContactPage",
		name: "Contact Kundo Studio",
		description:
			"Get in touch with Kundo Studio for branding, website design, and product design projects for startups and companies.",
		url: "https://www.kundo.studio/contact",
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
		/>
	);
}
