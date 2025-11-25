"use client";

import { useEffect, useState } from "react";
import { Asset } from "~/components/asset";
import { Page } from "~/components/page";
import * as Typography from "~/components/typography";
import { useMediaQuery } from "~/hooks/use-media-query";
import type { Asset as QueryAsset } from "~/lib/queries";
import { cn } from "~/lib/utils";
import { Frame } from "./frame";

interface HomePageProps {
	title?: string;
	assets?: QueryAsset[];
	imageDuration?: number;
}

export function HomePage({ title, assets, imageDuration = 5000 }: HomePageProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);

	const isMobile = useMediaQuery("(max-width: 639px)");

	// Handle automatic carousel rotation
	useEffect(() => {
		// Don't setup interval if there's 0 or 1 asset
		if (!assets || assets.length <= 1) return;

		const interval = setInterval(() => {
			setIsTransitioning(true);
			setTimeout(() => {
				setCurrentIndex((prev) => (prev + 1) % assets.length);
				setIsTransitioning(false);
			}, 300); // Fade duration
		}, imageDuration);

		return () => clearInterval(interval);
	}, [assets, imageDuration]);

	const currentAsset = assets?.[currentIndex];

	return (
		<Page className={cn("mt-0 sm:mt-18 sm:pt-14", !isMobile && "container")}>
			<div className="relative flex flex-col overflow-x-hidden">
				{currentAsset && (
					<div
						className="relative w-full aspect-[1222/766] min-w-full sm:min-w-none sm:min-h-[500px] transition-opacity duration-300"
						style={{
							...(isMobile ? { minHeight: "min(500px, 60vmax)" } : {}),
							maskImage:
								"linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0.6) 64%, rgba(0, 0, 0, 0) 80%)",
							opacity: isTransitioning ? 0 : 1,
						}}
					>
						{/* Mobile: Asset without frame */}
						<div className="absolute inset-0 sm:hidden">
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

						{/* Desktop: SVG frame with image inside */}
						<Frame className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block">
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
						</Frame>
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
