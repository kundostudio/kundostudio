"use client";

import { useMediaQuery } from "@studio-freight/hamo";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { Button } from "~/components/button";
import { textStyles } from "~/components/typography";
import { useStore } from "~/lib/store";
import { cn } from "~/lib/utils";
import Logo from "~/public/logo.svg";

import { Menu } from "./menu";

export const NAVIGATION_ITEMS = [
	{ href: "/", label: "Home" },
	{ href: "/work", label: "Work" },
	{ href: "/about", label: "About" },
] as const;

type HeaderProps = React.HTMLAttributes<HTMLDivElement>;

export function Header({ className, ...props }: HeaderProps) {
	const isMobile = useMediaQuery("(max-width: 639px)");
	const pathname = usePathname();
	const isMenuOpen = useStore((state) => state.isMenuOpen);
	const { setIsMenuOpen } = useStore.getState();

	useEffect(() => {
		setIsMenuOpen(false);
	}, [pathname, setIsMenuOpen]);

	const handleLogoClick = () => {
		if (pathname === "/") {
			setIsMenuOpen(false);
		}
	};

	const handleToggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	if (isMobile) {
		return (
			<>
				<header className="fixed top-0 left-0 right-0 z-100 h-12 flex justify-between items-center container">
					<Link href="/" onClick={handleLogoClick}>
						<Logo className="h-4" />
					</Link>
					<button
						type="button"
						className={cn(
							"w-[18.5px] h-[18.5px] rounded-full border border-primary absolute z-100 right-5 top-0 bottom-0 my-auto",
							isMenuOpen ? "bg-primary" : "bg-transparent",
						)}
						onClick={handleToggleMenu}
					/>
				</header>
				<Menu isOpen={isMenuOpen}>
					<div className="flex h-full w-full flex-col justify-end items-start gap-4 pb-16">
						{NAVIGATION_ITEMS.map((item) => (
							<a key={item.href} href={item.href}>
								<span className={cn("text-primary uppercase", textStyles.h1)}>{item.label}</span>
							</a>
						))}
					</div>
				</Menu>
			</>
		);
	}

	return (
		<header
			className={cn("flex justify-between items-center h-8 relative container", className)}
			{...props}
		>
			<nav className="flex justify-between items-center gap-4">
				{NAVIGATION_ITEMS.map((item) => {
					const isActive =
						item.href === "/"
							? pathname === "/"
							: pathname === item.href || pathname.startsWith(`${item.href}/`);

					return (
						<Link
							href={item.href}
							key={item.href}
							className={cn("h-full px-4 -ml-4 flex items-center justify-center relative")}
						>
							<span
								key={item.href}
								className={cn("text-primary w-fit relative", textStyles.buttonNav)}
							>
								{item.label}
								{/* Active underline container */}
								<span className="pointer-events-none absolute bottom-[-2px] left-0 w-full h-px overflow-hidden rounded-full">
									<AnimatePresence initial={false}>
										{isActive ? (
											<motion.span
												key="active-bar"
												className="block w-full h-full bg-primary"
												initial={{ x: "-100%" }}
												animate={{ x: "0%" }}
												exit={{ x: "100%" }}
												transition={{ duration: 0.15, ease: "easeInOut" }}
											/>
										) : null}
									</AnimatePresence>
								</span>
							</span>
						</Link>
					);
				})}
			</nav>
			<Link href="/" className="absolute inset-0 m-auto size-fit" onClick={handleLogoClick}>
				<Logo className="h-8 w-12 p-2" />
			</Link>
			<Link href="mailto:hello@kundo.studio">
				<Button>Get in touch</Button>
			</Link>
		</header>
	);
}
