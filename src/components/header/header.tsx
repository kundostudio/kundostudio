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
import LogoOutline from "~/public/logo-outline.svg";

import { Menu } from "./menu";

export const NAVIGATION_ITEMS = [
	{ href: "/", label: "Home" },
	{ href: "/work", label: "Work" },
	{ href: "/about", label: "About" },
	{ href: "/contact", label: "Contact" },
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
				<header className="fixed inset-x-0 z-100 h-16 flex justify-between items-center px-6">
					<Link href="/" onClick={handleLogoClick}>
						{isMenuOpen ? <LogoOutline className="h-4" /> : <Logo className="h-4" />}
					</Link>
					<button
						type="button"
						className={cn(
							"w-[18.5px] h-[18.5px] rounded-full border border-primary",
							isMenuOpen ? "bg-primary" : "bg-transparent",
						)}
						onClick={handleToggleMenu}
						aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					/>
				</header>
				<Menu isOpen={isMenuOpen}>
					{/* Header spacer */}
					<div className="h-16 shrink-0" />

					{/* Navigation - centered */}
					<nav className="flex-1 flex flex-col items-center justify-center gap-8">
						{NAVIGATION_ITEMS.map((item, index) => (
							<motion.div
								key={item.href}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.4,
									delay: index * 0.08,
									ease: [0.25, 0.46, 0.45, 0.94],
								}}
							>
								<Link href={item.href}>
									<span
										className={cn(
											"uppercase font-inter font-semibold text-[54px] leading-[1.1] tracking-[-0.02em]",
											"transition-colors duration-300 ease-out-quad",
											"text-primary [-webkit-text-stroke:2px_rgb(var(--primary))]",
											"hover:text-transparent",
										)}
									>
										{item.label}
									</span>
								</Link>
							</motion.div>
						))}
					</nav>

					{/* Book a call button */}
					<motion.div
						className="px-6 pb-20"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.4,
							delay: NAVIGATION_ITEMS.length * 0.08 + 0.1,
							ease: [0.25, 0.46, 0.45, 0.94],
						}}
					>
						<a href="https://cal.com/kundostudio/30-min-meeting" target="_blank" rel="noopener noreferrer" className="block w-full">
							<Button className="w-full h-14">Book a call</Button>
						</a>
					</motion.div>
				</Menu>
			</>
		);
	}

	return (
		<header
			className={cn("h-16 lg:h-[72px] flex items-center relative", className)}
			{...props}
		>
			<div className="container flex items-center justify-between relative h-full">
				{/* Left — Nav links (excludes Contact, which goes on the right) */}
				<nav className="flex items-center gap-2">
					{NAVIGATION_ITEMS.filter((item) => item.href !== "/contact").map((item) => {
						const isActive =
							item.href === "/"
								? pathname === "/"
								: pathname === item.href || pathname.startsWith(`${item.href}/`);

						return (
							<Link
								href={item.href}
								key={item.href}
								className="flex items-center justify-center h-8 px-3 py-[9px] relative"
							>
								<span
									className={cn("text-primary w-fit relative", textStyles.buttonNav)}
								>
									{item.label}
									{/* Active underline */}
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

				{/* Center — Logo */}
				<Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" onClick={handleLogoClick}>
					<Logo className="h-[18px] w-auto" />
				</Link>

				{/* Right — Contact link + CTA button */}
				<div className="flex items-center gap-2">
					<Link
						href="/contact"
						className="flex items-center justify-center h-8 px-3 py-[9px] relative"
					>
						<span
							className={cn("text-primary w-fit relative", textStyles.buttonNav)}
						>
							Contact
							<span className="pointer-events-none absolute bottom-[-2px] left-0 w-full h-px overflow-hidden rounded-full">
								<AnimatePresence initial={false}>
									{pathname === "/contact" ? (
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
					<a href="https://cal.com/kundostudio/30-min-meeting" target="_blank" rel="noopener noreferrer">
						<Button>Book a call</Button>
					</a>
				</div>
			</div>
		</header>
	);
}
