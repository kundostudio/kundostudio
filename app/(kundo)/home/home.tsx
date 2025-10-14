"use client";

import { useEffect, useState } from "react";
import { Asset } from "~/components/asset";
import { Page } from "~/components/page";
import * as Typography from "~/components/typography";
import type { Asset as QueryAsset } from "~/lib/queries";

interface HomePageProps {
	title?: string;
	assets?: QueryAsset[];
	imageDuration?: number;
}

export function HomePage({ title, assets, imageDuration = 5000 }: HomePageProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);

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
		<Page className="flex flex-col pt-[26px] sm:pt-14 container">
			<div className="aspect-[1.62] relative">
				{currentAsset && (
					<Asset
						filetype={currentAsset.filetype}
						src={currentAsset.url}
						variant="card"
						fill
						container={{
							className: "absolute inset-0 transition-opacity duration-300",
							style: {
								maskImage:
									"linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0.6) 64%, rgba(0, 0, 0, 0) 80%)",
								opacity: isTransitioning ? 0 : 1,
							},
						}}
					/>
				)}
				<div className="absolute bottom-4 left-0">
					<Typography.H2 className="text-secondary">Kundo Studio</Typography.H2>
					{title && <Typography.H1 className="text-primary">{title}</Typography.H1>}
				</div>
			</div>
		</Page>
	);
}
