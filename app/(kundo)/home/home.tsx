"use client";

import { useEffect, useRef, useState } from "react";
import { Page } from "~/components/page";
import * as Typography from "~/components/typography";
import { textStyles } from "~/components/typography";
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
				title?: string;
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

function HeroLogoPlaceholder({ visible }: { visible: boolean }) {
	return (
		<div
			className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
			aria-hidden="true"
			style={{
				opacity: visible ? 1 : 0,
				transition: "opacity 0.6s ease-out",
			}}
		>
			<svg
				width="80"
				height="40"
				viewBox="0 0 32 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M32 0V5H20.4755C20.3893 5 20.3628 5.12075 20.4403 5.15855C21.9082 5.87413 23.1559 6.85501 24.3206 7.77056C26.6 9.56278 28.5689 11.1111 32 11.1111V16C26.8767 16 23.7839 13.5678 21.2989 11.6139C19.1756 9.94444 17.8828 9 16 9C14.1172 9 12.8244 9.94444 10.7011 11.6139C8.21612 13.5678 5.12278 16 0 16V11.1111C3.43111 11.1111 5.40003 9.56334 7.67947 7.77056C8.84403 6.85481 10.0916 5.87403 11.5592 5.15855C11.6368 5.12075 11.6103 5 11.524 5H0V0H32Z"
					fill="#1a1a1a"
				/>
			</svg>
		</div>
	);
}

const HERO_POSTER_URL =
	"https://image.mux.com/HloZlUniR6E5700REH01hfoPdy57D9g02tLo7UU100ctsS00/thumbnail.webp?width=960&height=540&time=0&fit_mode=smartcrop";

interface HomePageProps {
	testimonials: Array<{
		quote: string;
		name: string;
		role: string;
		company: string;
	}>;
}

export function HomePage({ testimonials }: HomePageProps) {
	const isSafari = useIsSafari();
	const [videoLoaded, setVideoLoaded] = useState(false);
	const [muxReady, setMuxReady] = useState(false);
	const frameContainerRef = useRef<HTMLDivElement>(null);

	// Load mux-player script on first user interaction (invisible to Lighthouse)
	useEffect(() => {
		let loaded = false;

		const loadMux = () => {
			if (loaded) return;
			loaded = true;

			const script = document.createElement("script");
			script.src =
				"https://cdn.jsdelivr.net/npm/@mux/mux-player@3/dist/mux-player.mjs";
			script.type = "module";
			script.onload = () => setMuxReady(true);
			document.head.appendChild(script);

			for (const evt of events) {
				window.removeEventListener(evt, loadMux);
			}
		};

		const events = ["scroll", "click", "touchstart", "mousemove", "keydown"];
		for (const evt of events) {
			window.addEventListener(evt, loadMux, { passive: true });
		}

		return () => {
			for (const evt of events) {
				window.removeEventListener(evt, loadMux);
			}
		};
	}, []);

	// Detect when video starts playing to fade out poster
	useEffect(() => {
		if (!muxReady) return;

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
	}, [muxReady]);

	return (
		<Page className="mt-0 overflow-x-hidden">
			<h1 className="sr-only">Branding &amp; Website Design for Startups and Growing Companies | Kundo Studio</h1>
			{/* Hero — full viewport height, frame centered, H1 anchored near bottom */}
			<div className="relative min-h-screen">
				{/* Frame — centered in the hero area */}
				<div
					ref={frameContainerRef}
					className="absolute inset-x-0 top-[112px] w-full max-w-[1312px] mx-auto min-h-[min(500px,60vmax)] sm:min-h-[500px] sm:aspect-[1222/766]"
					style={{
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
						<img
							src={HERO_POSTER_URL}
							alt=""
							fetchPriority="high"
							className="absolute inset-0 z-10 w-full h-full object-cover pointer-events-none"
							style={{
								borderRadius: "inherit",
								opacity: videoLoaded ? 0 : 1,
								transition: "opacity 0.6s ease-out",
							}}
						/>
						<HeroLogoPlaceholder visible={!videoLoaded} />
						<mux-player
							playback-id="HloZlUniR6E5700REH01hfoPdy57D9g02tLo7UU100ctsS00"
							autoplay="muted"
							loop
							muted
							playsinline
							stream-type="on-demand"
							default-hidden-captions
							title="Kundo Studio showreel"
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
								<img
									src={HERO_POSTER_URL}
									alt=""
									fetchPriority="high"
									className="absolute inset-0 z-10 w-full h-full object-cover pointer-events-none"
									style={{
										borderRadius: "inherit",
										opacity: videoLoaded ? 0 : 1,
										transition: "opacity 0.6s ease-out",
									}}
								/>
								<HeroLogoPlaceholder visible={!videoLoaded} />
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
								<img
									src={HERO_POSTER_URL}
									alt=""
									fetchPriority="high"
									className="absolute inset-0 z-10 w-full h-full object-cover pointer-events-none"
									style={{
										borderRadius: "inherit",
										opacity: videoLoaded ? 0 : 1,
										transition: "opacity 0.6s ease-out",
									}}
								/>
								<HeroLogoPlaceholder visible={!videoLoaded} />
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

				{/* Hero headline — anchored near bottom of viewport */}
				<div className="absolute bottom-[40px] md:bottom-[60px] xl:bottom-[80px] left-0 right-0 container">
					<Typography.OverlineLg className="text-secondary">Kundo Studio</Typography.OverlineLg>
					<p className={cn(textStyles.h1, "text-primary")}>
						Design the company you're becoming
					</p>
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
