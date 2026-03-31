import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Asset } from "~/components/asset";
import { PortableText } from "~/components/portable-text";
import { ProjectSchema } from "~/components/seo/structured-data";
import { PROJECT_QUERY, PROJECT_SLUGS_QUERY } from "~/lib/queries";
import { cn } from "~/lib/utils";
import { sanityFetch } from "~/sanity/lib/live";
import { HeroAsset } from "./hero-asset";

const text = "font-inter text-[12px] font-normal leading-[14px] tracking-[0.2px] text-primary";
const prose = "font-inter text-[12px] font-normal leading-[18px] tracking-[0.2px] text-primary";

interface Props {
	params: Promise<{ project: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const slug = (await params).project;
	const { data: project } = await sanityFetch({
		query: PROJECT_QUERY,
		params: { slug },
	});

	if (!project) {
		return { title: "Project Not Found" };
	}

	const projectName = project.title || project.name;
	const serviceType = Array.isArray(project.projectType)
		? project.projectType.join(" & ")
		: "";
	const fallbackTitle = serviceType
		? `${projectName} — ${serviceType}`
		: projectName;
	const title = project.metaTitle || fallbackTitle;
	const description =
		project.metaDescription ||
		project.description ||
		`${projectName} — A Kundo Studio project`;
	const ogImage = project.mainAsset?.url || "https://www.kundo.studio/og.png";

	return {
		title,
		description,
		openGraph: {
			title: `${title} | Kundo Studio`,
			description,
			url: `https://www.kundo.studio/work/${slug}`,
			siteName: "Kundo Studio",
			locale: "en_US",
			type: "article",
			images: [
				{
					url: ogImage,
					width: 1200,
					height: 630,
					alt: projectName,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: `${title} | Kundo Studio`,
			description,
			images: [ogImage],
		},
		alternates: {
			canonical: `https://www.kundo.studio/work/${slug}`,
		},
	};
}

export default async function ProjectDetail({ params }: Props) {
	const slug = (await params).project;

	const [{ data: project }, { data: allProjects }] = await Promise.all([
		sanityFetch({
			query: PROJECT_QUERY,
			params: { slug },
		}),
		sanityFetch({
			query: PROJECT_SLUGS_QUERY,
		}),
	]);

	if (!project) {
		notFound();
	}

	const projectCount = allProjects?.length ?? 0;
	const currentIndex = allProjects?.findIndex((p) => p.slug === slug) ?? -1;
	const prevIndex = currentIndex > 0 ? currentIndex - 1 : projectCount - 1;
	const nextIndex = currentIndex < projectCount - 1 ? currentIndex + 1 : 0;
	const prevProject = projectCount > 1 ? allProjects?.[prevIndex] : null;
	const nextProject = projectCount > 1 ? allProjects?.[nextIndex] : null;

	const secondarySections = project.secondaryDescription?.sections ?? [];
	const allCredits = [
		...(project.roles?.internal ?? []),
		...(project.roles?.external ?? []),
	];
	const services = project.roles?.services ?? [];

	return (
		<div className="pb-24">
			<ProjectSchema
				title={project.title || project.name}
				description={project.metaDescription || project.description}
				slug={slug}
				coverImage={project.mainAsset?.url}
				keywords={services}
			/>

			{/* 1. QUOTE */}
			{project.quote?.text && project.quote.author && (
				<div
					className="px-6 pt-[56px] max-w-[400px] animate-enter"
					style={{ "--stagger": 0 } as React.CSSProperties}
				>
					<p className={cn(prose, "text-balance")}>
						&ldquo;{project.quote.text}&rdquo;
					</p>
					<div className="flex items-center gap-2 mt-3">
						{project.quote.author.image && (
							<Image
								src={project.quote.author.image}
								alt={project.quote.author.name || "Quote author"}
								width={32}
								height={32}
								className="rounded-none object-cover"
							/>
						)}
						<span className={cn(text, "uppercase whitespace-nowrap")}>
							{project.quote.author.name} — {project.quote.author.role}, {project.name}
						</span>
					</div>
				</div>
			)}

			{/* 2. MAIN ASSET — video gets shrink-on-scroll, image is static */}
			{project.mainAsset?.url && (
				project.mainAsset.filetype === "img" ? (
					<div
						className="px-6 mt-8 animate-enter"
						style={{ "--stagger": 1 } as React.CSSProperties}
					>
						<Asset
							filetype="img"
							src={project.mainAsset.url}
							alt={project.mainAsset.alt || `${project.name} — Hero | Kundo Studio`}
							fill
							className="object-cover"
							container={{ className: "aspect-video relative" }}
						/>
					</div>
				) : (
					<div
						className="mt-12 animate-enter"
						style={{ "--stagger": 1 } as React.CSSProperties}
					>
						<HeroAsset
							filetype={project.mainAsset.filetype}
							src={project.mainAsset.url}
							alt={project.mainAsset.alt || `${project.name} — Hero | Kundo Studio`}
							fill
							className="object-cover"
						/>
					</div>
				)
			)}

			{/* 3. ALL ASSETS stacked */}
			{project.assets && project.assets.length > 0 && (
				<div className="flex flex-col gap-2 px-6 mt-6">
					{project.assets.map(
						(asset, index) =>
							asset?.url &&
							asset?.filetype && (
								<Asset
									key={`asset-${index}`}
									filetype={asset.filetype}
									src={asset.url}
									alt={asset.alt || `${project.name} — ${index + 1} | Kundo Studio`}
									fill
									lazy
									variant="default"
									container={{ className: "aspect-video" }}
								/>
							),
					)}
				</div>
			)}

			{/* 4. TEXT CONTENT */}
			<div
				className="px-6 mt-20 max-w-[400px] flex flex-col gap-6 animate-enter"
				style={{ "--stagger": 2 } as React.CSSProperties}
			>
				{/* Title + subtitle */}
				<p className={text}>
					<span className="font-semibold">{project.name}</span>
					{project.title ? ` · ${project.title}` : ""}
				</p>

				{/* Description */}
				{project.description && (
					<p className={cn(prose, "text-balance")}>{project.description}</p>
				)}

				{/* Secondary description — each section with its own title */}
				{secondarySections.map((section, index) => (
					<div key={`section-${index}`}>
						{section.title && (
							<p className={cn(text, "mb-2 text-secondary")}>
								{section.title}
							</p>
						)}
						{section.content && (
							<PortableText
								value={section.content}
								classes={{
									block: { normal: cn(prose, "mb-2 last:mb-0") },
								}}
							/>
						)}
					</div>
				))}

				{/* Services */}
				{services.length > 0 && (
					<div>
						<p className={cn(text, "text-secondary")}>Services:</p>
						{services.map((service: string, i: number) => (
							<p key={`svc-${i}`} className={text}>{service}</p>
						))}
					</div>
				)}

				{/* Credits */}
				{allCredits.length > 0 && (
					<div>
						<p className={cn(text, "text-secondary")}>Credits:</p>
						{allCredits.map(
							(item: { role?: string; people?: string }, idx: number) =>
								item.role && item.people && (
									<p key={`credit-${idx}`} className={text}>
										- {item.role}: {item.people.split("\n").join(", ")}
									</p>
								),
						)}
					</div>
				)}
			</div>

			{/* 5. PROJECT NAVIGATION */}
			{(prevProject || nextProject) && (
				<div
					className={cn(
						"px-6 mt-20 mb-20 flex",
						prevProject && nextProject
							? "justify-between"
							: nextProject
								? "justify-end"
								: "justify-start",
					)}
				>
					{prevProject?.thumbnail && (
						<Link
							href={`/work/${prevProject.slug}`}
							className="flex flex-col gap-2 transition-opacity duration-300 hover:opacity-75"
						>
							<div
								className="w-[200px] aspect-video relative overflow-hidden"
								style={{ border: "0.5px solid rgba(0,0,0,0.1)" }}
							>
								<Image
									src={prevProject.thumbnail}
									alt={prevProject.title}
									fill
									className="object-cover"
									sizes="200px"
									loading="eager"
								/>
							</div>
							<span className={text}>{prevProject.title}</span>
						</Link>
					)}
					{nextProject?.thumbnail && (
						<Link
							href={`/work/${nextProject.slug}`}
							className="flex flex-col gap-2 items-end transition-opacity duration-300 hover:opacity-75"
						>
							<div
								className="w-[200px] aspect-video relative overflow-hidden"
								style={{ border: "0.5px solid rgba(0,0,0,0.1)" }}
							>
								<Image
									src={nextProject.thumbnail}
									alt={nextProject.title}
									fill
									className="object-cover"
									sizes="200px"
									loading="eager"
								/>
							</div>
							<span className={text}>{nextProject.title}</span>
						</Link>
					)}
				</div>
			)}
		</div>
	);
}
