"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Route } from "next";
import type { WorksPage as WorksPageType } from "~/lib/queries";

const MINI_WIDTH = 170;
const MINI_HEIGHT = 96;
const FULL_WIDTH = 418;
const FULL_HEIGHT = 235;
const MINI_GAP = 2;
const FULL_GAP = 8;
const MASK_MINI_WIDTH = 800;
const TRANSITION = "900ms cubic-bezier(0.22, 1, 0.36, 1)";
const SHUFFLE_DURATION = 1500;
const EXPAND_DURATION = 900;

type Phase = "entering" | "shuffling" | "expanding" | "zoomed";

export function WorksPage({ worksData }: { worksData: WorksPageType | null }) {
	const projects = worksData?.featuredProjects || [];
	const [phase, setPhase] = useState<Phase>("entering");
	const maskRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const setWidthRef = useRef(0);
	const trackXRef = useRef(0);

	const initialTrackX =
		projects.length === 0
			? 0
			: (projects.length * MINI_WIDTH +
					(projects.length - 1) * MINI_GAP -
					MASK_MINI_WIDTH) /
				2;

	useEffect(() => {
		if (projects.length === 0) return;
		setWidthRef.current = projects.length * (MINI_WIDTH + MINI_GAP);
		trackXRef.current = initialTrackX;
	}, [projects.length, initialTrackX]);

	useEffect(() => {
		if (phase !== "entering" || projects.length === 0) return;
		const lastCardDelay = (projects.length - 1) * 80;
		const entryDuration = 700;
		const pause = 400;
		const total = lastCardDelay + entryDuration + pause;
		const id = setTimeout(() => setPhase("shuffling"), total);
		return () => clearTimeout(id);
	}, [phase, projects.length]);

	useEffect(() => {
		if (phase !== "shuffling") return;
		const track = trackRef.current;
		if (!track) return;

		const setWidth = setWidthRef.current;
		const startX = trackXRef.current;
		const targetX = startX + 2 * setWidth;
		const startTime = performance.now();

		const easeOutExpo = (t: number) =>
			t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

		let rafId = 0;
		const tick = (now: number) => {
			const elapsed = now - startTime;
			const t = Math.min(elapsed / SHUFFLE_DURATION, 1);
			const eased = easeOutExpo(t);
			const x = startX + (targetX - startX) * eased;
			trackXRef.current = x;
			track.style.transform = `translateX(-${x}px)`;
			if (t < 1) {
				rafId = requestAnimationFrame(tick);
			} else {
				setPhase("expanding");
			}
		};
		rafId = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(rafId);
	}, [phase]);

	useEffect(() => {
		if (phase !== "expanding") return;
		const id = setTimeout(() => setPhase("zoomed"), EXPAND_DURATION);
		return () => clearTimeout(id);
	}, [phase]);

	useLayoutEffect(() => {
		if (phase !== "expanding") return;
		const mask = maskRef.current;
		const track = trackRef.current;
		if (!mask || !track) return;
		const trackWidth = track.scrollWidth;
		const maskWidth = mask.clientWidth;
		mask.scrollLeft = (trackWidth - maskWidth) / 2;
		setWidthRef.current = projects.length * (FULL_WIDTH + FULL_GAP);
	}, [phase, projects.length]);

	useEffect(() => {
		if (phase !== "zoomed") return;
		const mask = maskRef.current;
		if (!mask) return;

		let ticking = false;
		const onScroll = () => {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(() => {
				const sw = setWidthRef.current;
				if (sw > 0) {
					if (mask.scrollLeft >= sw * 2) mask.scrollLeft -= sw;
					else if (mask.scrollLeft < sw) mask.scrollLeft += sw;
				}
				ticking = false;
			});
		};

		mask.addEventListener("scroll", onScroll, { passive: true });
		return () => mask.removeEventListener("scroll", onScroll);
	}, [phase]);

	useEffect(() => {
		if (phase !== "zoomed") return;
		const mask = maskRef.current;
		if (!mask) return;

		const onWheel = (e: WheelEvent) => {
			e.preventDefault();
			mask.scrollLeft += e.deltaY + e.deltaX;
		};

		mask.addEventListener("wheel", onWheel, { passive: false });
		return () => mask.removeEventListener("wheel", onWheel);
	}, [phase]);

	if (projects.length === 0) return null;

	const isZoomed = phase === "zoomed";
	const isTranslatePhase = phase === "entering" || phase === "shuffling";
	const isFullSize = phase === "expanding" || phase === "zoomed";

	const cardsToRender = [...projects, ...projects, ...projects];
	const cardWidth = isFullSize ? `${FULL_WIDTH}px` : `${MINI_WIDTH}px`;
	const cardHeight = isFullSize ? `${FULL_HEIGHT}px` : `${MINI_HEIGHT}px`;

	return (
		<div className="flex-1 flex flex-col">
			<div
				className="px-6 pt-[56px]"
				style={{
					opacity: isZoomed ? 1 : 0,
					transition: "opacity 400ms ease 200ms",
					pointerEvents: isZoomed ? "auto" : "none",
				}}
			>
				<p className="font-inter text-[12px] font-normal leading-[18px] tracking-[0.2px] text-primary text-balance max-w-[400px]">
					Every project carries an invisible signature — the result of
					intention, precision, and close collaboration.
				</p>
			</div>

			<div className="flex-1 flex items-center justify-center">
				<div
					ref={maskRef}
					data-mask
					className="no-scrollbar relative"
					style={{
						width: isTranslatePhase
							? `${MASK_MINI_WIDTH}px`
							: "100vw",
						overflowX: isZoomed ? "auto" : "clip",
						overflowY: isZoomed ? "hidden" : "visible",
						transition: `width ${TRANSITION}`,
					}}
				>
					<div
						ref={trackRef}
						data-track
						className="flex items-center"
						style={{
							gap: isFullSize ? `${FULL_GAP}px` : `${MINI_GAP}px`,
							transform: isTranslatePhase
								? `translateX(-${initialTrackX}px)`
								: "none",
							transition: `gap ${TRANSITION}`,
							willChange: "transform",
						}}
					>
						{cardsToRender.map((project, i) => {
							const isFirstSet = i < projects.length;
							const cardIndex = i % projects.length;
							return (
								<Link
									key={`${project._id}-${i}`}
									href={`/work/${project.slug}` as Route}
									data-card
									className={`shrink-0 ${
										isFirstSet ? "flow-card-enter" : ""
									}`}
									style={
										{
											"--card-index": cardIndex,
										} as React.CSSProperties
									}
								>
									<div
										className="relative overflow-hidden transition-opacity duration-300 hover:opacity-85"
										style={{
											width: cardWidth,
											height: cardHeight,
											transition: `width ${TRANSITION}, height ${TRANSITION}`,
										}}
									>
										<Image
											src={project.thumbnail}
											alt={project.name}
											width={FULL_WIDTH}
											height={FULL_HEIGHT}
											className="w-full h-full object-cover"
											priority={isFirstSet}
										/>
									</div>
								</Link>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
