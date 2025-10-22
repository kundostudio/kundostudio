import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Asset } from "~/components/asset";
import { Button } from "~/components/button";
import { Page } from "~/components/page";
import { PortableText } from "~/components/portable-text";
import * as Typography from "~/components/typography";
import { PROJECT_QUERY, type SecondaryDescriptionSection } from "~/lib/queries";
import { cn } from "~/lib/utils";
import Sign from "~/public/projects/sign.svg";
import { sanityFetch } from "~/sanity/lib/live";

interface Props {
	params: Promise<{ project: string }>;
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

	const secondarySections = project.secondaryDescription?.sections ?? [];
	const leftColumnSections = secondarySections.slice(0, 2);
	const rightColumnSections = secondarySections.slice(2);

	return (
		<Page className="sm:mt-18 pb-23">
			{/* Header */}
			<div className="container flex flex-col items-start gap-12 mt-[54px] sm:mt-22 mb-12">
				<Typography.H1 className="mb-8 max-w-146">{project.title}</Typography.H1>
				{/* Visit Button */}
				{project.url && (
					<Link href={project.url} target="_blank" rel="noopener noreferrer">
						<Button isExternal>Visit</Button>
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
				<p className={cn(Typography.textStyles.h3, "max-w-96")}>{project.description}</p>
			</div>

			{/* Secondary Asset (using shared Asset) */}
			{project.secondaryAsset?.url && (
				<div className="container">
					<Asset
						filetype={project.secondaryAsset.filetype}
						src={project.secondaryAsset.url}
						fill
						variant="card"
						container={{ className: "aspect-video" }}
					/>
				</div>
			)}

			{/* Secondary Description (sections) */}
			{secondarySections.length > 0 ? (
				<div className="container my-26">
					<div className="flex flex-row gap-8 flex-wrap">
						<div className="flex flex-col gap-6 w-full md:w-auto md:flex-[0_0_383px] md:max-w-[383px]">
							{leftColumnSections.map((section, index) => (
								<SectionBlock key={`secondary-section-${index}`} section={section} />
							))}
						</div>
						{rightColumnSections.length > 0 && (
							<div className="flex flex-col gap-6 w-full md:w-auto md:flex-[0_0_383px] md:max-w-[383px] md:mt-0">
								{rightColumnSections.map((section, index) => (
									<SectionBlock
										key={`secondary-section-${index + leftColumnSections.length}`}
										section={section}
									/>
								))}
							</div>
						)}
					</div>
				</div>
			) : null}

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
												variant="card"
												container={{ className: "aspect-video" }}
											/>
										),
								)}

								{/* Quote block */}
								{project.quote?.text && project.quote.author && (
									<div className="self-end max-w-122 my-26 flex flex-col gap-6">
										<p className={cn(Typography.textStyles.h2, "text-start")}>
											&ldquo;{project.quote.text}&rdquo;
										</p>
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
											<span className={cn(Typography.textStyles.h4, "text-secondary uppercase")}>
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
												variant="card"
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
				<div className="container mt-26 mb-24">
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
				<Sign className="w-[50px]" />
				<Image
					src="/projects/seal.png"
					alt="Kundo Quality Seal"
					quality={100}
					width={80}
					height={80}
				/>
			</div>
		</Page>
	);
}

interface SectionBlockProps {
	section: SecondaryDescriptionSection;
}

function SectionBlock({ section }: SectionBlockProps) {
	if (!section) {
		return null;
	}

	return (
		<div className="w-full max-w-[383px]">
			{section.title && section.content ? (
				<div className="inline">
					<h4 className={cn(Typography.textStyles.body, "text-secondary inline")}>
						{section.title}{" "}
					</h4>
					<PortableText
						value={section.content}
						classes={{
							block: { normal: cn(Typography.textStyles.body, "md:mb-0 inline") },
							marks: { strong: "text-secondary" },
						}}
					/>
				</div>
			) : section.title ? (
				<Typography.H4 className="text-secondary">{section.title}</Typography.H4>
			) : section.content ? (
				<PortableText
					value={section.content}
					classes={{
						block: { normal: cn(Typography.textStyles.body, "md:mb-0") },
						marks: { strong: "text-secondary" },
					}}
				/>
			) : null}
		</div>
	);
}
