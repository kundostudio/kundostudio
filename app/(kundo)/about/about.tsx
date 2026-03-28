"use client";

import Link from "next/link";
import { Asset } from "~/components/asset";
import { Button } from "~/components/button";
import { Page } from "~/components/page";
import * as Typography from "~/components/typography";
import { textStyles } from "~/components/typography";
import { cn } from "~/lib/utils";
import type { AboutPage as AboutPageType } from "~/lib/queries";

const ABOUT_SERVICES = [
	{
		icon: (
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0">
				<path d="M2.732 13.268C2.96416 13.5002 3.23978 13.6844 3.54314 13.8101C3.8465 13.9358 4.17164 14.0005 4.5 14.0005M2.732 13.268C3.20084 13.7368 3.83696 14.0005 4.5 14.0005M2.732 13.268C2.26316 12.7992 2 12.163 2 11.5V2.75C2 2.336 2.336 2 2.75 2H6.25C6.664 2 7 2.336 7 2.75V5.46467M4.5 14.0005C4.82836 14.0005 5.1535 13.9358 5.45686 13.8101C5.76022 13.6844 6.03585 13.5002 6.268 13.268M4.5 14.0005C5.16304 14.0005 5.79916 13.7368 6.268 13.268M4.5 14.0005L13.25 14C13.664 14 14 13.664 14 13.25V9.75C14 9.336 13.664 9 13.25 9H10.5353M6.268 13.268L10.5353 9M6.268 13.268C6.73684 12.7992 7 12.163 7 11.5V5.46467M10.5353 9L12.4547 7.08C12.748 6.788 12.748 6.31333 12.4547 6.02L9.98 3.54467C9.68667 3.252 9.212 3.252 8.92 3.54467L7 5.46467M4.5 11.5H4.50533V11.5053H4.5V11.5Z" stroke="#FAFAFA" strokeLinecap="round" strokeLinejoin="round"/>
			</svg>
		),
		title: "Branding that compounds",
		description: "Logo Design, Visual Systems, Identity Refresh, Brand Guidelines, Identity Application, Brand Identity Development, Deck & Presentations",
	},
	{
		icon: (
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0">
				<path d="M10.028 14.4481L9.12267 11.0667M9.12267 11.0667L7.44933 12.5501L7.82867 6.23672L11.3133 11.5147L9.12267 11.0667ZM4.11067 10.8887C3.47115 10.2491 2.99924 9.46168 2.73673 8.59613C2.47423 7.73059 2.42924 6.81367 2.60574 5.92658C2.78224 5.0395 3.17479 4.20964 3.74862 3.5105C4.32245 2.81136 5.05984 2.26453 5.89548 1.91844C6.73112 1.57235 7.63922 1.43769 8.53933 1.52639C9.43945 1.61508 10.3038 1.92439 11.0558 2.42692C11.8078 2.92945 12.4243 3.60968 12.8507 4.40737C13.277 5.20506 13.5 6.09558 13.5 7.00005M5.52533 9.47472C5.11828 9.06774 4.81789 8.56664 4.65077 8.01583C4.48365 7.46502 4.45495 6.88149 4.56723 6.31694C4.67951 5.75239 4.92929 5.22424 5.29445 4.77928C5.6596 4.33433 6.12887 3.9863 6.66066 3.76604C7.19246 3.54577 7.77037 3.46006 8.34321 3.51651C8.91604 3.57295 9.46611 3.7698 9.94469 4.08963C10.4233 4.40945 10.8156 4.84237 11.0869 5.35004C11.3582 5.85771 11.5001 6.42445 11.5 7.00005" stroke="#FAFAFA" strokeLinecap="round" strokeLinejoin="round"/>
			</svg>
		),
		title: "Product design that works",
		description: "Product Design, UI/UX Design, User Interfaces, Interaction Design, Design Systems, Wireframes & Flows",
	},
	{
		icon: (
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0">
				<path d="M6 8.49999L7.5 9.99999L10 6.49999M8 1.80933C6.49049 3.24282 4.48018 4.02904 2.39867 3.99999C2.13389 4.80665 1.99932 5.65033 2 6.49933C2 10.2273 4.54934 13.3593 8 14.248C11.4507 13.36 14 10.228 14 6.49999C14 5.62666 13.86 4.78599 13.6013 3.99933H13.5C11.3693 3.99933 9.43334 3.16733 8 1.80933Z" stroke="#FAFAFA" strokeLinecap="round" strokeLinejoin="round"/>
			</svg>
		),
		title: "Websites that win trust",
		description: "Website Design, Landing Pages, Responsive Design, Frontend Development, CMS Integration, Creative Development, Web 3D & Interactive, E-commerce Experiences",
	},
	{
		icon: (
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0">
				<path d="M14 8C14 8.78793 13.8448 9.56815 13.5433 10.2961C13.2417 11.0241 12.7998 11.6855 12.2426 12.2426C11.6855 12.7998 11.0241 13.2417 10.2961 13.5433C9.56815 13.8448 8.78793 14 8 14C7.21207 14 6.43185 13.8448 5.7039 13.5433C4.97595 13.2417 4.31451 12.7998 3.75736 12.2426C3.20021 11.6855 2.75825 11.0241 2.45672 10.2961C2.15519 9.56815 2 8.78793 2 8C2 6.4087 2.63214 4.88258 3.75736 3.75736C4.88258 2.63214 6.4087 2 8 2C9.5913 2 11.1174 2.63214 12.2426 3.75736C13.3679 4.88258 14 6.4087 14 8Z" stroke="#FAFAFA" strokeLinecap="round" strokeLinejoin="round"/>
				<path d="M10.6067 7.78129C10.6457 7.80292 10.6782 7.83461 10.7009 7.87306C10.7235 7.91151 10.7355 7.95533 10.7355 7.99996C10.7355 8.04458 10.7235 8.0884 10.7009 8.12685C10.6782 8.1653 10.6457 8.19699 10.6067 8.21862L6.87133 10.294C6.83327 10.3151 6.79035 10.3259 6.74682 10.3254C6.70329 10.3248 6.66066 10.3129 6.62314 10.2908C6.58563 10.2687 6.55454 10.2372 6.53294 10.1994C6.51134 10.1616 6.49999 10.1188 6.5 10.0753V5.92462C6.5 5.73396 6.70467 5.61396 6.87133 5.70662L10.6067 7.78129Z" stroke="#FAFAFA" strokeLinecap="round" strokeLinejoin="round"/>
			</svg>
		),
		title: "Motion design built for clarity",
		description: "Motion Design, UI Animations, Logo Reveals, Product Launch Videos, Explainer Videos, Promo Videos, Infographic Animation, Brand Videos",
	},
];

