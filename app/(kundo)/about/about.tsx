import type { AboutV2Page } from "~/lib/queries";

const FALLBACK_DESCRIPTION = `Kundo is a design and development studio that partners with founders, startups, and companies to build the brands, websites, and products they need to become the company they envision.

Shaped by precision, simplicity and care we work with intention\u2014tuning every element to reflect clarity, utility, and strength. No filler, no fluff. Just the right foundations to help you grow.

We adapt to context, but we always move with precision. Early-stage, late-stage, or in transition\u2014we shape what\u2019s next without losing sight of what matters.

What we build holds together\u2014visually, structurally, and strategically. So when people see it, use it, or move through it, it just makes sense.`;

const FALLBACK_SERVICES = [
	{
		category: "Brand",
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

				{services.map((service, sIdx) => (
					<div key={service.category} className="mt-[14px]">
						<span className={textClass}>&mdash; {service.category}</span>
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
