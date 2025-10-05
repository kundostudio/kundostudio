"use client";

import MuxPlayer from "@mux/mux-player-react";
import NextImage, { type ImageProps as NextImageProps } from "next/image";
import { cn } from "~/lib/utils";

export type AssetProps =
	| ({
			filetype: "img";
	  } & ImageProps)
	| ({
			filetype: "video";
	  } & VideoProps)
	| ({
			filetype: "video-stream";
	  } & MUXPlayerProps);

export function Asset(props: AssetProps) {
	if (props.filetype === "img") {
		const { filetype: _ignoredType, ...imageProps } = props;

		return <Image {...imageProps} />;
	}

	if (props.filetype === "video-stream") {
		const { filetype: _ignoredType, ...muxProps } = props;

		return <MUXPlayer {...muxProps} />;
	}

	if (props.filetype === "video") {
		const { filetype: _ignoredType, ...videoProps } = props;

		return <Video {...videoProps} />;
	}

	return null;
}

type ImageProps = NextImageProps & {
	container?: React.HTMLAttributes<HTMLDivElement>;
};

export function Image({
	src,
	className,
	style,
	alt = "Asset",
	container = {},
	...props
}: ImageProps) {
	const { className: containerClassName, style: containerStyle, ...containerRest } = container;
	const mergedStyle = { ...(containerStyle || {}), ...(style || {}) } as React.CSSProperties;
	return (
		<div
			className={cn("relative rounded-[10px] overflow-hidden", className, containerClassName)}
			style={mergedStyle}
			{...containerRest}
		>
			<NextImage src={src} alt={alt} className={cn("object-cover")} {...props} />
			<div className="absolute inset-0 rounded-[10px] border border-white/16" />
		</div>
	);
}

type MUXPlayerProps = React.ComponentProps<typeof MuxPlayer> & {
	container?: React.HTMLAttributes<HTMLDivElement>;
	muted?: boolean;
	playbackId: string;
};

export function MUXPlayer({
	container = {},
	className,
	style,
	muted = true,
	playbackId,
	autoPlay = true,
	loop = true,
	playsInline = true,
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
			<MuxPlayer
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
		</div>
	);
}

type VideoProps = React.ComponentProps<"video"> & {
	container?: React.HTMLAttributes<HTMLDivElement>;
	muted?: boolean;
};

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