const ABOUT_PARAGRAPHS = [
	"We work with intention\u2014tuning every element to reflect clarity, utility, and strength. No filler, no fluff. Just the right foundations to help you grow.",
	"We adapt to context, but we always move with precision. Early-stage, late-stage, or in transition\u2014we shape what\u2019s next without losing sight of what matters.",
	"What we build holds together\u2014visually, structurally, and strategically. So when people see it, use it, or move through it, it just makes sense.",
];

export function AboutPage({ aboutData }: { aboutData: AboutPageType | null }) {
	const heroAsset = aboutData?.hero?.asset;
	const prefooterAsset = aboutData?.prefooter?.asset;

	return (
		<Page className="flex flex-col w-full mx-auto mt-0">
			{/* Section 1: Hero */}
			<section className="relative overflow-hidden bg-[#050505] h-[500px] sm:h-[600px] md:h-[700px] lg:h-[810px] flex items-center justify-center">
				{heroAsset?.url && (
					<Asset
						filetype={heroAsset.filetype}
						src={heroAsset.url}
						fill
						sizes="100vw"
						container={{
							className: "absolute inset-0 aspect-[1.77]",
						}}
					/>
				)}
				<div
					className="absolute inset-x-0 -bottom-10 h-60 pointer-events-none"
					style={{
						background: "linear-gradient(180deg, transparent 0%, #050505 50%)",
						filter: "blur(30px)",
					}}
				/>
				<div className="relative z-10 text-center px-6 md:px-8">
					<Typography.H1 className="text-primary max-w-full md:max-w-[580px] xl:max-w-[780px] mx-auto whitespace-pre-line">
						{"Shaped by intent, precision,\nsimplicity, and care."}
					</Typography.H1>
				</div>
			</section>

			{/* Section 2: Form, function, and forward motion */}
			<section className="mt-16">
				<div className="container">
					<div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12 xl:pl-[219px]">
						<div className="lg:w-[40%] xl:w-[405px] lg:shrink-0">
							<Typography.H2 className="text-primary">
								Form, function, and forward motion.
							</Typography.H2>
						</div>
						<div className="lg:flex-1 xl:w-[460px] xl:flex-none flex flex-col gap-6">
							{ABOUT_PARAGRAPHS.map((paragraph, i) => (
								<Typography.P key={i} className="text-secondary">
									{paragraph}
								</Typography.P>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Section 3: Creativity and execution */}
			<section className="mt-[188px]">
				<div className="container">
					<div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12 xl:pl-[219px]">
						<div className="lg:w-[40%] xl:w-[405px] lg:shrink-0">
							<Typography.H3 className="text-primary max-w-[373px]">
								Creativity and execution in careful balance for those who value precision and clarity.
							</Typography.H3>
						</div>
						<div className="lg:flex-1 flex flex-col gap-12">
							{ABOUT_SERVICES.map((service) => (
								<div key={service.title} className="flex flex-col gap-[10px] max-w-[460px]">
									<div className="flex items-center gap-2">
										{service.icon}
										<h3 className={cn(textStyles.h5, "text-primary")}>{service.title}</h3>
									</div>
									<Typography.Small className="text-secondary">
										{service.description}
									</Typography.Small>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Section 4: CTA */}
			<section className="relative overflow-hidden flex flex-col items-center justify-center text-center min-h-screen mt-[129px]">
				{prefooterAsset?.url && (
					<div
						className="absolute inset-0 flex justify-center items-start mix-blend-hard-light h-[632px] m-auto"
						style={{
							maskImage:
								"linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 86px, rgba(0,0,0,1) 216px, rgba(0,0,0,1) calc(100% - 216px), rgba(0,0,0,0) calc(100% - 86px), rgba(0,0,0,0) 100%)",
							WebkitMaskImage:
								"linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 86px, rgba(0,0,0,1) 216px, rgba(0,0,0,1) calc(100% - 216px), rgba(0,0,0,0) calc(100% - 86px), rgba(0,0,0,0) 100%)",
						}}
					>
						<Asset
							filetype={prefooterAsset.filetype}
							src={prefooterAsset.url}
							className="object-contain mt-[114px]"
							variant="default"
							noOutline
							lazy
							width={306.6}
							height={460}
						/>
					</div>
				)}
				<div className="relative z-10 flex flex-col items-center">
					<Typography.H2
						className="text-primary"
						style={{
							textShadow: "0 4px 16px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.6)",
						}}
					>
						Built with intent.
					</Typography.H2>
					<div className="mt-8 sm:mt-10">
						<Link href="/contact">
							<Button className="w-[320px] h-12">Contact</Button>
						</Link>
					</div>
				</div>
			</section>

		</Page>
	);
}
