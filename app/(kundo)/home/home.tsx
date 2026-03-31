"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Sign from "~/public/projects/sign.svg";

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

const PLAYBACK_ID = "HloZlUniR6E5700REH01hfoPdy57D9g02tLo7UU100ctsS00";
const POSTER_URL = `https://image.mux.com/${PLAYBACK_ID}/thumbnail.webp?width=960&height=540&time=0&fit_mode=smartcrop`;

const muxPlayerStyle = {
	width: "100%",
	height: "100%",
	"--media-object-fit": "cover",
	"--controls": "none",
	"--captions-display": "none",
} as React.CSSProperties;

export function HomePage() {
	const router = useRouter();
	const [videoLoaded, setVideoLoaded] = useState(false);
	const [muxReady, setMuxReady] = useState(false);
	const [isFading, setIsFading] = useState(false);

	// Load mux-player script on first user interaction
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
		for (const p of players) {
			p.addEventListener("playing", handlePlaying);
			if ((p as unknown as HTMLMediaElement).paused === false)
				setVideoLoaded(true);
		}
		return () => {
			for (const p of players) {
				p.removeEventListener("playing", handlePlaying);
			}
		};
	}, [muxReady]);

	// Redirect to /work when video ends
	useEffect(() => {
		if (!muxReady) return;

		const handleEnded = () => {
			setIsFading(true);
			setTimeout(() => {
				router.push("/work");
			}, 1200);
		};

		const players = document.querySelectorAll("mux-player");
		for (const p of players) {
			p.addEventListener("ended", handleEnded);
		}
		return () => {
			for (const p of players) {
				p.removeEventListener("ended", handleEnded);
			}
		};
	}, [muxReady, router]);

	return (
		<main className="flex flex-col min-h-screen">
			<h1 className="sr-only text-balance">
				Branding &amp; Website Design for Startups and Growing Companies |
				Kundo Studio
			</h1>

			<div
				className="transition-all duration-1000 ease-out"
				style={{
					opacity: isFading ? 0 : 1,
					filter: isFading ? "blur(12px)" : "blur(0px)",
					transform: isFading ? "scale(0.98)" : "scale(1)",
				}}
			>
			{/* Video */}
			<div
				className="animate-enter relative mx-auto mt-[144px] w-[1120px] max-w-[calc(100%-48px)] aspect-video overflow-hidden"
				style={{ backgroundColor: "#f0f0f0", "--stagger": 0 } as React.CSSProperties}
			>
				{/* Poster fallback with blur-to-sharp transition */}
				<img
					src={POSTER_URL}
					alt=""
					fetchPriority="high"
					className="absolute inset-0 z-10 w-full h-full object-cover pointer-events-none"
					style={{
						filter: videoLoaded ? "blur(0px)" : "blur(20px)",
						transform: videoLoaded ? "scale(1)" : "scale(1.1)",
						opacity: videoLoaded ? 0 : 1,
						transition: "filter 0.8s ease-out, transform 0.8s ease-out, opacity 0.8s ease-out 0.4s",
					}}
				/>
				<mux-player
					playback-id={PLAYBACK_ID}
					autoplay="muted"
					muted
					playsinline
					stream-type="on-demand"
					default-hidden-captions
					title="Kundo Studio showreel"
					style={muxPlayerStyle}
				/>
			</div>

			{/* Seal */}
			<div
				className="animate-enter flex flex-col items-center gap-4 mt-[140px] mb-[120px]"
				style={{ "--stagger": 1 } as React.CSSProperties}
			>
				<Sign className="w-[50px] h-auto text-primary" />
				<Image
					src="/projects/seal.png"
					alt="Kundo Quality Seal"
					quality={100}
					width={80}
					height={80}
					className="select-none"
					loading="eager"
					priority
				/>
			</div>
			</div>
		</main>
	);
}
