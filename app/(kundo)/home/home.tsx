"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Asset } from "~/components/asset";
import { Page } from "~/components/page";
import * as Typography from "~/components/typography";
import { useMediaQuery } from "~/hooks/use-media-query";
import type { Asset as QueryAsset } from "~/lib/queries";
import { cn } from "~/lib/utils";
import { Frame } from "./frame";
import { FrameBorder } from "./frame-border";

function useIsSafari() {
	const [isSafari, setIsSafari] = useState(false);

	useEffect(() => {
		// Detect Safari: has Safari in UA but not Chrome (Chrome also includes Safari in UA)
		const ua = navigator.userAgent;
		setIsSafari(ua.includes("Safari") && !ua.includes("Chrome") && !ua.includes("Chromium"));
	}, []);

	return isSafari;
}

type CarouselMode = "fast" | "slow";

const SLOW_DURATION = 1000; // Slow mode duration (1 second)
const CYCLES_BEFORE_SLOW = 3; // Number of complete cycles before switching to slow

interface HomePageProps {
	title?: string;
	assets?: QueryAsset[];
	imageDuration?: number;
}

export function HomePage({ title, assets, imageDuration = 5000 }: HomePageProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [mode, setMode] = useState<CarouselMode>("fast");

	const transitionCountRef = useRef(0);

	const isMobile = useMediaQuery("(max-width: 639px)");
	const isSafari = useIsSafari();

	const totalAssets = assets?.length ?? 0;
	const transitionsForTwoCycles = totalAssets * CYCLES_BEFORE_SLOW;

	// Fast mode uses original imageDuration from CMS
	// Slow mode uses 1 second
	const currentDuration = mode === "fast" ? imageDuration : SLOW_DURATION;

	const advanceCarousel = useCallback(() => {
		if (!assets || assets.length <= 1) return;

		setIsTransitioning(true);
		setTimeout(() => {
			setCurrentIndex((prev) => {
				const nextIndex = (prev + 1) % assets.length;

				// Track transitions for mode switching
				if (mode === "fast") {
					transitionCountRef.current += 1;

					// Check if we completed the required cycles
					if (transitionCountRef.current >= transitionsForTwoCycles) {
						setMode("slow");
					}
				}

				return nextIndex;
			});
			setIsTransitioning(false);
		}, 300); // Fade duration
	}, [assets, mode, transitionsForTwoCycles]);

	// Handle automatic carousel rotation
	useEffect(() => {
		// Don't setup interval if there's 0 or 1 asset
		if (!assets || assets.length <= 1) return;

		const interval = setInterval(advanceCarousel, currentDuration);

		return () => clearInterval(interval);
	}, [assets, currentDuration, advanceCarousel]);

	const currentAsset = assets?.[currentIndex];

	return (
		<Page className={cn("mt-0 sm:mt-18 sm:pt-14", !isMobile && "container")}>
			<div className="relative flex flex-col overflow-x-hidden">
				{currentAsset && (
					<div
						className="relative w-full aspect-[1222/766] min-w-full sm:min-w-none sm:min-h-[500px]"
						style={{
							...(isMobile ? { minHeight: "min(500px, 60vmax)" } : {}),
							maskImage:
								"linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0.6) 64%, rgba(0, 0, 0, 0) 80%)",
						}}
					>
						{/* Mobile: Asset without frame */}
						<div
							className={cn(
								"absolute inset-0 transition-opacity duration-300 sm:hidden",
								isTransitioning ? "opacity-0" : "opacity-100",
							)}
						>
							<Asset
								filetype={currentAsset.filetype}
								src={currentAsset.url}
								variant="default"
								fill
								sizes="800px"
								container={{
									className: "absolute! inset-y-0 left-1/2 -translate-x-1/2 w-full",
								}}
							/>
						</div>

						{/* Desktop: Use foreignObject for Chrome/Firefox, CSS fallback for Safari */}
						{isSafari ? (
							// Safari fallback: CSS clipping + SVG frame overlay (no foreignObject)
							<div className="pointer-events-none absolute inset-0 hidden sm:block">
								<div
									className={cn(
										"absolute left-[0.54%] right-[0.6%] top-[0.98%] bottom-0 overflow-hidden rounded-t-[36px] transition-opacity duration-300",
										isTransitioning ? "opacity-0" : "opacity-100",
									)}
								>
									<Asset
										filetype={currentAsset.filetype}
										src={currentAsset.url}
										variant="default"
										fill
										sizes="(max-width: 1208px) 95vw, 1208px"
										container={{
											className: "h-full w-full",
										}}
									/>
								</div>
								<FrameBorder className="absolute inset-0 h-full w-full" />
							</div>
						) : (
							// Chrome/Firefox: Use foreignObject (works correctly)
							<Frame className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block">
								<div
									className={cn(
										"h-full w-full transition-opacity duration-300",
										isTransitioning ? "opacity-0" : "opacity-100",
									)}
								>
									<Asset
										filetype={currentAsset.filetype}
										src={currentAsset.url}
										variant="default"
										fill
										sizes="(max-width: 1208px) 95vw, 1208px"
										container={{
											className: "h-full w-full",
										}}
									/>
								</div>
							</Frame>
						)}
					</div>
				)}
				<div className="px-4 sm:px-0 sm:-translate-y-full">
					<Typography.H3 className="text-secondary">Kundo Studio</Typography.H3>
					{title && <Typography.H1 className="text-primary">{title}</Typography.H1>}
				</div>
			</div>
		</Page>
	);
}
