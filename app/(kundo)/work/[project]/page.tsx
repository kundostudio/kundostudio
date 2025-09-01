import Image from "next/image";
import Link from "next/link";

import { HackerText } from "~/components/hacker-text";
import { Page } from "~/components/page";
import * as Typography from "~/components/typography";
import { Video } from "~/components/video";
import { PROJECT_QUERY } from "~/lib/queries";
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
		<Page className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-4 gap-y-8 md:gap-x-6 lg:gap-x-8 pb-[120px]">
			{/* Header */}
			<div className="col-span-full flex flex-col mt-10 md:mt-18 lg:translate-y-6 lg:mt-28">
				<Typography.P className="text-secondary uppercase">
					<HackerText
						iterationsToAdvance={2}
						speed={50}
						startsComplete
						minRepeatTime={5000}
						maxRepeatTime={10000}
					>
						/ WORK
					</HackerText>
				</Typography.P>
				<div className="relative inline-block w-fit">
					<Typography.H1 className="leading-none w-fit mt-1 mb-8">{project.name}</Typography.H1>
					<Typography.P className="absolute top-0 -right-2 translate-x-full text-primary">
						[{project.year}]
					</Typography.P>
				</div>
				<Typography.P className="text-secondary uppercase">{project.subtitle}</Typography.P>
			</div>

			<div className="h-16 md:h-24 lg:h-36 border-t border-tertiary col-span-full" />

			{/* Visit Button */}
			{project.url && (
				<div className="col-span-full flex justify-end">
					<Link href={project.url} target="_blank" rel="noopener noreferrer" className="group">
						<Typography.P className="text-primary uppercase">VISIT →</Typography.P>
					</Link>
				</div>
			)}

			{/* Main Asset */}
			{project.mainAsset && project.mainAsset.url && (
				<div className="col-span-full aspect-[16/9] relative">
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
			<Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-1">
				<HackerText
					iterationsToAdvance={2}
					speed={30}
					startsComplete
					minRepeatTime={5000}
					maxRepeatTime={10000}
				>
					A /
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
					DESCRIPTION
				</HackerText>
			</Typography.P>
			<Typography.H3 className="text-start col-span-4 md:col-start-4 md:col-span-5 lg:col-start-5 lg:col-span-6">
				{project.description}
			</Typography.H3>

			<div className="h-px bg-tertiary col-span-full" />

			{/* Work */}
			<Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-1">
				<HackerText
					iterationsToAdvance={2}
					speed={30}
					startsComplete
					minRepeatTime={5000}
					maxRepeatTime={10000}
				>
					B /
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
					WORK
				</HackerText>
			</Typography.P>
			<div className="col-span-4 md:col-start-4 md:col-span-5 lg:col-start-5 lg:col-span-6">
				<Typography.P className="text-secondary uppercase">
					{project.skills?.map((skill) => (
						<span key={skill._id}>
							{skill.name}
							<br />
						</span>
					))}
				</Typography.P>
			</div>

			{/* Secondary Asset */}
			{project.secondaryAsset && project.secondaryAsset.url && (
				<div className="col-span-full aspect-video relative mt-16">
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

			{/* Quote */}
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
			)}

			{/* Project Assets */}
			{project.assets && project.assets.length > 0 && (
				<div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mt-16">
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
		</Page>
	);
}
