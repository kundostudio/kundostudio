"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

const NAV_LINKS = [
	{ href: "/work", label: "Work" },
	{ href: "/about", label: "About" },
	{ href: "/contact", label: "Contact" },
] as const;

type HeaderProps = React.HTMLAttributes<HTMLElement>;

export function Header({ className, ...props }: HeaderProps) {
	const pathname = usePathname();

	return (
		<header
			className={cn(
				"fixed top-0 left-0 right-0 z-100 flex items-center justify-between px-6 pt-[22px] mix-blend-difference",
				className,
			)}
			{...props}
		>
			<Link
				href="/"
				className="pointer-events-auto font-inter text-[12px] font-normal leading-[14px] tracking-[0.2px] text-white"
			>
				Kundo Studio
			</Link>
			<nav className="flex items-center gap-6">
				{NAV_LINKS.map((link) => {
					const isActive =
						pathname === link.href || pathname.startsWith(`${link.href}/`);

					return (
						<Link
							key={link.href}
							href={link.href}
							className={cn(
								"pointer-events-auto font-inter text-[12px] font-normal leading-[14px] tracking-[0.2px] transition-colors duration-200",
								isActive
									? "text-white/50"
									: "text-white hover:opacity-50 transition-opacity duration-200 will-change-[opacity]",
							)}
						>
							{link.label}
						</Link>
					);
				})}
			</nav>
		</header>
	);
}
