import type { AboutV2Page } from "~/lib/queries";

const FALLBACK_DESCRIPTION = `Kundo is a design and development studio based in Buenos Aires, working with founders, startups, and growing companies worldwide. We build brands, websites, and products \u2014 each one shaped by intention, clarity, and craft.

We treat every project as a practice: precise in structure, adaptive in process, purposeful in every detail. The work isn\u2019t about embellishment \u2014 it\u2019s about finding the essential form that lets your company grow with confidence.

We move with context. Early-stage, scaling, or in transition \u2014 we meet you where you are and design what holds together: visually, strategically, and structurally. When people encounter what we build, it makes sense. It feels considered. It lasts.`;

const FALLBACK_SERVICES = [
	{
		category: "Brand",
		description:
			"The foundation. We design identities that carry clarity and restraint.",
		items: [
			"Logo Design",
			"Visual Identity Systems",
			"Brand Guidelines",
			"Brand Applications",
			"Pitch Deck Design",
		],
	},
	{
		category: "Web",
		description: "Websites that earn trust from the first scroll.",
		items: [
			"Website Design",
			"Landing Page Design",
			"Frontend Development",
			"CMS Integration",
			"Performance Optimization",
		],
	},
	{
		category: "Product",
		description:
			"Interfaces designed with care for the people who use them.",
		items: [
			"Product Design",
			"UI/UX Design",
			"Wireframes & Prototyping",
			"Interaction Design",
			"Design Systems",
		],
	},
	{
		category: "Motion",
		description: "Movement that communicates, not decorates.",
		items: [
			"Motion Design",
			"Brand Videos",
			"Explainer Videos",
			"Product Videos",
			"UI Animation",
		],
	},
];

const textClass =
	"font-inter text-[12px] font-normal leading-[18px] tracking-[0.2px] text-primary";

export function AboutPage({
	aboutData,
}: {
	aboutData: AboutV2Page | null;
}) {
	const description = aboutData?.descriptionV2 || FALLBACK_DESCRIPTION;
	const services = aboutData?.servicesV2 ?? FALLBACK_SERVICES;
	const paragraphs = description.split("\n\n");

	return (
		<div className="flex flex-col min-h-screen px-6 pt-[56px]">
			{/* Description */}
			<div className="flex flex-col gap-[14px] max-w-[400px]">
				{paragraphs.map((paragraph, i) => (
					<p
						key={i}
						className={`${textClass} text-balance animate-enter`}
						style={{ "--stagger": i } as React.CSSProperties}
					>
						{paragraph}
					</p>
				))}
			</div>

			{/* Services */}
			<div
				className="mt-10 max-w-[400px] animate-enter"
				style={{ "--stagger": paragraphs.length } as React.CSSProperties}
			>
				<span className={textClass}>Services:</span>

				{services.map((service) => (
					<div key={service.category} className="mt-[14px]">
						<span className={textClass}>&mdash; {service.category}</span>
						{"description" in service && service.description && (
							<p className={`${textClass} mt-[2px]`}>
								{service.description}
							</p>
						)}
						<div className="flex flex-col mt-[2px]">
							{service.items.map((item) => (
								<span key={item} className={textClass}>
									{item}
								</span>
							))}
						</div>
					</div>
				))}
			</div>

			{/* Spacer to push footer down */}
			<div className="flex-1" />
		</div>
	);
}
