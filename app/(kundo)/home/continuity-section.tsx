import Image from "next/image";
import * as Typography from "~/components/typography";
import { textStyles } from "~/components/typography";
import { cn } from "~/lib/utils";

const cardShadow = [
	"0 4px 4px 0 rgba(0, 0, 0, 0.25)",
	"0 284px 80px 0 rgba(0, 0, 0, 0.01)",
	"0 -53.13px 86.69px 0 rgba(0, 0, 0, 0.27)",
].join(", ");

type ContinuitySectionProps = {
	className?: string;
};

export function ContinuitySection({ className }: ContinuitySectionProps) {
	return (
		<section
			className={cn(
				"pt-20 sm:pt-28 lg:pt-[144px] pb-[120px] sm:pb-[168px] lg:pb-[216px]",
				className,
			)}
		>
			{/* Heading */}
			<Typography.H2 className="text-primary">
				Made for continuity.
				<br />
				Feed momentum.
			</Typography.H2>
			<Typography.P className="text-secondary mt-4 max-w-[515px]">
				We don&apos;t just deliver or do one-off projects.
				<br />
				Every engagement is designed to grow with you.
			</Typography.P>

			{/* Cards */}
			<div className="mt-14 sm:mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-11">
				{/* Foundation */}
				<div>
					<div
						className="relative aspect-[618/496] overflow-hidden rounded-2xl border border-white/[0.19]"
						style={{ boxShadow: cardShadow }}
					>
						<Image
							src="/continuity-foundation.avif"
							alt="Paper crane floating above an open hand in the dark"
							fill
							unoptimized
							className="object-cover"
							sizes="(max-width: 1024px) 100vw, 50vw"
						/>
					</div>
					<p className={cn(textStyles.pLg, "text-secondary mt-4")}>
						<span className="text-primary font-semibold">
							Foundation.
						</span>{" "}
						We define the scope, align on what success looks like,
						and build the work that sets the standard — brand,
						website, product, or all three.
					</p>
				</div>

				{/* Cycle */}
				<div>
					<div
						className="relative aspect-[618/496] overflow-hidden rounded-2xl border border-white/[0.19]"
						style={{ boxShadow: cardShadow }}
					>
						<Image
							src="/continuity-cycle.avif"
							alt="Finger touching water surface creating ripples"
							fill
							unoptimized
							className="-rotate-90 scale-[1.35] object-cover"
							sizes="(max-width: 1024px) 100vw, 50vw"
						/>
					</div>
					<p className={cn(textStyles.pLg, "text-secondary mt-4")}>
						<span className="text-primary font-semibold">
							Cycle.
						</span>{" "}
						Design doesn&apos;t end at launch — it sharpens after
						it. We refine based on real feedback, real users, and
						real results. Typically 3 to 6 months.
					</p>
				</div>
			</div>
		</section>
	);
}
