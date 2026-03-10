"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { AnimatePresence, motion } from "motion/react";
import { forwardRef, useState } from "react";
import * as Typography from "~/components/typography";
import { cn } from "~/lib/utils";

// ─── FAQ Data ──────────────────────────────────────────────
const FAQ_ITEMS = [
	{
		question: "How much does a project usually cost?",
		answer:
			"We tailor pricing based on your company stage, complexity, and what success looks like. Branding starts at $20,000, websites at $12,000, product design at $10,000, and landing pages at $10,000. Larger initiatives can range up to six figures. You\u2019ll always get a clear number before we begin \u2014 no vague estimates, no surprises.",
	},
	{
		question: "Can I get a clear price before starting?",
		answer:
			"Always. We scope the engagement with you, then quote a clear structure\u2014either a fixed project fee or a structured monthly phase. No vague estimaded buffers. We price by outcomes, not inputs. Who works on what stays behind the scenes.",
	},
	{
		question: "What\u2019s included in the price?",
		answer:
			"Everything needed to deliver the result\u2014no add-ons unless the scope changes. We include brand, design, motion, development, or strategy based on the project\u2019s needs.",
	},
	{
		question: "Do you offer standalone landing pages?",
		answer:
			"Yes. We design single-page sites starting at $10k. Most engagements are structured to continue beyond launch, ensuring the work performs once it\u2019s in the real world.",
	},
	{
		question: "How is work typically structured?",
		answer:
			"Every engagement has two phases. The foundation is where we define the scope, align on goals, and build the work that sets the standard. Once it launches, we move into a cycle \u2014 ongoing monthly design where we refine based on real feedback, real users, and real results. Typically 3 to 6 months.",
	},
	{
		question: "How are payments structured?",
		answer:
			"Most project work is paid upfront. For larger builds, we sos structure payments in phases. Ongoing work is billed monthly, in advance.",
	},
	{
		question: "Do you work with early-stage companies?",
		answer:
			"Yes. We offer flexible structures for early-stage founders. Not every great company starts with a big budget \u2014 we\u2019ll find a way to work together if the project is right.",
	},
	{
		question: "What is the Cycle?",
		answer:
			"The cycle is what comes after the foundation. Once your brand, site, or product meets the real world, we stay to refine it \u2014 adjusting based on real feedback and real usage. It\u2019s built into every engagement from the start, typically running 3 to 6 months.",
	},
	{
		question: "Do you offer alternative fee structures?",
		answer:
			"For the right partnership, yes. We offer two paths on every proposal: a standard project fee, or a reduced fee combined with a stake in the outcome\u2014equity with vesting and a capped share of revenue. Both are defined clearly upfront. We don\u2019t absorb costs against future upside; the economics work for both sides from day one.",
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
