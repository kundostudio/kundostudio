"use client";

import Link from "next/link";
import { cn } from "~/lib/utils";
import ArrowLeft from "~/public/icons/arrow-left.svg";
import ArrowRight from "~/public/icons/arrow-right.svg";
import ArrowUp from "~/public/icons/arrow-up.svg";

interface ProjectNavProps {
	prevProject?: { slug: string; title: string } | null;
	nextProject?: { slug: string; title: string } | null;
	className?: string;
}

const glassStyles: React.CSSProperties = {
	boxShadow: `
		inset -1px -1px 0px -0.5px rgba(255, 255, 255, 0.24),
		inset 1px 1px 0px -0.5px rgba(255, 255, 255, 0.24),
		inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.12),
		0px 4.12px 9.21px 0px rgba(0, 0, 0, 0.1),
		0px 16.73px 16.73px 0px rgba(0, 0, 0, 0.09),
		0px 37.82px 22.79px 0px rgba(0, 0, 0, 0.05),
		0px 67.15px 26.91px 0px rgba(0, 0, 0, 0.01),
		0px 104.97px 29.33px 0px rgba(0, 0, 0, 0)
	`,
	backdropFilter: "blur(24px)",
	WebkitBackdropFilter: "blur(24px)",
};

export function ProjectNav({ prevProject, nextProject, className }: ProjectNavProps) {
	const handleScrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div
			className={cn(
				"fixed bottom-10 left-1/2 -translate-x-1/2 z-50 isolate",
				"flex items-center gap-3",
				className,
			)}
		>
			{/* Main navigation pill */}
			<div className="relative flex items-center gap-8 h-11 px-3.5">
				{/* Blur background layer */}
				<div
					className="absolute inset-0 rounded-full bg-white/12 border-[0.5px] border-white/40"
					style={glassStyles}
					aria-hidden="true"
				/>

				{/* Previous Project */}
				{prevProject ? (
					<Link
						href={`/work/${prevProject.slug}`}
						className="relative z-10 flex items-center gap-1.5 text-[#f5f5f7] hover:opacity-80 transition-opacity"
					>
						<ArrowLeft className="size-5" />
						<span className="font-medium text-[17px] leading-[25px] tracking-[-0.17px] [text-shadow:0px_2px_2px_rgba(0,0,0,0.16)]">
							<span className="md:hidden">Previous</span>
							<span className="hidden md:inline">Previous Project</span>
						</span>
					</Link>
				) : (
					<span className="relative z-10 flex items-center gap-1.5 text-[#f5f5f7]/40 cursor-not-allowed">
						<ArrowLeft className="size-5" />
						<span className="font-medium text-[17px] leading-[25px] tracking-[-0.17px]">
							<span className="md:hidden">Previous</span>
							<span className="hidden md:inline">Previous Project</span>
						</span>
					</span>
				)}

				{/* Next Project */}
				{nextProject ? (
					<Link
						href={`/work/${nextProject.slug}`}
						className="relative z-10 flex items-center gap-1.5 text-[#f5f5f7] hover:opacity-80 transition-opacity"
					>
						<span className="font-medium text-[17px] leading-[25px] tracking-[-0.17px] [text-shadow:0px_2px_2px_rgba(0,0,0,0.16)]">
							<span className="md:hidden">Next</span>
							<span className="hidden md:inline">Next Project</span>
						</span>
						<ArrowRight className="size-5" />
					</Link>
				) : (
					<span className="relative z-10 flex items-center gap-1.5 text-[#f5f5f7]/40 cursor-not-allowed">
						<span className="font-medium text-[17px] leading-[25px] tracking-[-0.17px]">
							<span className="md:hidden">Next</span>
							<span className="hidden md:inline">Next Project</span>
						</span>
						<ArrowRight className="size-5" />
					</span>
				)}
			</div>

			{/* Scroll to top button */}
			<button
				type="button"
				onClick={handleScrollToTop}
				className="group relative size-11 flex items-center justify-center text-[#f5f5f7] cursor-pointer"
				aria-label="Scroll to top"
			>
				{/* Blur background layer */}
				<div
					className="absolute inset-0 rounded-full bg-white/12 border-[0.5px] border-white/40 transition-colors duration-200 group-hover:bg-white/20"
					style={glassStyles}
					aria-hidden="true"
				/>
				<ArrowUp className="relative z-10 size-5 transition-opacity duration-200 group-hover:opacity-80" />
			</button>
		</div>
	);
}
