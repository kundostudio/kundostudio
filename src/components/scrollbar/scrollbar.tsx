"use client";

import { useLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "~/lib/utils";

type Props = {
	className?: string;
};

export function Scrollbar({ className }: Props) {
	const lenis = useLenis();
	const scrollbarRef = useRef<HTMLDivElement>(null);
	const thumbRef = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);
	const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (!lenis || !scrollbarRef.current || !thumbRef.current) return;

		const scrollbar = scrollbarRef.current;
		const thumb = thumbRef.current;

		// Show scrollbar and reset hide timer
		const showScrollbar = () => {
			setIsVisible(true);

			// Clear existing timeout
			if (hideTimeoutRef.current) {
				clearTimeout(hideTimeoutRef.current);
			}

			// Set new timeout to hide after 3 seconds
			hideTimeoutRef.current = setTimeout(() => {
				setIsVisible(false);
			}, 300);
		};

		// Calculate thumb height based on scroll progress
		const updateThumb = () => {
			const progress = lenis.progress;
			const thumbHeight = Math.max(
				24,
				scrollbar.clientHeight * (1 - lenis.limit / lenis.dimensions.height),
			);
			const thumbTop = progress * (scrollbar.clientHeight - thumbHeight);

			thumb.style.height = `${thumbHeight}px`;
			thumb.style.transform = `translate3d(0, ${thumbTop}px, 0)`;
		};

		// Combined scroll handler
		const handleScroll = () => {
			updateThumb();
			showScrollbar();
		};

		// Initial update
		updateThumb();

		// Update on scroll
		lenis.on("scroll", handleScroll);

		// Handle click on scrollbar track
		const handleTrackClick = (e: MouseEvent) => {
			if (e.target === scrollbar) {
				const rect = scrollbar.getBoundingClientRect();
				const clickY = e.clientY - rect.top;
				const progress = clickY / rect.height;
				lenis.scrollTo(lenis.limit * progress, { immediate: false });
			}
		};

		scrollbar.addEventListener("click", handleTrackClick);

		return () => {
			lenis.off("scroll", handleScroll);
			scrollbar.removeEventListener("click", handleTrackClick);

			// Clear timeout on cleanup
			if (hideTimeoutRef.current) {
				clearTimeout(hideTimeoutRef.current);
			}
		};
	}, [lenis]);

	// Don't render if there's no scroll available
	if (!lenis || lenis.limit <= 0) {
		return null;
	}

	return (
		<div
			ref={scrollbarRef}
			className={cn(
				"rounded-full top-0 z-50 h-22 w-[3px] cursor-pointer bg-white/20 pointer-events-none transition-opacity duration-300 ease-out",
				isVisible ? "opacity-100" : "opacity-0",
				className,
			)}
		>
			<div ref={thumbRef} className="absolute right-0 w-full rounded-full bg-white" />
		</div>
	);
}
