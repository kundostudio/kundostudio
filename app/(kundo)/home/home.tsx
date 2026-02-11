"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { Page } from "~/components/page";
import * as Typography from "~/components/typography";
import { useMediaQuery } from "~/hooks/use-media-query";
import { cn } from "~/lib/utils";
import { Frame } from "./frame";
import { FrameBorder } from "./frame-border";
import { FAQSection } from "./faq-section";
import { ServicesSection } from "./services-section";

declare module "react" {
	namespace JSX {
		interface IntrinsicElements {
			"mux-player": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			> & {
				"playback-id"?: string;
				autoplay?: string;
				loop?: boolean;
				muted?: boolean;
				playsinline?: boolean;
				"stream-type"?: string;
				"default-hidden-captions"?: boolean;
			};
		}
	}
}

function useIsSafari() {
	const [isSafari, setIsSafari] = useState(false);

	useEffect(() => {
		const ua = navigator.userAgent;
		setIsSafari(
			ua.includes("Safari") &&
				!ua.includes("Chrome") &&
				!ua.includes("Chromium"),
		);
	}, []);

	return isSafari;
}

const muxPlayerStyle = {
	width: "100%",
	height: "100%",
	"--media-object-fit": "cover",
	"--controls": "none",
	border: "none",
	outline: "none",
} as React.CSSProperties;

export function HomePage() {
	const isMobile = useMediaQuery("(max-width: 639px)");
	const isSafari = useIsSafari();

	return (
		<Page className={cn("mt-0 sm:mt-18 sm:pt-14", !isMobile && "container")}>
			<Script
				src="https://cdn.jsdelivr.net/npm/@mux/mux-player@3/dist/mux-player.mjs"
				type="module"
				strategy="lazyOnload"
			/>

			<div className="relative flex flex-col overflow-x-hidden">
				<div
					className="relative w-full aspect-[1222/766] min-w-full sm:min-w-none sm:min-h-[500px]"
					style={{
						...(isMobile ? { minHeight: "min(500px, 60vmax)" } : {}),
						maskImage:
							"linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0.6) 64%, rgba(0, 0, 0, 0) 80%)",
					}}
				>
					{/* Mobile: MUX video without frame */}
					<div className="absolute inset-0 sm:hidden">
						<mux-player
							playback-id="HloZlUniR6E5700REH01hfoPdy57D9g02tLo7UU100ctsS00"
							autoplay="muted"
							loop
							muted
							playsinline
							stream-type="on-demand"
							default-hidden-captions
							style={muxPlayerStyle}
						/>
					</div>

					{/* Desktop: Use foreignObject for Chrome/Firefox, CSS fallback for Safari */}
					{isSafari ? (
						<div className="pointer-events-none absolute inset-0 hidden sm:block">
							<div className="absolute left-[0.54%] right-[0.6%] top-[0.98%] bottom-0 overflow-hidden rounded-t-[36px]">
								<mux-player
									playback-id="HloZlUniR6E5700REH01hfoPdy57D9g02tLo7UU100ctsS00"
									autoplay="muted"
									loop
									muted
									playsinline
									stream-type="on-demand"
									default-hidden-captions
									style={muxPlayerStyle}
								/>
							</div>
							<FrameBorder className="absolute inset-0 h-full w-full" />
						</div>
					) : (
						<Frame className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block">
							<div className="h-full w-full">
								<mux-player
									playback-id="HloZlUniR6E5700REH01hfoPdy57D9g02tLo7UU100ctsS00"
									autoplay="muted"
									loop
									muted
									playsinline
									stream-type="on-demand"
									default-hidden-captions
									style={muxPlayerStyle}
								/>
							</div>
						</Frame>
					)}
				</div>

				<div className="px-4 sm:px-0 sm:-translate-y-full">
					<Typography.H3 className="text-secondary">Kundo Studio</Typography.H3>
					<Typography.H1 className="text-primary">
						Design that moves you forward
					</Typography.H1>
				</div>
			</div>

			{/* Decorative line + glow (between hero and services) */}
			<div className="relative mt-16" style={{ height: 0 }}>
				<div
					aria-hidden="true"
					className="pointer-events-none absolute top-0 -left-[50vw] -right-[50vw] ml-[50%] mr-[50%] w-screen"
					style={{ height: 400 }}
				>
					{/* Horizontal gradient line */}
					<div
						className="absolute inset-x-0 top-0 h-px opacity-[0.1]"
						style={{
							background:
								"linear-gradient(90deg, rgba(255,255,255,0) 0%, #FFF 52.6%, rgba(255,255,255,0) 100%)",
						}}
					/>
					{/* Radial gradient glow */}
					<div
						className="pointer-events-none absolute inset-0"
						style={{
							background:
								"radial-gradient(ellipse 525px 270px at 50% 0%, rgba(159,159,159,0.12), transparent 100%)",
						}}
					/>
					{/* Noise texture */}
					<div
						className="absolute inset-x-0 top-0 h-[375px] opacity-[0.16]"
						style={{
							backgroundImage: "url('/noise.png')",
							backgroundSize: "100% 100%",
							backgroundRepeat: "no-repeat",
						}}
					/>
				</div>
			</div>

			{/* Services Section */}
			<ServicesSection />

			{/* FAQ Section */}
			<FAQSection />
		</Page>
	);
}
