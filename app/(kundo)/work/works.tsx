"use client";

import type { Route } from "next";
import Link from "next/link";
import { Asset } from "~/components/asset";

import { Page } from "~/components/page";
import * as Typography from "~/components/typography";
import type { WorksPage as WorksPageType } from "~/lib/queries";
import { cn } from "~/lib/utils";

export function WorksPage({ worksData }: { worksData: WorksPageType | null }) {
	const projects = worksData?.featuredProjects || [];

	return (
		<Page className="flex flex-col gap-28 pt-[26px] sm:pt-14 mb-[120px] container">
			<Typography.H1>
				Built on trust.
				<br /> Proven by outcomes
			</Typography.H1>

			{/* Projects Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
				{projects.map((project) => {
					const skillNames = (project.skills ?? [])
						.map((skill) => skill?.name)
						.filter((name): name is string => Boolean(name));

					return (
						<Link
							key={project._id}
							href={`/work/${project.slug}` as Route}
							className="group flex flex-col"
						>
							<div className="relative aspect-[1.62]">
								<Asset
									filetype="img"
									src={project.thumbnail}
									alt={project.name}
									fill
									className="object-cover transition-transform duration-300 group-hover:scale-105"
									container={{
										className: "absolute inset-0",
									}}
								/>
							</div>
							<div className="mt-4 flex flex-col gap-1">
								<h3 className={cn(Typography.textStyles.body, "text-primary")}>
									{project.name}
									{project.year ? <span> &mdash; {project.year}</span> : null}
								</h3>
								{skillNames.length > 0 ? (
									<h4 className={cn(Typography.textStyles.body, "text-secondary")}>
										{skillNames
											.map((skill) => skill.charAt(0).toUpperCase() + skill.slice(1))
											.slice(0, 3)
											.join(", ")}
									</h4>
								) : null}
							</div>
						</Link>
					);
				})}
			</div>
		</Page>
	);
}
