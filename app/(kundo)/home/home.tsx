"use client";

import { Asset } from "~/components/asset";
import { Page } from "~/components/page";
import * as Typography from "~/components/typography";
import type { Asset as QueryAsset } from "~/lib/queries";

interface HomePageProps {
	title?: string;
	asset?: QueryAsset;
}

export function HomePage({ title, asset }: HomePageProps) {
	return (
		<Page className="flex flex-col w-full mx-auto px-5 sm:px-19 md:px-3 lg:px-11 xl:px-0 max-w-256 pt-[26px] sm:pt-14">
			<div className="aspect-[1.62] relative">
				{asset && (
					<Asset
						filetype={asset.filetype}
						src={asset.url}
						container={{
							className: "absolute inset-0",
							style: {
								maskImage:
									"linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0.6) 64%, rgba(0, 0, 0, 0) 80%)",
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
