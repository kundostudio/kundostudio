import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Asset } from "~/components/asset";
import { Button } from "~/components/button";
import { HackerText } from "~/components/hacker-text";
import { Page } from "~/components/page";
import { PortableText } from "~/components/portable-text";
import * as Typography from "~/components/typography";
import { PROJECT_QUERY } from "~/lib/queries";
import { cn } from "~/lib/utils";
import Sign from "~/public/projects/sign.svg";
import { sanityFetch } from "~/sanity/lib/live";

interface Props {
	params: Promise<{ project: string }>;
}

// Define a local Asset type that acepta valores nulos
interface ProjectAsset {
	url: string | null;
	filetype: "img" | "video" | "video-stream" | null;
}

export default async function ProjectDetail({ params }: Props) {
	const slug = (await params).project;

	const { data: project } = await sanityFetch({
		query: PROJECT_QUERY,
		params: { slug },
	});

	if (!project) {
		return null;
	}

	return (
		<Page className="sm:mt-18 pb-23">
			{/* Header */}
			<div className="container flex flex-col items-start gap-12 mt-[54px] sm:mt-22 mb-12">
				<Typography.H1 className="mb-8 max-w-146">{project.title}</Typography.H1>
				{/* Visit Button */}
				{project.url && (
					<Link href={project.url} target="_blank" rel="noopener noreferrer">
						<Button>
							<Typography.P>Visit</Typography.P>
						</Button>
					</Link>
				)}
			</div>

			{/* Main Asset (using shared Asset) */}
			{project.mainAsset?.url && (
				<Asset
					filetype={project.mainAsset.filetype}
					src={project.mainAsset.url}
					fill
					className="object-cover"
					container={{ className: "w-full aspect-[16/9] relative" }}
				/>
			)}

			{/* Description */}
			<div className="container mt-26 mb-32">
				<Typography.H2 className="max-w-96">{project.description}</Typography.H2>
			</div>

			{/* Secondary Asset (using shared Asset) */}
			{project.secondaryAsset?.url && (
				<Asset
					filetype={project.secondaryAsset.filetype}
					src={project.secondaryAsset.url}
					fill
					className="rounded-[5px] sm:rounded-[10px]"
					container={{ className: "container aspect-video relative" }}
				/>
			)}

			{/* Secondary Description */}
			{project.secondaryDescription && (
				<div className="container mt-20 mb-14">
					<PortableText
						value={project.secondaryDescription}
						classes={{
							block: { normal: cn(Typography.textStyles.body, "max-w-[383px]") },
							marks: { strong: "text-secondary" },
						}}
					/>
				</div>
			)}

			{/* Project Assets with inline Quote after first two */}
			{project.assets && project.assets.length > 0 && (
				<div className="container mt-20 flex flex-col gap-8">
					{(() => {
						const firstHalf = project.assets.slice(0, 2) ?? [];
						const secondHalf = project.assets.slice(2) ?? [];

						return (
							<>
								{/* First half of assets */}
								{firstHalf.map(
									(asset, index) =>
										asset?.url &&
										asset?.filetype && (
											<Asset
												key={`asset-first-${index}`}
												filetype={asset.filetype}
												src={asset.url}
												fill
												className="rounded-[5px] sm:rounded-[10px]"
												container={{ className: "aspect-video" }}
											/>
										),
								)}

								{/* Quote block */}
								{project.quote?.text && project.quote.author && (
									<div className="self-end max-w-122 mt-8 mb-26 flex flex-col gap-6">
										<Typography.H2 className="text-start">
											&ldquo;{project.quote.text}&rdquo;
										</Typography.H2>
										<div className="flex items-center gap-2 w-fit">
											{project.quote.author.image && (
												<Image
													src={project.quote.author.image}
													alt={project.quote.author.name || "Quote author"}
													width={24}
													height={24}
													className="rounded-full"
												/>
											)}
											<span className={cn(Typography.textStyles.label, "text-secondary uppercase")}>
												— {project.quote.author.name}, {project.quote.author.role}
											</span>
										</div>
									</div>
								)}

								{/* Second half of assets */}
								{secondHalf.map(
									(asset, index) =>
										asset?.url &&
										asset?.filetype && (
											<Asset
												key={`asset-second-${index}`}
												filetype={asset.filetype}
												src={asset.url}
												fill
												className="rounded-[5px] sm:rounded-[10px]"
												container={{ className: "aspect-video relative" }}
											/>
										),
								)}
							</>
						);
					})()}
				</div>
			)}

			{/* Roles (below assets) */}
			{(project.roles?.internal?.length || project.roles?.external?.length) && (
				<div className="container mt-20 mb-24">
					<div className="mx-auto w-fit">
						<div className="grid grid-cols-[auto_auto] gap-x-8 gap-y-2 items-start">
							{project.roles?.internal?.length && (
								<>
									<div />
									<Typography.P className={cn("uppercase text-primary")}>KUNDO STUDIO</Typography.P>
									{project.roles.internal.map(
										(item: { role?: string; people?: string }, idx: number) => (
											<Fragment key={`int-${idx}`}>
												<Typography.P className="text-secondary text-end">{item.role}</Typography.P>
												<div className="flex flex-col gap-1">
													{(item.people || "")
														.split(/\r?\n/)
														.map((s) => s.trim())
														.filter(Boolean)
														.map((person, i) => (
															<Typography.P key={i} className="text-primary">
																{person}
															</Typography.P>
														))}
												</div>
											</Fragment>
										),
									)}
								</>
							)}

							{project.roles?.external?.length && (
								<>
									<div className="col-span-2 h-8" />
									<div />
									<Typography.P className={cn("uppercase text-primary")}>
										{project.name}
									</Typography.P>
									{project.roles.external.map(
										(item: { role?: string; people?: string }, idx: number) => (
											<Fragment key={`ext-${idx}`}>
												<Typography.P className="text-secondary text-end">{item.role}</Typography.P>
												<div className="flex flex-col gap-1">
													{(item.people || "")
														.split(/\r?\n/)
														.map((s) => s.trim())
														.filter(Boolean)
														.map((person, i) => (
															<Typography.P key={i} className="text-primary">
																{person}
															</Typography.P>
														))}
												</div>
											</Fragment>
										),
									)}

									{/* Services */}
									{(project.roles?.services?.length ?? 0) > 0 && (
										<>
											<div className="col-span-2 h-8" />
											{project.roles.services.map((service: string, i: number) => (
												<Fragment key={`svc-${i}`}>
													{i === 0 ? (
														<Typography.P className="text-secondary text-end">
															Services
														</Typography.P>
													) : (
														<div />
													)}
													<Typography.P className="text-primary">{service}</Typography.P>
												</Fragment>
											))}
										</>
									)}
								</>
							)}
						</div>
					</div>
				</div>
			)}

			<div className="container flex flex-col items-center gap-4 mt-42">
				<Sign className="w-[27px]" />
				<Image
					src="/projects/seal.png"
					alt="Kundo Quality Seal"
					quality={100}
					width={40}
					height={40}
				/>
			</div>
		</Page>
	);
}
