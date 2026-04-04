"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Sign from "~/public/projects/sign.svg";
import type { Project } from "~/lib/queries";

interface GalleryAsset {
	imageUrl: string;
	slug: string;
	projectName: string;
	key: string;
}

function ScrollIndicator() {
	return (
		<div className="flex flex-col items-center gap-2">
			<svg
				width="24"
				height="38"
				viewBox="0 0 24 38"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="opacity-30"
			>
				<rect
					x="1"
					y="1"
					width="22"
					height="36"
					rx="11"
					stroke="currentColor"
					strokeWidth="1.5"
					className="text-primary"
				/>
				<circle
					cx="12"
					cy="10"
					r="2"
					fill="currentColor"
					className="text-primary animate-scroll-dot"
				/>
			</svg>
		</div>
	);
}

function GalleryImage({ src, alt, eager = false }: { src: string; alt: string; eager?: boolean }) {
	const [loaded, setLoaded] = useState(false);

	return (
		<div className="relative w-full h-full">
			<div
				className="absolute inset-0 bg-[#ebebeb] transition-opacity duration-500 ease-out"
				style={{ opacity: loaded ? 0 : 1 }}
			/>
			<img
				src={src}
				alt={alt}
				loading={eager ? "eager" : "lazy"}
				onLoad={() => setLoaded(true)}
				className="w-full h-full object-cover transition-all duration-500 ease-out"
				style={{
					opacity: loaded ? 1 : 0,
					filter: loaded ? "blur(0px)" : "blur(10px)",
					transform: loaded ? "scale(1)" : "scale(1.02)",
				}}
			/>
		</div>
	);
}

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

interface HomePageProps {
	projects: Project[];
}

export function HomePage({ projects }: HomePageProps) {
	const [videoLoaded, setVideoLoaded] = useState(false);
	const [muxReady, setMuxReady] = useState(false);

	// Load mux-player script immediately
	useEffect(() => {
		const script = document.createElement("script");
		script.src =
			"https://cdn.jsdelivr.net/npm/@mux/mux-player@3/dist/mux-player.mjs";
		script.type = "module";
		script.onload = () => setMuxReady(true);
		document.head.appendChild(script);
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

	const allAssets = projects.flatMap((project) => {
		const assets: GalleryAsset[] = [];

		if (project.mainAsset?.url && project.mainAsset.filetype === "img") {
			assets.push({
				imageUrl: project.mainAsset.url,
				slug: project.slug,
				projectName: project.name,
				key: `${project._id}-main`,
			});
		}

		if (project.assets) {
			project.assets.forEach((asset, index) => {
				if (asset?.url && asset.filetype === "img") {
					assets.push({
						imageUrl: asset.url,
						slug: project.slug,
						projectName: project.name,
						key: `${project._id}-asset-${index}`,
					});
				}
			});
		}

		return assets;
	});

	const [shuffledAssets, setShuffledAssets] = useState<GalleryAsset[]>([]);

	useEffect(() => {
		const shuffled = [...allAssets];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		setShuffledAssets(shuffled);
	}, []);

	const displayAssets = shuffledAssets.length > 0 ? shuffledAssets : allAssets;

	return (
		<div>
			<h1 className="sr-only text-balance">
				Branding &amp; Website Design for Startups and Growing Companies |
				Kundo Studio
			</h1>

			{/* Hero — video + scroll indicator */}
			<div className="relative h-screen overflow-hidden">
				<div
					className="animate-enter relative mx-auto mt-[144px] w-[1120px] max-w-[calc(100%-48px)] aspect-video overflow-hidden"
					style={{ backgroundColor: "#f0f0f0", "--stagger": 0 } as React.CSSProperties}
					>
						{/* Logo placeholder - visible until video loads */}
						<div
							className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
							style={{
								opacity: videoLoaded ? 0 : 0.4,
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
									fill="#2A2A2A"
								/>
							</svg>
						</div>
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
							loop
							stream-type="on-demand"
							default-hidden-captions
							title="Kundo Studio showreel"
							style={muxPlayerStyle}
						/>
					</div>

				{/* Scroll indicator — bottom of viewport */}
				<div className="absolute bottom-8 left-1/2 -translate-x-1/2">
					<ScrollIndicator />
				</div>
			</div>

			{/* Assets gallery — 2 columns */}
			<div className="px-6 mt-[20vh]">
				<div className="grid grid-cols-2 gap-2">
					{displayAssets.map((asset, index) => (
						<Link
							key={asset.key}
							href={`/work/${asset.slug}`}
							className="relative aspect-video overflow-hidden block transition-opacity duration-300 hover:opacity-85"
						>
							<GalleryImage src={asset.imageUrl} alt={asset.projectName} eager={index < 8} />
						</Link>
					))}
				</div>
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
	);
}
