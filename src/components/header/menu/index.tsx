"use client";

import { AnimatePresence, motion } from "motion/react";

interface Props {
	isOpen: boolean;
	children: React.ReactNode;
}

export function Menu({ isOpen, children }: Props) {
	return (
		<AnimatePresence mode="wait">
			{isOpen && (
				<motion.div
					className="fixed inset-0 bg-background z-50 flex flex-col overflow-hidden"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2, ease: "easeOut" }}
				>
					<div
						className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_67%_67%_at_50%_100%,rgba(255,255,255,0.22)_0%,transparent_100%)]"
						aria-hidden="true"
					/>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);
}
