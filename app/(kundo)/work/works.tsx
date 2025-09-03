"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import { Page } from "~/components/page";
import * as Typography from "~/components/typography";
import type { WorksPage as WorksPageType } from "~/lib/queries";

export function WorksPage({ worksData }: { worksData: WorksPageType | null }) {
	const projects = worksData?.featuredProjects || [];

	return (
		<Page className="flex flex-col gap-28 w-full mx-auto px-5 sm:px-19 md:px-3 lg:px-11 xl:px-0 max-w-256 pt-[26px] sm:pt-14">
			<Typography.H1>
				Built on trust.
				<br /> Proven by outcomes
			</Typography.H1>

			{/* Projects Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
				{projects.map((project, index) => (
					<Link
						key={project._id}
						href={`/work/${project.slug}` as Route}
						className="group flex flex-col"
					>
						<div className="relative aspect-[1.62] bg-black overflow-hidden border border-white/16 rounded-[10px]">
							<Image
								src={project.thumbnail ?? ""}
								alt={project.name ?? ""}
								fill
								className="object-cover transition-transform duration-300 group-hover:scale-105"
							/>
						</div>
						<div className="flex justify-between mt-4">
							<Typography.P className="text-primary">{project.name}</Typography.P>
						</div>
					</Link>
				))}
			</div>
		</Page>
	);
}
