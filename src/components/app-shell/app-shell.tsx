"use client";

import { usePathname } from "next/navigation";

const FIXED_ROUTES = new Set(["/work", "/about", "/contact"]);

type Props = {
	children: React.ReactNode;
};

export function AppShell({ children }: Props) {
	const pathname = usePathname();
	const isFixed = FIXED_ROUTES.has(pathname);
	return (
		<div
			className={`relative flex flex-col ${
				isFixed ? "h-svh overflow-hidden" : "min-h-svh"
			}`}
		>
			{children}
		</div>
	);
}
