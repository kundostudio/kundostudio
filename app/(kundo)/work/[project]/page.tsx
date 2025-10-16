import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Button } from "~/components/button";

import { HackerText } from "~/components/hacker-text";
import { Page } from "~/components/page";
import { PortableText } from "~/components/portable-text";
import * as Typography from "~/components/typography";
import { Video } from "~/components/video";
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

			{/* Main Asset */}
			{project.mainAsset?.url && (
				<div className="w-full aspect-[16/9] relative">
					{project.mainAsset.filetype === "img" ? (
						<Image
							src={project.mainAsset.url}
							alt={project.name || "Project image"}
							fill
							className="object-cover"
							priority
						/>
					) : (
						<Video
							src={project.mainAsset.url}
							isStreaming={project.mainAsset.filetype === "video-stream"}
							className="w-full h-full object-cover"
						/>
					)}
				</div>
			)}

			{/* Description */}
			<div className="container mt-26 mb-32">
				<Typography.H2 className="max-w-96">{project.description}</Typography.H2>
			</div>

			{/* Secondary Asset */}
			{project.secondaryAsset?.url && (
				<div className="container aspect-video relative">
					{project.secondaryAsset.filetype === "img" ? (
						<Image
							src={project.secondaryAsset.url}
							alt={project.name || "Secondary project image"}
							fill
							className="object-cover"
						/>
					) : project.secondaryAsset.filetype === "video" ? (
						<Video src={project.secondaryAsset.url} className="w-full h-full object-cover" />
					) : project.secondaryAsset.filetype === "video-stream" ? (
						<Video
							src={project.secondaryAsset.url}
							isStreaming={true}
							className="w-full h-full object-cover"
						/>
					) : null}
				</div>
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

			{/* Quote
			{project.quote?.text && project.quote.author && (
				<>
					<Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-1">
						<HackerText
							iterationsToAdvance={2}
							speed={30}
							startsComplete
							minRepeatTime={5000}
							maxRepeatTime={10000}
						>
							C /
						</HackerText>
					</Typography.P>
					<Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-2">
						<HackerText
							iterationsToAdvance={2}
							speed={30}
							startsComplete
							minRepeatTime={5000}
							maxRepeatTime={10000}
						>
							QUOTE
						</HackerText>
					</Typography.P>
					<div className="col-span-4 md:col-start-4 md:col-span-5 lg:col-start-5 lg:col-span-6">
						<Typography.H3 className="text-start text-balance">
							&ldquo;{project.quote.text}&rdquo;
						</Typography.H3>
						<div className="flex items-center gap-2 mt-4">
							{project.quote.author.image && (
								<Image
									src={project.quote.author.image}
									alt={project.quote.author.name || "Quote author"}
									width={24}
									height={24}
									className="rounded-full"
								/>
							)}
							<Typography.P className="text-secondary uppercase">
								{project.quote.author.name}, {project.quote.author.role}
							</Typography.P>
						</div>
					</div>
				</>
			)} */}

			{/* Project Assets */}
			{project.assets && project.assets.length > 0 && (
				<div className="container mt-20 flex flex-col gap-8">
					{project.assets.map((asset, index) => {
						// Skip assets without a URL or filetype
						if (!asset.url || !asset.filetype) return null;

						return (
							<div key={index} className="aspect-video relative">
								{asset.filetype === "img" ? (
									<Image
										src={asset.url}
										alt={`${project.name || "Project"} - Asset ${index + 1}`}
										fill
										className="object-cover"
									/>
								) : asset.filetype === "video" ? (
									<Video src={asset.url} className="w-full h-full object-cover" />
								) : asset.filetype === "video-stream" ? (
									<Video
										src={asset.url}
										isStreaming={true}
										className="w-full h-full object-cover"
									/>
								) : null}
							</div>
						);
					})}
				</div>
			)}

			{/* Roles (below assets) */}
			{project.roles?.internal?.length || project.roles?.external?.length ? (
				<div className="container mt-20 mb-24">
					<div className="mx-auto w-fit">
						<div className="grid grid-cols-[auto_auto] gap-x-8 gap-y-2 items-start">
							{project.roles?.internal?.length ? (
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
							) : null}

							{project.roles?.external?.length ? (
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
									{(project.roles?.services?.length ?? 0) > 0 ? (
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
									) : null}
								</>
							) : null}
						</div>
					</div>
				</div>
			) : null}

			{/* Work */}
			{/* <div className="col-span-4 md:col-start-4 md:col-span-5 lg:col-start-5 lg:col-span-6">
				<Typography.P className="text-secondary uppercase">
					{project.skills?.map((skill) => (
						<span key={skill._id}>
							{skill.name}
							<br />
						</span>
					))}
				</Typography.P>
			</div> */}
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
