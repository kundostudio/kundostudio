"use client";

import { useEffect, useState } from "react";
import { Asset } from "~/components/asset";
import { Page } from "~/components/page";
import * as Typography from "~/components/typography";
import { useMediaQuery } from "~/hooks/use-media-query";
import type { Asset as QueryAsset } from "~/lib/queries";
import { cn } from "~/lib/utils";

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
			<div className="relative flex flex-col">
				{currentAsset && (
					<Asset
						filetype={currentAsset.filetype}
						src={currentAsset.url}
						variant="card"
						fill
						sizes="(max-width: 639px) 800px, (max-width: 1208px) 95vw, 1208px"
						container={{
							className: "transition-opacity duration-300 aspect-[1216/760] min-h-[500px]",
							style: {
								maskImage:
									"linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0.6) 64%, rgba(0, 0, 0, 0) 80%)",
								opacity: isTransitioning ? 0 : 1,
							},
						}}
					/>
				)}
				<div className="px-4 sm:px-0 sm:-translate-y-full">
					<Typography.H3 className="text-secondary">Kundo Studio</Typography.H3>
					{title && <Typography.H1 className="text-primary">{title}</Typography.H1>}
				</div>
			</div>
		</Page>
	);
}
