"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as Typography from "~/components/typography";
import { cn } from "~/lib/utils";

interface Testimonial {
	quote: string;
	name: string;
	role: string;
	company: string;
}

function getReadingTime(text: string): number {
	const words = text.split(" ").length;
	return Math.max(5, Math.ceil(words / 3.5));
}

// ─── Navigation Button ─────────────────────────────────────
function NavButton({
	direction,
	onClick,
}: { direction: "prev" | "next"; onClick: () => void }) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="glass-btn rounded-full w-9 h-9 min-w-0 p-0 shrink-0"
			aria-label={direction === "prev" ? "Previous testimonial" : "Next testimonial"}
		>
			<svg
				width="14"
				height="14"
				viewBox="11 11 14 14"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="relative z-10"
			>
				{direction === "prev" ? (
					<path
						d="M20.75 13.75L15.25 18L20.75 22.25"
						stroke="#E6E6E6"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				) : (
					<path
						d="M15.25 13.75L20.75 18L15.25 22.25"
						stroke="#E6E6E6"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				)}
			</svg>
		</button>
	);
}

// ─── Progress Bar ───────────────────────────────────────────
function ProgressBar({
	isActive,
	isCompleted,
	duration,
}: { isActive: boolean; isCompleted: boolean; duration: number }) {
	return (
		<div className="flex-1 h-[2px] rounded-full bg-white/10 overflow-hidden">
			<div
				className={cn(
					"h-full rounded-full",
					isCompleted && "w-full bg-white/60",
					isActive && "bg-white/60",
					!isActive && !isCompleted && "w-0",
				)}
				style={
					isActive
						? {
								animation: `progressFill ${duration}s linear forwards`,
							}
						: undefined
				}
			/>
		</div>
	);
}

// ─── Main Section ───────────────────────────────────────────
type TestimonialsSectionProps = {
	testimonials: Testimonial[];
	className?: string;
};

export function TestimonialsSection({ testimonials, className }: TestimonialsSectionProps) {
	const [current, setCurrent] = useState(0);
	const [key, setKey] = useState(0);
	const [maxHeight, setMaxHeight] = useState(0);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const measureRef = useRef<HTMLDivElement>(null);
	const count = testimonials.length;

	const safeIndex = count > 0 ? current % count : 0;
	const duration = count > 0 ? getReadingTime(testimonials[safeIndex].quote) : 5;

	// Measure tallest quote on mount
	useEffect(() => {
		if (!measureRef.current || count === 0) return;
		const children = measureRef.current.children;
		let tallest = 0;
		for (let i = 0; i < children.length; i++) {
			const h = (children[i] as HTMLElement).scrollHeight;
			if (h > tallest) tallest = h;
		}
		setMaxHeight(tallest);
	}, [count, testimonials]);

	const goTo = useCallback(
		(index: number) => {
			if (timerRef.current) clearTimeout(timerRef.current);
			setCurrent(index);
			setKey((k) => k + 1);
		},
		[],
	);

	const goNext = useCallback(() => {
		if (count === 0) return;
		goTo((current + 1) % count);
	}, [current, goTo, count]);

	const goPrev = useCallback(() => {
		if (count === 0) return;
		goTo((current - 1 + count) % count);
	}, [current, goTo, count]);

	// Auto-advance timer
	useEffect(() => {
		if (count === 0) return;
		timerRef.current = setTimeout(goNext, duration * 1000);
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, [current, key, duration, goNext, count]);

	if (count === 0) return null;

	const testimonial = testimonials[current];

	return (
		<section className={cn(className)}>
			<style>{`
				@keyframes progressFill {
					from { width: 0%; }
					to { width: 100%; }
				}
			`}</style>

			{/* Hidden measurement container — renders all quotes to find tallest */}
			<div
				ref={measureRef}
				aria-hidden="true"
				className="absolute overflow-hidden pointer-events-none"
				style={{ position: "absolute", visibility: "hidden", width: "720px" }}
			>
				{testimonials.map((t, i) => (
					<div key={i}>
						<Typography.Overline className="text-secondary">
							{t.name} — {t.role} {t.company}
						</Typography.Overline>
						<Typography.H3 className="text-primary mt-4">
							&ldquo;{t.quote}&rdquo;
						</Typography.H3>
					</div>
				))}
			</div>

			<div
				className="relative w-full max-w-[1312px] mx-auto overflow-hidden rounded-[10px]"
			>
				{/* Background image + gradient overlay */}
				<div className="absolute inset-0">
					<div
						className="absolute inset-0 bg-cover bg-center bg-no-repeat"
						style={{ backgroundImage: "url('/testimonials-bg.png')" }}
					/>
					<div
						className="absolute inset-0"
						style={{
							background: 'linear-gradient(180deg, rgba(0,0,0,1) 32%, rgba(0,0,0,0) 100%)',
						}}
					/>
				</div>
				{/* Layout: prev button | content | next button */}
				<div className="relative z-10 flex items-center">
					{/* Prev button — far left */}
					<div className="hidden sm:flex items-center pl-6 lg:pl-10 shrink-0">
						<NavButton direction="prev" onClick={goPrev} />
					</div>

					{/* Quote content — centered block, left-aligned text */}
					<div className="flex-1 flex flex-col items-center px-8 py-[144px] sm:px-10 lg:px-16">
						<div className="w-full max-w-[720px] text-left">
							{/* Fixed-height quote area — top-aligned */}
							<div
								className="flex flex-col items-start"
								style={maxHeight > 0 ? { minHeight: maxHeight } : undefined}
							>
								{/* Client attribution — TOP */}
								<Typography.Overline className="text-secondary">
									{testimonial.name} — {testimonial.role} {testimonial.company}
								</Typography.Overline>

								{/* Quote — BELOW attribution */}
								<Typography.H3 className="text-primary mt-4">
									&ldquo;{testimonial.quote}&rdquo;
								</Typography.H3>
							</div>

							{/* Progress bars + mobile nav — BOTTOM */}
							<div className="flex items-center gap-3 mt-12 w-full">
								{/* Mobile-only nav buttons */}
								<div className="flex sm:hidden items-center gap-2 shrink-0">
									<NavButton direction="prev" onClick={goPrev} />
									<NavButton direction="next" onClick={goNext} />
								</div>

								<div className="flex items-center gap-2 flex-1">
									{testimonials.map((_, index) => (
										<ProgressBar
											key={`${index}-${key}`}
											isActive={index === current}
											isCompleted={index < current}
											duration={duration}
										/>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Next button — far right */}
					<div className="hidden sm:flex items-center pr-6 lg:pr-10 shrink-0">
						<NavButton direction="next" onClick={goNext} />
					</div>
				</div>
			</div>
		</section>
	);
}
