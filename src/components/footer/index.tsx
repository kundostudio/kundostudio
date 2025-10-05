"use client";

import { textStyles } from "~/components/typography";
import { cn } from "~/lib/utils";

export function Footer() {
	return (
		<footer className="w-full h-16 flex items-center justify-between px-19 md:px-3 lg:px-11 xl:px-0 max-w-256 mx-auto">
			<small className={cn("text-secondary", textStyles.button)}>
				© {new Date().getFullYear()}, Kundo Studio
			</small>
		</footer>
	);
}
