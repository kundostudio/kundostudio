"use client";

import { useEffect, useState } from "react";

import { useViewport } from "~/hooks/useViewport";
import type { Viewport } from "~/types";

type ViewportKey = Exclude<Viewport, null>;

interface ColumnsProps {
	color?: string;
	dimensions: Partial<Record<ViewportKey, number>>;
	gap: Partial<Record<ViewportKey, number>>;
}

export function Columns({ color = "rgba(255, 0, 0, 0.1)", dimensions, gap }: ColumnsProps) {
	const [isVisible, setIsVisible] = useState(false);
	const currentViewport = useViewport("desktop") as ViewportKey;

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "g") {
				e.preventDefault();
				setIsVisible((prev) => !prev);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	if (!isVisible) return null;

	const currentDimensions = dimensions[currentViewport] || dimensions.desktop || 12;
	const currentGap = gap[currentViewport] || gap.desktop || 32;

	return (
		<div className="fixed inset-0 pointer-events-none z-[999]">
			<div className="h-full">
				<div
					className="grid h-full"
					style={{
						gridTemplateColumns: `repeat(${currentDimensions}, 1fr)`,
						gap: `${currentGap}px`,
					}}
				>
					{Array.from({ length: currentDimensions }).map((_, i) => (
						<div key={i} className="h-full" style={{ backgroundColor: color }} />
					))}
				</div>
			</div>
		</div>
	);
}
