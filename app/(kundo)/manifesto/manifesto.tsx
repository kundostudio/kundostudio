"use client";

import { useState, useCallback } from "react";
import { cn } from "~/lib/utils";

const SHORT_LINES: string[][] = [
	[
		"This is a practice. Not an agency, not a factory.",
		"Show up with intention or don\u2019t show up.",
	],
	[
		"Mastery begins where impressive ends and honest begins.",
		"The tenth iteration no one asked for \u2014 that is your signature.",
		"Details matter.",
		"We don\u2019t chase perfection. We chase the feeling of knowing the work is right.",
	],
	[
		"Arrive with attention, not answers.",
		"The best work doesn\u2019t look designed. It looks inevitable.",
	],
	[
		"Every element earns its place or doesn\u2019t belong.",
		"What you leave out gives meaning to what you leave in.",
	],
	[
		"Disciplines are lenses, not departments.",
		"Never work alone.",
		"Breadth is mastery most people quit before reaching.",
	],
	[
		"Craft, when it\u2019s real, compounds over time.",
		"Don\u2019t confuse speed with urgency.",
	],
	[
		"We never arrive. There is no final form.",
		"We trust the accumulation.",
	],
	[
		"Care about the work more than the credit.",
		"Kill the ego.",
	],
	[
		"Leave a piece of yourself in every project.",
		"Tradition gives us values; practice renews them.",
		"Craft is invisible; beauty remains.",
	],
];

const EXTENDED_PARAGRAPHS: string[] = [
	"This is a practice. Not an agency, not a factory, not a collective of people passing through. A practice \u2014 something you return to every day, not because someone asked you to, but because the work itself demands it. Because showing up with intention, again and again, is how anything worth making gets made. Kundo exists for people who understand that.",

	"We believe mastery is what happens when you care about something long enough to get past the part where it\u2019s impressive and into the part where it\u2019s honest. The tenth iteration that no one asked for. The care in the kerning. The logic in the layout. The moment someone uses what you built and it just works \u2014 no friction, no confusion, just clarity. That is your signature. Not your name, not a logo. Something quieter. Invisible to most, unmistakable to those who know. Details matter. We don\u2019t chase perfection. We chase the feeling of knowing the work is right. They are not the same thing.",

	"We design as we live: intentionally, adaptively, mindfully. Every project is a conversation between what exists and what\u2019s possible. We don\u2019t arrive with answers \u2014 we arrive with attention. We listen to the problem. We sit with it. And then we build, carefully, until the solution feels inevitable. The best work doesn\u2019t look designed. It looks like it was always supposed to be that way. Getting there takes patience and trust. It takes people who care more about the outcome than about being right.",

	"We work with restraint \u2014 not because we can\u2019t do more, but because more isn\u2019t the point. Every element earns its place or it doesn\u2019t belong. We remove until only the essential remains, and then we refine what\u2019s left until it\u2019s undeniable. Space is not emptiness. Silence is not absence. What you leave out gives meaning to what you leave in.",

	"We move between disciplines because the best solutions come from people who can see the whole picture. Design, development, brand, product, motion, strategy \u2014 these are not departments. They are lenses. We move across them with quiet precision, bringing the right tool to the right moment. Never work alone. Breadth is not a weakness. It is a form of mastery most people never develop because they stop too early.",

	"We build things that endure. Not trends, not templates, not things designed to be replaced next quarter. A well-considered identity can carry a company through ten years of change. A clear interface can survive a hundred product iterations. Craft, when it\u2019s real, compounds over time. This means we move deliberately. We don\u2019t confuse speed with urgency. We take the time the work needs \u2014 not more, not less.",

	"We never arrive. There is no final form. Every project teaches something. Every collaboration shifts the lens. Progress is incremental, layered, intentional \u2014 like generations of craft perfected over centuries. We get better not in leaps but in quiet, persistent steps. And we trust the accumulation.",

	"This is who we look for. People who care about the work more than the credit. People who refine when no one is asking them to. People who can hold two opposing ideas and find the design between them. People who are generous with their knowledge and precise with their craft. Kill the ego. Ego is the enemy of good collaboration. People who show up, do the work, and trust that the work speaks. If you\u2019ve read this far and something resonated \u2014 not as inspiration but as recognition \u2014 you might be one of us.",

	"Leave a piece of yourself in every project. Tradition gives us values; practice renews them. Craft is invisible; beauty remains. Your discipline is your freedom. The process is the purpose. Mastery is motion, not arrival. Intention turns practice into legacy.",
];

const textClass =
	"font-inter text-[12px] leading-[18px] tracking-[0.2px] text-primary";

export function Manifesto() {
	const [mode, setMode] = useState<"short" | "extended">("short");
	const [visible, setVisible] = useState(true);
	const isExtended = mode === "extended";

	const handleToggle = useCallback(
		(newMode: "short" | "extended") => {
			if (newMode === mode) return;
			setVisible(false);
			setTimeout(() => {
				setMode(newMode);
				setVisible(true);
			}, 200);
		},
		[mode],
	);

	return (
		<div className="flex flex-col min-h-screen px-6 pt-[56px]">
			{/* Toggle */}
			<div
				className="flex items-center gap-3 max-w-[400px] animate-enter"
				style={{ "--stagger": 0 } as React.CSSProperties}
			>
				<span
					className={cn(
						"font-inter text-[11px] tracking-[0.2px] cursor-pointer select-none transition-colors duration-200",
						!isExtended ? "text-primary" : "text-secondary",
					)}
					onClick={() => handleToggle("short")}
				>
					Short
				</span>
				<button
					type="button"
					role="switch"
					aria-checked={isExtended}
					aria-label="Toggle manifesto version"
					onClick={() => handleToggle(isExtended ? "short" : "extended")}
					className="relative w-8 h-[14px] rounded-full bg-primary/10 transition-colors duration-200 flex-shrink-0"
				>
					<span
						className={cn(
							"absolute top-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full bg-primary transition-all duration-200",
							isExtended ? "left-[20px]" : "left-[2px]",
						)}
					/>
				</button>
				<span
					className={cn(
						"font-inter text-[11px] tracking-[0.2px] cursor-pointer select-none transition-colors duration-200",
						isExtended ? "text-primary" : "text-secondary",
					)}
					onClick={() => handleToggle("extended")}
				>
					Extended
				</span>
			</div>

			{/* Content */}
			<div
				className={cn(
					"flex flex-col gap-[14px] max-w-[400px] mt-6 transition-opacity duration-200",
					visible ? "opacity-100" : "opacity-0",
				)}
			>
				{isExtended
					? EXTENDED_PARAGRAPHS.map((paragraph, i) => (
							<p
								key={i}
								className={cn(textClass, "font-normal text-balance animate-enter")}
								style={{ "--stagger": i + 1 } as React.CSSProperties}
							>
								{paragraph}
							</p>
						))
					: SHORT_LINES.map((group, i) => (
							<div
								key={i}
								className="animate-enter"
								style={{ "--stagger": i + 1 } as React.CSSProperties}
							>
								{group.map((line, j) => (
									<p key={j} className={cn(textClass, "font-normal")}>
										{line}
									</p>
								))}
							</div>
						))}
			</div>

			<div className="flex-1" />
		</div>
	);
}
