"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useCallback } from "react";
import type { Route } from "next";
import type { WorksPage as WorksPageType } from "~/lib/queries";

export function WorksPage({ worksData }: { worksData: WorksPageType | null }) {
	const projects = worksData?.featuredProjects || [];
	const containerRef = useRef<HTMLDivElement>(null);

	// Width of one full set of projects (calculated after mount)
	const setWidthRef = useRef(0);

	// Measure one set width and jump to set2 on mount
	useEffect(() => {
		const el = containerRef.current;
		if (!el || projects.length === 0) return;

		// Each card: width + gap. Last card in a set has no trailing gap.
		// We measure programmatically by looking at the children.
		const cards = el.children;
		const cardsPerSet = projects.length;
		if (cards.length < cardsPerSet * 2) return;

		// setWidth = distance from start of card[0] to start of card[cardsPerSet]
		const firstCard = cards[0] as HTMLElement;
		const secondSetFirst = cards[cardsPerSet] as HTMLElement;
		setWidthRef.current = secondSetFirst.offsetLeft - firstCard.offsetLeft;

		// Jump to start of set2 (no animation)
		el.scrollLeft = setWidthRef.current;
	}, [projects.length]);

	// Loop logic: when scroll crosses boundaries, jump
	useEffect(() => {
		const el = containerRef.current;
		if (!el || projects.length === 0) return;

		let ticking = false;

		const onScroll = () => {
			if (ticking) return;
			ticking = true;

			requestAnimationFrame(() => {
				const setWidth = setWidthRef.current;
				if (setWidth === 0) {
					ticking = false;
					return;
				}

				// If scrolled past start of set3, jump back to same position in set2
				if (el.scrollLeft >= setWidth * 2) {
					el.scrollLeft -= setWidth;
				}
				// If scrolled before start of set2, jump forward to same position in set2
				else if (el.scrollLeft < setWidth) {
					el.scrollLeft += setWidth;
				}

				ticking = false;
			});
		};

		el.addEventListener("scroll", onScroll, { passive: true });
		return () => el.removeEventListener("scroll", onScroll);
	}, [projects.length]);

	// Convert vertical wheel to horizontal scroll
	const handleWheel = useCallback((e: WheelEvent) => {
		e.preventDefault();
		if (containerRef.current) {
			containerRef.current.scrollLeft += e.deltaY + e.deltaX;
		}
	}, []);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;
		el.addEventListener("wheel", handleWheel, { passive: false });
		return () => el.removeEventListener("wheel", handleWheel);
	}, [handleWheel]);

	if (projects.length === 0) return null;

	// Triple the projects for infinite loop: [set1] [set2] [set3]
	const tripled = [...projects, ...projects, ...projects];

	return (
		<div className="min-h-screen flex items-center">
			<div
				ref={containerRef}
				className="animate-enter flex gap-2 pl-6 overflow-x-auto no-scrollbar"
			>
				{tripled.map((project, i) => (
					<Link
						key={`${project._id}-${i}`}
						href={`/work/${project.slug}` as Route}
						className="flex-shrink-0 flex flex-col gap-2 w-[280px] md:w-[418px]"
					>
						<div className="relative aspect-[418/235] transition-opacity duration-300 hover:opacity-85">
							<Image
								src={project.thumbnail}
								alt={project.name}
								fill
								sizes="(max-width: 768px) 280px, 418px"
								className="object-cover"
							/>
						</div>
						<p className="font-inter text-[12px] font-normal leading-[14px] tracking-[0.2px] text-primary">
							{project.name}
						</p>
					</Link>
				))}
			</div>
		</div>
	);
}
