"use client";

import NextLink, { type LinkProps as NextLinkProps } from "next/link";

import { cn } from "~/lib/utils";
import ArrowLink from "~/public/icons/arrow-link.svg";

type Props = React.HTMLProps<HTMLAnchorElement> & NextLinkProps<string>;

export function Link({ children, href, className, ...props }: Props) {
	const isExternal = href?.toString().startsWith("http") || href?.toString().startsWith("mailto:");
	const Component = isExternal ? "a" : NextLink;

	return (
		<Component
			href={href}
			className={cn("group relative inline-flex items-center", className)}
			{...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
			{...props}
		>
			<span className="relative">
				{children}
				<span className="absolute inset-x-0 bottom-[1px] h-[3px] overflow-hidden">
					<span className="absolute inset-0 bg-primary transition-all duration-500 group-hover:translate-x-[calc(100%+50px)]" />
					<span className="absolute inset-0 bg-primary transition-all duration-500 -translate-x-[calc(100%+200px)] group-hover:translate-x-0" />
				</span>
			</span>
			{isExternal && (
				<div className="w-6 h-6 overflow-hidden relative">
					<ArrowLink className="absolute text-foreground transition-all duration-300 group-hover:translate-x-full group-hover:-translate-y-full" />
					<ArrowLink className="absolute text-foreground transition-all duration-300 -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0" />
				</div>
			)}
		</Component>
	);
}
