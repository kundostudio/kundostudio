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
	alt?: string;
};

// 24px padding on each side at all breakpoints
const SIDE_PADDING = 48;

// Scroll distance required to complete the animation per breakpoint
const SCROLL_DISTANCE = {
	mobile: 500,
	md: 500,
	xl: 1000,
} as const;

// Ease-in-out cubic function for smooth scroll animation
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function HeroAsset({ filetype, src, playbackId, fill, className, alt }: HeroAssetProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isMounted, setIsMounted] = useState(false);
	const isMd = useMediaQuery("(min-width: 768px)");
	const isXl = useMediaQuery("(min-width: 1280px)");

	const { scrollY } = useScroll();

	const configRef = useRef({ isMd, isXl });
	configRef.current = { isMd, isXl };

	const width = useMotionValue(0);

	const updateAnimation = useCallback(
		(scrollValue: number) => {
			const { isMd, isXl } = configRef.current;
			const vw = window.innerWidth;
			const breakpoint = isXl ? "xl" : isMd ? "md" : "mobile";
			const scrollDistance = SCROLL_DISTANCE[breakpoint];
			const linearProgress = Math.min(Math.max(scrollValue / scrollDistance, 0), 1);
			const scrollProgress = easeInOutCubic(linearProgress);

			const endWidth = vw - SIDE_PADDING;
			const currentWidth = vw + (endWidth - vw) * scrollProgress;

			width.set(currentWidth);
		},
		[width],
	);

	useMotionValueEvent(scrollY, "change", updateAnimation);

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
					alt={alt}
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
				style={isMounted ? { width } : undefined}
			>
				{renderAsset()}
			</motion.div>
		</div>
	);
}
