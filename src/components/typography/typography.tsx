import type { JSX } from "react";

import { cn } from "~/lib/utils";

export function H1({ className, ...props }: JSX.IntrinsicElements["h1"]) {
	return (
		<h1
			className={cn("font-semibold text-[40px] leading-[48px] tracking-[-0.01em]", className)}
			{...props}
		/>
	);
}

export function H2({ className, ...props }: JSX.IntrinsicElements["h2"]) {
	return (
		<h2
			className={cn("font-semibold text-[21px] leading-[32px] tracking-[-0.5px]", className)}
			{...props}
		/>
	);
}

export function H3({ className, ...props }: JSX.IntrinsicElements["h3"]) {
	return (
		<h3
			className={cn(
				"font-sans text-[26px] leading-[34px] font-medium tracking-[-0.02em] text-start",
				className,
			)}
			{...props}
		/>
	);
}

export function H4({ className, ...props }: JSX.IntrinsicElements["h4"]) {
	return (
		<h4
			className={cn(
				"font-sans text-[22px] leading-[30px] font-medium tracking-[-0.02em] text-start",
				className,
			)}
			{...props}
		/>
	);
}

export function P({ className, ...props }: JSX.IntrinsicElements["p"]) {
	return (
		<p
			className={cn(
				"font-mono text-[12px] leading-[16px] font-normal tracking-[0em] text-start",
				className,
			)}
			{...props}
		/>
	);
}

export const buttonStyles = "text-[11px] font-semibold leading-[13px] tracking-[-0.05em]";

export function Button({ className, ...props }: JSX.IntrinsicElements["span"]) {
	return <span className={cn(buttonStyles, className)} {...props} />;
}
