"use client";

import { Page } from "~/components/page";
import { PortableText } from "~/components/portable-text";
import * as Typography from "~/components/typography";
import type { AboutPage as AboutPageType } from "~/lib/queries";

export function AboutPage({ aboutData }: { aboutData: AboutPageType | null }) {
	return (
		<Page className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-4 gap-y-8 md:gap-x-6 lg:gap-x-8 pb-[120px]">
			{/* Header */}
			<div className="col-span-full flex flex-col mt-10 md:mt-18 lg:translate-y-6 lg:mt-28">
				<Typography.P className="text-secondary uppercase">/ ABOUT</Typography.P>
				<div className="relative inline-block w-fit">
					<Typography.H1 className="leading-none w-fit mt-1 mb-8">Kundo</Typography.H1>
					<Typography.P className="absolute top-0 -right-2 translate-x-full text-primary">
						[1]
					</Typography.P>
				</div>
				<Typography.P className="text-secondary uppercase">
					<span className="text-primary">WHAT IS KUNDO?</span> KNOW A BIT MORE
					<br /> ABOUT WHO WE ARE AND WHAT WE DO.
				</Typography.P>
			</div>

			<div className="h-16 md:h-24 lg:h-36 border-t border-b border-tertiary col-span-full" />

			{/* Section number and label */}
			<Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-1">
				[ 01 ]
			</Typography.P>
			<Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-2">
				ABOUT
			</Typography.P>

			{/* Content */}
			<div className="flex flex-col gap-8 col-span-4 md:col-start-4 md:col-span-5 lg:col-start-5 lg:col-span-6 md:pb-8 lg:pb-24">
				{aboutData?.content ? (
					<PortableText value={aboutData.content} />
				) : (
					<Typography.P>No content available. Add content in the Sanity Studio.</Typography.P>
				)}
			</div>
		</Page>
	);
}
