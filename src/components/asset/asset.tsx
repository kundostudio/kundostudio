"use client";

import MuxPlayer from "@mux/mux-player-react";
import NextImage from "next/image";
import { useState } from "react";
import { cn } from "~/lib/utils";

type AssetType = "img" | "video" | "video-stream";

export interface AssetProps {
	url: string;
	filetype: AssetType;
}

type Props = {
	asset: AssetProps;
	className?: string;
	imageClassName?: string;
	alt?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function Asset({ asset, className, imageClassName, alt = "Asset", ...props }: Props) {
	const [muted, setMuted] = useState(true);

	if (!asset?.url || !asset?.filetype) {
		return null;
	}

	if (asset.filetype === "img") {
		return (
			<div className={cn("relative rounded-[10px] overflow-hidden", className)} {...props}>
				<NextImage src={asset.url} alt={alt} fill className={cn("object-cover", imageClassName)} />
				<div className="absolute inset-0 rounded-[10px] border border-white/16" />
			</div>
		);
	}

	if (asset.filetype === "video-stream") {
		return (
			<div className={cn("relative h-full flex my-auto", className)} {...props}>
				<MuxPlayer
					streamType="on-demand"
					playbackId={asset.url}
					autoPlay
					loop
					muted={muted}
					nohotkeys
					defaultHiddenCaptions
					thumbnailTime={0}
					className="h-full max-w-full [--controls:none] [--media-object-fit:contain]"
				/>
			</div>
		);
	}

	if (asset.filetype === "video") {
		return (
			<div className={cn("relative h-full flex my-auto", className)} {...props}>
				<video
					loop
					autoPlay
					muted={muted}
					src={asset.url}
					className="h-full max-w-full object-cover"
				/>
			</div>
		);
	}

	return null;
}
