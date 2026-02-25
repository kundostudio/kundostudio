export function OrganizationSchema() {
	const data = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "Kundo Studio",
		url: "https://kundo.studio",
		logo: "https://kundo.studio/logo.png",
		description:
			"Independent design studio specializing in branding, websites, product design, and motion.",
		foundingDate: "2024",
		contactPoint: {
			"@type": "ContactPoint",
			email: "hello@kundo.studio",
			contactType: "sales",
		},
		sameAs: [],
		knowsAbout: [
			"Brand Identity Design",
			"Web Design",
			"Product Design",
			"UI/UX Design",
			"Motion Design",
			"Design Systems",
			"Frontend Development",
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
		url: "https://kundo.studio",
		description:
			"Design that moves you forward. Independent studio for branding, websites, product design, and motion.",
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
				name: "How much does a project usually cost?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "We tailor pricing based on your company stage, complexity, and what success looks like. Most projects start around $8,000, with larger initiatives ranging up to six figures. You\u2019ll always get a clear number before we begin\u2014no vague estimates, no surprises.",
				},
			},
			{
				"@type": "Question",
				name: "Can I get a clear price before starting?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "Always. We scope the engagement with you, then quote a clear structure\u2014either a fixed project fee or a structured monthly phase. No vague estimates, padded buffers. We price by outcomes, not inputs. Who works on what stays behind the scenes.",
				},
			},
			{
				"@type": "Question",
				name: "What\u2019s included in the price?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "Everything needed to deliver the result\u2014no add-ons unless the scope changes. We include brand, design, motion, development, or strategy based on the project\u2019s needs.",
				},
			},
			{
				"@type": "Question",
				name: "Do you offer standalone landing pages?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "Yes. We design single-page sites starting at $10k. Most engagements are structured to continue beyond launch, ensuring the work performs once it\u2019s in the real world.",
				},
			},
			{
				"@type": "Question",
				name: "How is work typically structured?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "We work by company stage, not isolated projects. Every engagement begins with a foundational phase\u2014the core build\u2014and is often followed by a structured period of refinement or expansion, so the work doesn\u2019t just launch but holds up over time.",
				},
			},
			{
				"@type": "Question",
				name: "How are payments structured?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "Most project work is paid upfront. For larger builds, we sometimes structure payments in phases. Ongoing work is billed monthly, in advance.",
				},
			},
			{
				"@type": "Question",
				name: "Do you work with early-stage companies?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "Yes\u2014if you\u2019re serious about quality. We adjust scope and approach to fit your context without compromising the outcome.",
				},
			},
			{
				"@type": "Question",
				name: "Do you offer alternative fee structures?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "For the right partnership, yes. We offer two paths on every proposal: a standard project fee, or a reduced fee combined with a stake in the outcome\u2014equity with vesting and a capped share of revenue. Both are defined clearly upfront. We don\u2019t absorb costs against future upside; the economics work for both sides from day one.",
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
}

export function ProjectSchema({
	title,
	description,
	slug,
	coverImage,
}: ProjectSchemaProps) {
	const data = {
		"@context": "https://schema.org",
		"@type": "CreativeWork",
		name: title,
		description: description || `${title} — A Kundo Studio project`,
		creator: {
			"@type": "Organization",
			name: "Kundo Studio",
		},
		...(coverImage ? { image: coverImage } : {}),
		url: `https://kundo.studio/work/${slug}`,
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
		/>
	);
}
