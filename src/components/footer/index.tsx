"use client";

import Link from "next/link";
import * as Typography from "~/components/typography";
import { cn } from "~/lib/utils";
import { NAVIGATION_ITEMS } from "../header/header";

export function Footer() {
	return (
		<footer className="w-full h-16 flex items-center justify-between px-19 md:px-3 lg:px-11 xl:px-0 max-w-256 mx-auto">
			<small className={cn("text-secondary", Typography.buttonStyles)}>© KUNDO STUDIO</small>
			<nav className="flex items-center gap-8">
				{NAVIGATION_ITEMS.map((item) => (
					<Link
						key={item.href}
						href={item.href}
						className="flex items-center justify-center uppercase"
					>
						<span className={cn("text-secondary", Typography.buttonStyles)}>{item.label}</span>
					</Link>
				))}
			</nav>
		</footer>
	);
}
