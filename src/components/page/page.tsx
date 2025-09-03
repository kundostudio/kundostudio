"use client";

import { ReactLenis } from "lenis/react";
import { motion, useMotionTemplate, useScroll, useTransform } from "motion/react";
import { type ElementType, useEffect } from "react";

import { Scrollbar } from "~/components/scrollbar";
import { useStore } from "~/lib/store";
import { cn } from "~/lib/utils";

type Props<T extends ElementType = "main"> = {
	as?: T;
	className?: string;
	children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export function Page<T extends ElementType = "main">({
	as,
	className,
	children,
	...props
}: Props<T>) {
	const Component = as || "main";

	const isMenuOpen = useStore((state) => state.isMenuOpen);

	const { scrollY } = useScroll();
	const maskImageY = useTransform(scrollY, (value) => value);
	const maskImageY122 = useTransform(scrollY, (value) => value + 72);
	const maskImageY152 = useTransform(scrollY, (value) => value + 100);
	const maskImageY172 = useTransform(scrollY, (value) => value + 120);

	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [isMenuOpen]);

	return (
		<ReactLenis
			root
			options={{
				duration: 0.8,
				easing: (t) => Math.min(1, 1.001 - 2 ** (-12 * t)),
				orientation: "vertical",
				gestureOrientation: "vertical",
				// Disable smooth scroll on iOS to prevent conflicts with native behavior
				smoothWheel: true,
				wheelMultiplier: 1,
				touchMultiplier: 2,
				prevent: () => {
					// Allow all elements to participate in scroll, including fixed header
					// This ensures pull-to-refresh works naturally with all elements
					return false;
				},
				// Enable overscroll for pull-to-refresh on mobile
				overscroll: true,
			}}
		>
			<motion.div
				className="flex-1"
				style={{
					maskImage: useMotionTemplate`linear-gradient(
					to bottom,
					rgba(0, 0, 0, 0) ${maskImageY}px,
					rgba(0, 0, 0, 0) ${maskImageY122}px,
					rgba(0, 0, 0, 0.8) ${maskImageY152}px,
					rgba(0, 0, 0, 1) ${maskImageY172}px
				`,
				}}
			>
				<Component className={cn("mt-18", className)} {...props}>
					{children}
				</Component>
			</motion.div>
			<Scrollbar className="fixed hidden md:block md:right-5 xl:right-45 top-32" />
		</ReactLenis>
	);
}
