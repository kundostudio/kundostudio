"use client";

import type { ElementType } from "react";

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
	return (
		<Component className={cn("flex-1", className)} {...props}>
			{children}
		</Component>
	);
}
