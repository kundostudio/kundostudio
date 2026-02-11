"use client";

import * as Typography from "~/components/typography";
import { cn } from "~/lib/utils";

const SERVICES = [
	{
		number: "01",
		title: "Identity that compounds over time.",
		description:
			"For teams ready to be seen as established, not early-stage. Built to grow with you—cohesive, confident, and built to last.",
	},
	{
		number: "02",
		title: "Websites that win trust—and deals.",
		description:
			"Made for complex products and high-stakes buyers. Fast to understand, simple to manage, and made to support sales—not just show off.",
	},
	{
		number: "03",
		title: "Product design that unlocks momentum.",
		description:
			"UI/UX for real-world growth: smoother onboarding, faster launches, stronger retention. Designed to move with your team, not hold it back.",
	},
	{
		number: "04",
		title: "Motion design, built for clarity.",
		description:
			"Launch videos, interface motion, and branded animations that tell your story at a glance—and stay in people's heads.",
	},
];

type ServicesSectionProps = {
	className?: string;
};

export function ServicesSection({ className }: ServicesSectionProps) {
	return (
		<section className={cn("pt-[144px] pb-16 sm:pb-24 lg:pb-32", className)}>
			<div className="container mx-auto px-6 sm:px-8 lg:px-12">
				<div className="mx-auto flex max-w-[1008px] flex-col gap-12 lg:flex-row lg:gap-16">
					{/* Left column — headline */}
					<div className="lg:w-1/2 lg:sticky lg:top-32 lg:self-start">
						<Typography.H2 className="text-primary">
							We offer outcomes.
							<br />
							Not deliverables.
						</Typography.H2>
					</div>

					{/* Right column — service items */}
					<div className="w-full lg:w-1/2">
						{SERVICES.map((service, index) => (
							<div
								key={service.number}
								className={cn(
									index === 0
										? "pb-6 sm:pb-8"
										: "py-6 sm:py-8",
									index > 0 && "border-t border-white/10",
									index === SERVICES.length - 1 &&
										"border-b border-white/10",
								)}
							>
								<div className="flex flex-col gap-1">
									<Typography.P className="text-secondary">
										{service.number} — {service.title}
									</Typography.P>
									<Typography.H4 className="text-primary">
										{service.description}
									</Typography.H4>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
