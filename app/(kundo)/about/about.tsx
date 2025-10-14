"use client";

import { Fragment } from "react";
import { Asset } from "~/components/asset";
import { Page } from "~/components/page";
import { PortableText } from "~/components/portable-text";
import * as Typography from "~/components/typography";
import type { AboutCard, AboutPage as AboutPageType } from "~/lib/queries";
import { cn } from "~/lib/utils";

function renderCardDescription(card: AboutCard) {
	if (!card.description) {
		return null;
	}

	return (
		<PortableText
			value={card.description}
			classes={{ block: { normal: cn("text-secondary", Typography.textStyles.h2) } }}
		/>
	);
}

export function AboutPage({ aboutData }: { aboutData: AboutPageType | null }) {
	if (!aboutData) {
		return (
			<Page className="flex flex-col gap-12 w-full mx-auto px-5 sm:px-19 md:px-3 lg:px-11 xl:px-0 max-w-256 pt-[26px] sm:pt-14 pb-[120px]">
				<Typography.P className="text-secondary">
					No content available. Add content in the Sanity Studio.
				</Typography.P>
			</Page>
		);
	}

	const hero = aboutData.hero;
	const cards = aboutData.cards ?? [];
	const whatWeDo = aboutData.whatWeDo;
	const prefooter = aboutData.prefooter;
	const heroAsset = hero?.asset;
	const prefooterAsset = prefooter?.asset;

	return (
		<Page className="flex flex-col gap-24 w-full mx-auto mt-0">
			{hero ? (
				<section className="relative overflow-hidden bg-[#050505] px-6 sm:px-12 md:px-16 lg:px-20 py-16 sm:py-24 md:py-28 lg:py-32 before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-t before:from-black before:via-black/40 before:to-transparent">
					{heroAsset?.url ? (
						<Asset
							filetype={heroAsset.filetype}
							src={heroAsset.url}
							fill
							className="object-top"
							container={{
								className: "absolute inset-0",
							}}
						/>
					) : null}
					<div className="relative z-10 flex flex-col gap-6 max-w-3xl">
						{hero.heading && (
							<Typography.H1 className="text-primary leading-[0.95]">{hero.heading}</Typography.H1>
						)}
					</div>
				</section>
			) : null}

			{cards.length > 0 ? (
				<section className="flex flex-col gap-10">
					<div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-[1008px] mx-auto">
						{cards.map((card) => {
							const asset = card.asset;

							return (
								<article key={card._key} className="flex flex-col gap-6">
									{asset?.url ? (
										<Asset
											filetype={asset.filetype}
											src={asset.url}
											fill
											className="relative aspect-[0.68]"
										/>
									) : null}
									<div className="flex flex-col">
										{card.title ? (
											<h3 className={cn("text-primary inline", Typography.textStyles.h2)}>
												{card.title}
											</h3>
										) : null}
										{renderCardDescription(card)}
									</div>
								</article>
							);
						})}
					</div>
				</section>
			) : null}

			{whatWeDo ? (
				<section className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8 lg:gap-12 max-w-[1200px] mx-auto px-10">
					<div className="md:col-span-5">
						{whatWeDo.heading ? (
							<Typography.H2 className={cn("text-primary", Typography.textStyles.h1)}>
								{whatWeDo.heading}
							</Typography.H2>
						) : null}
					</div>
					<div className="md:col-span-7 flex flex-col gap-10">
						{whatWeDo.description ? (
							<PortableText
								value={whatWeDo.description}
								classes={{ block: { normal: cn("text-primary", Typography.textStyles.h2) } }}
							/>
						) : null}
						{whatWeDo.capabilities?.length ? (
							<div className="flex flex-col gap-8 pt-8">
								{whatWeDo.capabilities.map((capability, index) => (
									<Fragment key={capability._key}>
										<div className="flex flex-col gap-2">
											{capability.title ? (
												<Typography.P className="text-primary">{capability.title}</Typography.P>
											) : null}
											{capability.description ? (
												<div className="text-secondary">
													<PortableText
														value={capability.description}
														classes={{
															block: { normal: cn("text-secondary", Typography.textStyles.h2) },
														}}
													/>
												</div>
											) : null}
										</div>
										{index !== (whatWeDo.capabilities?.length ?? 0) - 1 && (
											<div className="bg-[#1F1F1F] h-px"></div>
										)}
									</Fragment>
								))}
							</div>
						) : null}
					</div>
				</section>
			) : null}

			{prefooterAsset?.url || prefooter?.tagline ? (
				<section className="relative overflow-hidden flex flex-col items-center justify-center text-center gap-8 h-[632px]">
					{prefooterAsset?.url ? (
						<div
							className="absolute inset-0 flex justify-center items-start mix-blend-hard-light"
							style={{
								maskImage:
									"linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 86px, rgba(0,0,0,1) 216px, rgba(0,0,0,1) calc(100% - 216px), rgba(0,0,0,0) calc(100% - 86px), rgba(0,0,0,0) 100%)",
								WebkitMaskImage:
									"linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 86px, rgba(0,0,0,1) 216px, rgba(0,0,0,1) calc(100% - 216px), rgba(0,0,0,0) calc(100% - 86px), rgba(0,0,0,0) 100%)",
							}}
						>
							<Asset
								filetype={prefooterAsset.filetype}
								src={prefooterAsset.url}
								className="object-contain mt-[114px]"
								variant="default"
								width={306.6}
								height={460}
							/>
						</div>
					) : null}
					<div className="relative z-10 flex flex-col gap-4 items-center">
						{prefooter?.tagline && (
							<span
								className="text-primary text-[74px] leading-[74px] tracking-[-0.1%]"
								style={{
									textShadow:
										"0 8px 24px rgba(0, 0, 0, 1), 0 0 16px rgba(0, 0, 0, 1), 0 10px 16px rgba(0, 0, 0, 1)",
								}}
							>
								{prefooter.tagline}
							</span>
						)}
					</div>
				</section>
			) : null}
		</Page>
	);
}
