"use client";

import Link from "next/link";
import { textStyles } from "~/components/typography";
import { cn } from "~/lib/utils";

const NAV_LINKS = [
	{ label: "Home", href: "/" },
	{ label: "Work", href: "/work" },
	{ label: "About", href: "/about" },
	{ label: "Contact", href: "/contact" },
];

export function Footer() {
	return (
		<footer className="relative z-10 w-full bg-black pt-6 pb-8 sm:pb-10 container">
			<div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
				<p className={cn(textStyles.caption, "text-primary/60")}>
					&copy; {new Date().getFullYear()}, Kundo Studio
				</p>
				<nav className="flex items-center gap-6 sm:gap-8">
					{NAV_LINKS.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className={cn(textStyles.caption, "font-medium text-primary/60 transition-colors hover:text-primary/90")}
						>
							{link.label}
						</Link>
					))}
				</nav>
			</div>
		</footer>
	);
}
