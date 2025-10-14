"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { textStyles } from "~/components/typography";
import { cn } from "~/lib/utils";

export function Footer() {
	const pathname = usePathname();
	const isHome = pathname === "/";

	if (isHome) {
		return null;
	}

	return (
		<footer className="h-16 flex items-center justify-center sm:justify-between container">
			<small className={cn("text-secondary", textStyles.button)}>
				© {new Date().getFullYear()}, Kundo Studio
			</small>
			<nav className="hidden sm:flex items-center gap-8">
				<Link href="/">
					<span className={cn("text-secondary", textStyles.buttonNav)}>Home</span>
				</Link>
				<Link href="/work">
					<span className={cn("text-secondary", textStyles.buttonNav)}>Work</span>
				</Link>
				<Link href="/about">
					<span className={cn("text-secondary", textStyles.buttonNav)}>About</span>
				</Link>
			</nav>
		</footer>
	);
}
