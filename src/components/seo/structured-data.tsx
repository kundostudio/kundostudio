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

export function FAQSchema() {
	const data = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: [
			{
				"@type": "Question",
				name: "How much does a project cost?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "Branding starts at $20,000, websites at $15,000, landing pages at $12,000, and product design at $13,000 per month. Pricing scales with your company stage and project scope \u2014 growth-stage and enterprise projects can range up to six figures. Every project gets a fixed price upfront before work begins.",
				},
			},
			{
				"@type": "Question",
				name: "What\u2019s included in the price?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "Everything needed to deliver the result \u2014 strategy, design, development, and motion based on the project\u2019s needs. No add-ons unless the scope changes. Branding projects include logo design, visual identity systems, brand guidelines, and brand applications. Website projects include design, frontend development, CMS integration, and performance optimization.",
				},
			},
			{
				"@type": "Question",
				name: "How long does a project take?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "Branding tak0 weeks. Websites take 6\u201316 weeks depending on whether it\u2019s design only or design and development. Landing pages take 5\u201310 weeks. Product design runs as a monthly retainer with a 3-month minimum.",
				},
			},
			{
				"@type": "Question",
				name: "Do you work with early-stage startups?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "Yes. Pricing is tiered by company stage \u2014 early-stage startups get competitive rates while the same quality of work scales for larger companies. We also offer an alternative fee structure: a reduced project fee combined with equity, with vesting tied to delivery milestones.",
				},
			},
			{
				"@type": "Question",
				name: "How are payments structured?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "Landing pages and branding projects under $25,000 are paid upfront. Branding over $25,000 and all website projects are split 50/50 \u2014 half upfront, half upon project completion. Product design is billed monthly with a 3-month minimum.",
				},
			},
		],
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
