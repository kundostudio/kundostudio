"use client";

import { motion, useMotionValue, useMotionValueEvent, useScroll } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Asset } from "~/components/asset";
import { useMediaQuery } from "~/hooks/use-media-query";
import { cn } from "~/lib/utils";

type HeroAssetProps = {
	filetype: "img" | "video-stream" | "video";
	src: string;
	playbackId?: string;
	fill?: boolean;
	className?: string;
};

// Container breakpoint config
const BREAKPOINTS = {
	mobile: { maxWidth: 578, padding: 40 },
	md: { maxWidth: 1130, padding: 80 },
	xl: { maxWidth: 1220, padding: 80 },
} as const;

// Scroll distance required to complete the animation per breakpoint
const SCROLL_DISTANCE = {
	mobile: 500,
	md: 500,
	xl: 1000,
} as const;

// Ease-in-out cubic function for smooth scroll animation
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function HeroAsset({ filetype, src, playbackId, fill, className }: HeroAssetProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isMounted, setIsMounted] = useState(false);
	const isMd = useMediaQuery("(min-width: 768px)");
	const isXl = useMediaQuery("(min-width: 1280px)");

	const { scrollY } = useScroll();

	// Store breakpoint config in ref to avoid stale closures in callback
	const configRef = useRef({ isMd, isXl });
	configRef.current = { isMd, isXl };

	// Motion values - initialized to 0, will be set on mount
	const width = useMotionValue(0);
	const borderRadius = useMotionValue(0);
	const opacity = useMotionValue(0);

	// Stable calculation function - reads from configRef to get current breakpoint
	const updateAnimation = useCallback(
		(scrollValue: number) => {
			const { isMd, isXl } = configRef.current;
			const vw = window.innerWidth;
			const breakpoint = isXl ? "xl" : isMd ? "md" : "mobile";
			const scrollDistance = SCROLL_DISTANCE[breakpoint];
			const linearProgress = Math.min(Math.max(scrollValue / scrollDistance, 0), 1);
			const scrollProgress = easeInOutCubic(linearProgress);

			// Calculate target width based on current breakpoint
			const bp = BREAKPOINTS[breakpoint];
			const endWidth = Math.min(vw, bp.maxWidth) - bp.padding;
			const currentWidth = vw + (endWidth - vw) * scrollProgress;

			// Calculate border radius (5px mobile, 10px md+) - completes at 2x speed
			const endRadius = isMd ? 10 : 5;
			const radiusProgress = Math.min(scrollProgress * 5, 1);
			const currentRadius = endRadius * radiusProgress;

			width.set(currentWidth);
			borderRadius.set(currentRadius);
			opacity.set(scrollProgress);
		},
		[width, borderRadius, opacity],
	);

	// Listen to scroll changes using motion's optimized event system
	useMotionValueEvent(scrollY, "change", updateAnimation);

	// Handle mount, resize and initial update
	useEffect(() => {
		setIsMounted(true);

		let rafId: number | null = null;

		const handleResize = () => {
			if (rafId) return;
			rafId = requestAnimationFrame(() => {
				updateAnimation(window.scrollY);
				rafId = null;
			});
		};

		updateAnimation(window.scrollY);
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
			if (rafId) cancelAnimationFrame(rafId);
		};
	}, [updateAnimation]);

	// Re-run animation when breakpoint changes
	useEffect(() => {
		updateAnimation(window.scrollY);
	}, [isMd, isXl, updateAnimation]);

	const renderAsset = () => {
		const containerClassName = cn("w-full h-full", className);

		if (filetype === "img") {
			return (
				<Asset
					filetype="img"
					src={src}
					fill={fill}
					className="object-cover"
					container={{ className: containerClassName }}
				/>
			);
		}

		if (filetype === "video-stream") {
			return (
				<Asset
					filetype="video-stream"
					src={src}
					playbackId={playbackId}
					container={{ className: containerClassName }}
				/>
			);
		}

		return <Asset filetype="video" src={src} container={{ className: containerClassName }} />;
	};

	return (
		<div ref={containerRef} className="w-full flex justify-center">
			<motion.div
				className="relative aspect-[16/9] overflow-hidden w-full"
				style={isMounted ? { width, borderRadius } : undefined}
			>
				{renderAsset()}
				{/* Card border overlay - fades in as we scroll */}
				<motion.div
					className="absolute inset-0 pointer-events-none border border-white/16"
					style={isMounted ? { borderRadius, opacity } : { opacity: 0 }}
				/>
			</motion.div>
		</div>
	);
}
