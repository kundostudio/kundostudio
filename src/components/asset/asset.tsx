"use client";

import type MuxPlayer from "@mux/mux-player-react";
import dynamic from "next/dynamic";

// Lazy-load Mux player only on client to avoid SSR hydration mismatch
const ClientMuxPlayer = dynamic(() => import("@mux/mux-player-react"), {
	ssr: false,
	loading: () => (
		<div className="w-full aspect-video bg-neutral-950 animate-pulse rounded-[inherit]" />
	),
});

import NextImage, { type ImageProps as NextImageProps } from "next/image";
import type * as React from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";

/* =========================
 * Props por variante
 * ========================= */

type BaseContainer = {
	container?: React.HTMLAttributes<HTMLDivElement>;
	variant?: "default" | "card";
	lazy?: boolean;
	noOutline?: boolean;
};

type ImgAsset = {
	filetype: "img";
} & BaseContainer &
	// Hago alt opcional en tu wrapper, aunque NextImage lo pide obligatorio
	Omit<NextImageProps, "alt"> & { alt?: string };

type VideoStreamAsset = {
	filetype: "video-stream";
	// Permitimos usar playbackId o src (por compat)
	playbackId?: string;
	src?: string;
} & BaseContainer &
	Omit<React.ComponentProps<typeof MuxPlayer>, "playbackId">;

type VideoAsset = {
	filetype: "video";
} & BaseContainer &
	React.ComponentProps<"video">; // incluye src, controls, loop, etc.

export type AssetProps = ImgAsset | VideoStreamAsset | VideoAsset;

/* =========================
 * Componente discriminado
 * ========================= */

export function Asset(props: AssetProps) {
	switch (props.filetype) {
		case "img": {
			const { lazy: _, ...rest } = props;
			return <Image {...rest} />;
		}

		case "video-stream": {
			const { playbackId, src, lazy, noOutline: _, ...rest } = props;
			const id = playbackId ?? (typeof src === "string" ? src : undefined);
			if (!id) return null;
			const player = <MUXPlayer playbackId={id} {...rest} />;
			return lazy ? <LazyViewport>{player}</LazyViewport> : player;
		}

		case "video": {
			const { container, lazy, noOutline: _, ...rest } = props;
			const video = <Video container={container} {...rest} />;
			return lazy ? <LazyViewport>{video}</LazyViewport> : video;
		}
	}
}

/* =========================
 * Lazy viewport wrapper
 * ========================= */

function LazyViewport({ children }: { children: React.ReactNode }) {
	const ref = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "200px" },
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	if (isVisible) return <>{children}</>;

	return (
		<div
			ref={ref}
			className="w-full aspect-video bg-neutral-950 rounded-[inherit]"
		/>
	);
}

/* =========================
 * IMG
 * ========================= */

type ImageProps = ImgAsset;

export function Image({
	src,
	className,
	style,
	alt = "",
	container = {},
	variant = "default",
	noOutline = false,
	width,
	height,
	quality = 100,
	...props
}: ImageProps) {
	const { className: containerClassName, style: containerStyle, ...containerRest } = container;

	const [isLoading, setIsLoading] = useState(true);

	return (
		<div
			className={cn(
				"relative overflow-hidden flex justify-center items-center",
				variant === "card" && "rounded-[5px] sm:rounded-[10px]",
				width && `w-[${width}px]`,
				height && `h-[${height}px]`,
				containerClassName,
			)}
			style={containerStyle}
			{...containerRest}
		>
			<NextImage
				src={src}
				alt={alt}
				className={cn(
					"object-cover object-center opacity-0 transition-opacity duration-300",
					!isLoading && "opacity-100",
					className,
				)}
				quality={quality}
				onLoad={() => setIsLoading(false)}
				{...("fill" in props ? { fill: true } : { width, height })}
				{...props}
			/>
			{variant === "card" ? (
				<div
					className={cn(
						"absolute! inset-0 rounded-[5px] sm:rounded-[10px] border border-white/16",
						containerClassName,
					)}
				/>
			) : !noOutline ? (
				<div
					className="absolute inset-0 rounded-[inherit] pointer-events-none"
					style={{ outline: "1px solid rgba(255,255,255,0.06)", outlineOffset: "-1px" }}
				/>
			) : null}
		</div>
	);
}

/* =========================
 * MUX
 * ========================= */

type MUXPlayerProps = VideoStreamAsset;

export function MUXPlayer({
	container = {},
	className,
	style,
	muted = true,
	playbackId,
	autoPlay = true,
	loop = true,
	playsInline = true,
	variant = "default",
	...props
}: MUXPlayerProps) {
	const { className: containerClassName, style: containerStyle, ...containerRest } = container;
	const mergedStyle = { ...(containerStyle || {}), ...(style || {}) } as React.CSSProperties;

	return (
		<div
			className={cn("relative h-full flex my-auto", className, containerClassName)}
			style={mergedStyle}
			{...containerRest}
		>
			<ClientMuxPlayer
				streamType="on-demand"
				playbackId={playbackId}
				autoPlay={autoPlay}
				loop={loop}
				muted={muted}
				playsInline={playsInline}
				nohotkeys
				defaultHiddenCaptions
				thumbnailTime={0}
				className="h-full max-w-full [--controls:none] [--media-object-fit:contain]"
				{...props}
			/>
			{variant === "card" && (
				<div
					className={cn(
						"absolute! inset-0 rounded-[10px] border border-white/16",
						containerClassName,
					)}
				/>
			)}
		</div>
	);
}

/* =========================
 * VIDEO nativo
 * ========================= */

type VideoProps = VideoAsset;

export function Video({
	src,
	className,
	style,
	loop = true,
	muted = true,
	autoPlay = true,
	playsInline = true,
	container = {},
	...props
}: VideoProps) {
	const { className: containerClassName, style: containerStyle, ...containerRest } = container;
	const mergedStyle = { ...(containerStyle || {}), ...(style || {}) } as React.CSSProperties;

	return (
		<div
			className={cn("relative h-full flex my-auto", className, containerClassName)}
			style={mergedStyle}
			{...containerRest}
		>
			<video
				loop={loop}
				muted={muted}
				autoPlay={autoPlay}
				playsInline={playsInline}
				src={src}
				className="h-full max-w-full object-cover"
				{...props}
			/>
		</div>
	);
}
