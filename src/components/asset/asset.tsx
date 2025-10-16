"use client";

import type MuxPlayer from "@mux/mux-player-react";
import dynamic from "next/dynamic";

// Lazy-load Mux player only on client to avoid SSR hydration mismatch
const ClientMuxPlayer = dynamic(() => import("@mux/mux-player-react"), {
	ssr: false,
});

import NextImage, { type ImageProps as NextImageProps } from "next/image";
import type * as React from "react";
import { cn } from "~/lib/utils";

/* =========================
 * Props por variante
 * ========================= */

type BaseContainer = {
	container?: React.HTMLAttributes<HTMLDivElement>;
	variant?: "default" | "card";
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
		case "img":
			return <Image {...props} />;

		case "video-stream": {
			const { playbackId, src, ...rest } = props;
			const id = playbackId ?? (typeof src === "string" ? src : undefined);
			if (!id) return null;
			return <MUXPlayer playbackId={id} {...rest} />;
		}

		case "video": {
			// Evitamos pasar filetype/container al <video>
			const { container, ...rest } = props;
			return <Video container={container} {...rest} />;
		}
	}
}

/* =========================
 * IMG
 * ========================= */

type ImageProps = ImgAsset;

export function Image({
	src,
	className,
	style,
	alt = "Asset",
	container = {},
	variant = "default",
	width,
	height,
	quality = 100,
	...props
}: ImageProps) {
	const { className: containerClassName, style: containerStyle, ...containerRest } = container;

	return (
		<div
			className={cn(
				"relative overflow-hidden flex justify-center items-center",
				variant === "card" && "rounded-[10px]",
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
				className={cn("object-cover", className)}
				quality={quality}
				{...("fill" in props ? { fill: true } : { width, height })}
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
