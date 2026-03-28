"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { AnimatePresence, motion } from "motion/react";
import { forwardRef, useState } from "react";
import * as Typography from "~/components/typography";
import { cn } from "~/lib/utils";

// ─── FAQ Data ──────────────────────────────────────────────
const FAQ_ITEMS = [
	{
		question: "How much does a project cost?",
		answer:
			"Branding starts at $20,000, websites at $15,000, landing pages at $12,000, and product design at $13,000 per month. Pricing scales with your company stage and project scope \u2014 growth-stage and enterprise projects can range up to six figures. Every project gets a fixed price upfront before work begins.",
	},
	{
		question: "What\u2019s included in the price?",
		answer:
			"Everything needed to deliver the result \u2014 strategy, design, development, and motion based on the project\u2019s needs. No add-ons unless the scope changes. Branding projects include logo design, visual identity systems, brand guidelines, and brand applications. Website projects include design, frontend development, CMS integration, and performance optimization.",
	},
	{
		question: "How long does a project take?",
		answer:
			"Branding takes 6\u201310 weeks. Websites take 6\u201316 weeks depending on whether it\u2019s design only or design and development. Landing pages take 5\u201310 weeks. Product design runs as a monthly retainer with a 3-month minimum.",
	},
	{
		question: "Do you work with early-stage startups?",
		answer:
			"Yes. Pricing is tiered by company stage \u2014 early-stage startups get competitive rates while the same quality of work scales for larger companies. We also offer an alternative fee structure: a reduced project fee combined with equity, with vesting tied to delivery milestones.",
	},
	{
		question: "How are payments structured?",
		answer:
			"Landing pages and branding projects under $25,000 are paid upfront. Branding over $25,000 and all website projects are split 50/50 \u2014 half upfront, half upon project completion. Product design is billed monthly with a 3-month minimum.",
	},
];

// ─── Toggle Icon ────────────────────────────────────────────
// 36×36 glass-btn circle with chevrons that flip between
// open (inward) and closed (outward) states.
function ToggleIcon({ isOpen }: { isOpen: boolean }) {
	return (
		<div className="glass-btn rounded-full w-9 h-9 min-w-0 p-0 shrink-0" tabIndex={-1} aria-hidden>
			{isOpen ? (
				<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
					<path d="M13.75 25.25L18 20.75L22.25 25.25" stroke="#E6E6E6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M13.75 10.75L18 15.25L22.25 10.75" stroke="#E6E6E6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			) : (
				<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
					<path d="M22.25 20.75L18 25.25L13.75 20.75" stroke="#E6E6E6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M22.25 15.25L18 10.75L13.75 15.25" stroke="#E6E6E6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			)}
		</div>
	);
}

// ─── Accordion Item ────────────────────────────────────────
interface FAQItemProps {
	question: string;
	answer: string;
	value: string;
	isOpen: boolean;
}

const FAQItem = forwardRef<HTMLDivElement, FAQItemProps>(
	({ question, answer, value, isOpen }, ref) => {
		return (
			<Accordion.Item
				ref={ref}
				value={value}
				className="group border-b border-white/10"
			>
				<Accordion.Header asChild>
					<Accordion.Trigger className="flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left sm:py-8">
						<Typography.P
							className={cn(
								"font-medium text-primary transition-opacity duration-300",
								!isOpen && "group-hover:opacity-80",
							)}
						>
							{question}
						</Typography.P>
						<ToggleIcon isOpen={isOpen} />
					</Accordion.Trigger>
				</Accordion.Header>

				<AnimatePresence initial={false}>
					{isOpen && (
						<Accordion.Content forceMount asChild>
							<motion.div
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: "auto", opacity: 1 }}
								exit={{ height: 0, opacity: 0 }}
								transition={{
									height: {
										duration: 0.35,
										ease: [0.25, 0.1, 0.25, 1],
									},
									opacity: {
										duration: 0.25,
										ease: "easeOut",
									},
								}}
								className="overflow-hidden"
							>
								<div className="pb-6 sm:pb-8 max-w-[800px] w-full">
									<Typography.Small
										className="whitespace-pre-line text-pretty text-secondary"
									>
										{answer}
									</Typography.Small>
								</div>
							</motion.div>
						</Accordion.Content>
					)}
				</AnimatePresence>
			</Accordion.Item>
		);
	},
);

FAQItem.displayName = "FAQItem";

// ─── Main Section ──────────────────────────────────────────
type FAQSectionProps = {
	className?: string;
};

export function FAQSection({ className }: FAQSectionProps) {
	const [openItem, setOpenItem] = useState<string>("item-0");

	return (
		<section
			className={cn(
				"relative z-10 bg-black pt-32 pb-4 sm:pt-48 sm:pb-6 lg:pt-64 lg:pb-8",
				className,
			)}
		>
			{/* Heading — single line, fills width */}
			<div className="mb-12 text-center sm:mb-16">
				<Typography.H2 className="text-primary whitespace-pre-line">
					{"Built to match your stage.\nStructured to deliver results."}
				</Typography.H2>
				<Typography.P className="text-secondary mx-auto mt-4 max-w-2xl">
					We price based on complexity, scope, and risk—not
					just hours on a clock.
					<br />
					You&apos;ll always get a clear number upfront.
				</Typography.P>
			</div>

			{/* FAQ Container */}
			<div
				className="relative z-10 overflow-hidden rounded-[10px] px-6 py-2 sm:px-10 sm:py-4 lg:px-12 max-w-[1062px] mx-auto"
				style={{
					border: "1px solid rgba(255, 255, 255, 0.06)",
					backgroundColor: "#0C0C0C",
					boxShadow: [
						// Inner border (16% white stroke)
						"inset 0 0 0 1px rgba(255, 255, 255, 0.16)",
						// Drop shadow 1: Y4 Blur4 Black 25%
						"0 4px 4px 0 rgba(0, 0, 0, 0.25)",
						// Drop shadow 2: Y284 Blur80 Black 1%
						"0 284px 80px 0 rgba(0, 0, 0, 0.01)",
						// Drop shadow 3: Y-53.13 Blur86.69 Black 27%
						"0 -53.13px 86.69px 0 rgba(0, 0, 0, 0.27)",
					].join(", "),
				}}
			>
				{/* CSS gradient glow */}
				<div
					className="absolute inset-0 pointer-events-none"
					style={{
						background:
							"radial-gradient(ellipse 80% 50% at 50% 100%, rgba(255, 255, 255, 0.03) 0%, transparent 70%)",
					}}
				/>
				<Accordion.Root
					type="single"
					defaultValue="item-0"
					value={openItem}
					onValueChange={(value) => {
						if (value) setOpenItem(value);
					}}
				>
					{FAQ_ITEMS.map((item, index) => (
						<FAQItem
							key={index}
							value={`item-${index}`}
							question={item.question}
							answer={item.answer}
							isOpen={openItem === `item-${index}`}
						/>
					))}
				</Accordion.Root>
			</div>
		</section>
	);
}
