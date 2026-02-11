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
			"We tailor pricing based on your company stage, complexity, and what success looks like. Most projects start around $8,000, with larger initiatives ranging up to six figures. You'll always get a clear number before we begin—no vague estimates, no surprises.",
	},
	{
		question: "Can I get a clear price before starting?",
		answer:
			"Always. We scope the engagement with you, then quote a clear structure—either a fixed project fee or a structured monthly phase. No vague estimates or padded buffers. We price by outcomes, not inputs. Who works on what stays behind the scenes.",
	},
	{
		question: "What's included in the price?",
		answer:
			"Everything needed to deliver the result—no add-ons unless the scope changes. We include brand, design, motion, development, or strategy based on the project's needs.",
	},
	{
		question: "Do you offer standalone landing pages?",
		answer:
			"Yes. We design single-page sites starting at $10k. Most engagements are structured to continue beyond launch, ensuring the work performs once it's in the real world.",
	},
	{
		question: "How is work typically structured?",
		answer:
			"We work by company stage, not isolated projects. Every engagement begins with a foundational phase and is often followed by a structured period of iteration or growth—so the work doesn't just launch, but holds up over time.",
	},
	{
		question: "How are payments structured?",
		answer:
			"Payment structure depends on the type of engagement.\nProject-based phases are paid upfront. Ongoing work is paid monthly, in advance.",
	},
	{
		question: "Do you work with early-stage companies?",
		answer:
			"Yes—if you're serious about quality. We adjust scope and approach to fit your context without compromising the outcome.",
	},
	{
		question: "Do you work on equity?",
		answer:
			"Occasionally. Only with strong alignment and a clear value path.",
	},
];

// ─── Glassmorphism Toggle Icon (from Figma) ────────────────
// 36x36 circle with gradient fill, backdrop blur, and two
// chevrons that flip direction between open/closed states.
// Each instance gets a unique `id` prefix to avoid SVG ID collisions.
function ToggleIcon({ isOpen, id }: { isOpen: boolean; id: string }) {
	return (
		<div className="shrink-0">
			<svg
				width="36"
				height="36"
				viewBox="0 0 36 36"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				{/* Backdrop blur via foreignObject */}
				<foreignObject x="-10" y="-10" width="56" height="56">
					<div
						style={{
							backdropFilter: "blur(5px)",
							WebkitBackdropFilter: "blur(5px)",
							clipPath: `url(#${id}_bgclip)`,
							height: "100%",
							width: "100%",
						}}
					/>
				</foreignObject>

				<g data-figma-bg-blur-radius="10">
					<g clipPath={`url(#${id}_clip)`}>
						{/* Base gradient fill */}
						<rect
							width="36"
							height="36"
							rx="18"
							fill={`url(#${id}_grad0)`}
						/>

						{/* Masked overlay gradient */}
						<mask
							id={`${id}_mask`}
							style={{ maskType: "alpha" }}
							maskUnits="userSpaceOnUse"
							x="0"
							y="0"
							width="36"
							height="36"
						>
							<rect width="36" height="36" fill="black" />
						</mask>
						<g mask={`url(#${id}_mask)`}>
							<rect
								width="36"
								height="36"
								rx="18"
								fill={`url(#${id}_grad1)`}
							/>
						</g>

						{/* Chevron paths — swap direction based on state */}
						{isOpen ? (
							<>
								<path
									d="M13.75 25.25L18 20.75L22.25 25.25"
									stroke="#E6E6E6"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M13.75 10.75L18 15.25L22.25 10.75"
									stroke="#E6E6E6"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</>
						) : (
							<>
								<path
									d="M22.25 20.75L18 25.25L13.75 20.75"
									stroke="#E6E6E6"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M22.25 15.25L18 10.75L13.75 15.25"
									stroke="#E6E6E6"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</>
						)}
					</g>
				</g>

				<defs>
					<clipPath
						id={`${id}_bgclip`}
						transform="translate(10 10)"
					>
						<rect width="36" height="36" rx="18" />
					</clipPath>
					<linearGradient
						id={`${id}_grad0`}
						x1="18.8221"
						y1="-0.753009"
						x2="17.1779"
						y2="36.753"
						gradientUnits="userSpaceOnUse"
					>
						<stop
							offset="0.2709"
							stopColor="white"
							stopOpacity="0.04"
						/>
						<stop
							offset="0.5859"
							stopColor="#5A5A5A"
							stopOpacity="0.04"
						/>
						<stop offset="0.9275" stopOpacity="0.04" />
					</linearGradient>
					<linearGradient
						id={`${id}_grad1`}
						x1="17.6152"
						y1="-0.368986"
						x2="18.3848"
						y2="36.369"
						gradientUnits="userSpaceOnUse"
					>
						<stop
							offset="0.1085"
							stopColor="white"
							stopOpacity="0.247"
						/>
						<stop
							offset="0.2436"
							stopColor="#141414"
							stopOpacity="0.46"
						/>
						<stop
							offset="0.7367"
							stopColor="#323232"
							stopOpacity="0.46"
						/>
						<stop
							offset="0.9068"
							stopColor="white"
							stopOpacity="0.46"
						/>
					</linearGradient>
					<clipPath id={`${id}_clip`}>
						<rect width="36" height="36" rx="18" fill="white" />
					</clipPath>
				</defs>
			</svg>
		</div>
	);
}

// ─── Accordion Item ────────────────────────────────────────
interface FAQItemProps {
	question: string;
	answer: string;
	value: string;
	isOpen: boolean;
	index: number;
}

const FAQItem = forwardRef<HTMLDivElement, FAQItemProps>(
	({ question, answer, value, isOpen, index }, ref) => {
		return (
			<Accordion.Item
				ref={ref}
				value={value}
				className="group border-b border-white/10"
			>
				<Accordion.Header asChild>
					<Accordion.Trigger className="flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left sm:py-8">
						<Typography.H4
							className={cn(
								"text-primary transition-opacity duration-300",
								!isOpen && "group-hover:opacity-80",
							)}
						>
							{question}
						</Typography.H4>
						<ToggleIcon
							isOpen={isOpen}
							id={`faq-icon-${index}`}
						/>
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
									<p
										className="whitespace-pre-line text-pretty"
										style={{ color: "#808080" }}
									>
										{answer}
									</p>
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
				"relative bg-black py-16 sm:py-24 lg:py-32",
				className,
			)}
		>
			<div className="container mx-auto px-6 sm:px-8 lg:px-12">
				<div className="mx-auto max-w-[1008px]">
					{/* Heading — single line, fills width */}
					<div className="mb-12 text-center sm:mb-16">
						<Typography.H2 className="text-primary whitespace-pre-line">
							{"Built to match your stage.\nStructured to deliver results."}
						</Typography.H2>
						<Typography.P className="text-secondary mx-auto mt-4 max-w-[440px]">
							We price based on complexity, scope, and risk—not
							just hours on a clock. You&apos;ll always get a
							clear number upfront.
						</Typography.P>
					</div>

					{/* FAQ Container */}
					<div
						className="px-6 py-2 sm:px-10 sm:py-4 lg:px-12"
						style={{
							borderRadius: "10px",
							border: "1px solid rgba(255, 255, 255, 0.06)",
							backgroundColor: "#0C0C0C",
							backgroundImage: "url('/faq-bg.png')",
							backgroundSize: "100% 100%",
							backgroundPosition: "0px 0px",
							backgroundRepeat: "no-repeat",
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
									index={index}
								/>
							))}
						</Accordion.Root>
					</div>
				</div>
			</div>
		</section>
	);
}
