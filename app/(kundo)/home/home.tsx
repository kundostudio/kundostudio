"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { Page } from "~/components/page";
import * as Typography from "~/components/typography";
import { useMediaQuery } from "~/hooks/use-media-query";
import { cn } from "~/lib/utils";
import { Frame } from "./frame";
import { FrameBorder } from "./frame-border";
import { FAQSection } from "./faq-section";
import { ServicesSection } from "./services-section";
import { TestimonialsSection } from "./testimonials-section";
import CTASection from "./cta-section";
import Footer from "./footer";
import { LensFlare } from "./lens-flare";

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

const videoOverlayStyle = (loaded: boolean): React.CSSProperties => ({
	backgroundColor: "#0C0C0C",
	borderRadius: "inherit",
	opacity: loaded ? 0 : 1,
	transition: "opacity 0.6s ease-out",
});

interface HomePageProps {
	testimonials: Array<{
		quote: string;
		name: string;
		role: string;
		company: string;
	}>;
}

export function HomePage({ testimonials }: HomePageProps) {
	const isMobile = useMediaQuery("(max-width: 639px)");
	const isSafari = useIsSafari();
	const [videoLoaded, setVideoLoaded] = useState(false);
	const frameContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handlePlaying = () => setVideoLoaded(true);
		const players = document.querySelectorAll("mux-player");
		players.forEach((p) => {
			p.addEventListener("playing", handlePlaying);
			if ((p as any).paused === false) setVideoLoaded(true);
		});
		return () => {
			players.forEach((p) =>
				p.removeEventListener("playing", handlePlaying),
			);
		};
	}, [isSafari]);

	return (
		<Page className="mt-0 overflow-x-hidden">
			<Script
				src="https://cdn.jsdelivr.net/npm/@mux/mux-player@3/dist/mux-player.mjs"
				type="module"
				strategy="lazyOnload"
			/>

			{/* Hero — full viewport height, frame centered, H1 anchored near bottom */}
			<div className="relative min-h-screen">
				{/* Frame — centered in the hero area */}
				<div
					ref={frameContainerRef}
					className="absolute inset-x-0 top-[112px] w-full max-w-[1312px] mx-auto aspect-[1222/766] sm:min-h-[500px]"
					style={{
						...(isMobile ? { minHeight: "min(500px, 60vmax)" } : {}),
						maskImage:
							"linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0.6) 64%, rgba(0, 0, 0, 0) 80%)",
					}}
				>
					{/* Mobile: MUX video without frame */}
					<div className="absolute inset-0 sm:hidden">
						<div
							className="absolute inset-0 z-10 pointer-events-none"
							style={videoOverlayStyle(videoLoaded)}
						/>
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
								<div
									className="absolute inset-0 z-10 pointer-events-none"
									style={videoOverlayStyle(videoLoaded)}
								/>
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
							<FrameBorder className="absolute inset-0 h-full w-full" style={{ transform: "scaleX(-1)" }} />
						</div>
					) : (
						<Frame className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block" style={{ transform: "scaleX(-1)" }}>
							<div className="relative h-full w-full" style={{ transform: "scaleX(-1)" }}>
								<div
									className="absolute inset-0 z-10 pointer-events-none"
									style={videoOverlayStyle(videoLoaded)}
								/>
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

				{/* H1 — anchored near bottom of viewport */}
				<div className="absolute bottom-[40px] md:bottom-[60px] xl:bottom-[80px] left-0 right-0 container">
					<Typography.OverlineLg className="text-secondary">Kundo Studio</Typography.OverlineLg>
					<Typography.H1 className="text-primary">
						Design that moves you forward
					</Typography.H1>
				</div>

				<LensFlare targetRef={frameContainerRef} play={videoLoaded} />
			</div>

			{/* Decorative line + glow (between hero and services) */}
			<div className="relative mt-16" style={{ height: 0 }}>
				<div
					aria-hidden="true"
					className="pointer-events-none absolute top-0 left-0 right-0 w-full"
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
			<ServicesSection className="container" />

			{/* Testimonials Section */}
			<TestimonialsSection testimonials={testimonials} className="px-6 md:px-8 xl:px-0" />

			{/* FAQ Section */}
			<FAQSection className="container" />

			{/* CTA Section */}
			<CTASection />

			{/* Footer */}
			<Footer className="container" />
		</Page>
	);
}
