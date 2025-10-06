import type { JSX } from "react";

import { cn } from "~/lib/utils";

export const textStyles = {
	button: "font-neue text-[14px] font-medium leading-[20px] tracking-[-0.05%]",
	buttonNav: "font-neue text-[16px] font-medium leading-[22px] tracking-[-0.05%]",
	body: "font-neue text-[14px] font-medium leading-[22px] tracking-[-0.03px]",
	bodyAA: "font-neue text-[14px] font-medium leading-[22px] tracking-[-0.05px]",
	label: "font-neue text-[12px] font-medium leading-[16px] tracking-[-0.05%]",
	h1: "font-neue font-bold text-[54px] leading-[56px] tracking-[-0.05%]",
	h2: "font-neue font-medium text-[26px] leading-[28px] tracking-[-0.5px]",
};

export function H1({ className, ...props }: JSX.IntrinsicElements["h1"]) {
	return <h1 className={cn(textStyles.h1, className)} {...props} />;
}

export function H2({ className, ...props }: JSX.IntrinsicElements["h2"]) {
	return <h2 className={cn(textStyles.h2, className)} {...props} />;
}

export function H3({ className, ...props }: JSX.IntrinsicElements["h3"]) {
	return <h3 className={cn(textStyles.body, className)} {...props} />;
}

export function H4({ className, ...props }: JSX.IntrinsicElements["h4"]) {
	return <h4 className={cn(textStyles.body, className)} {...props} />;
}

export function P({ className, ...props }: JSX.IntrinsicElements["p"]) {
	return <p className={cn(textStyles.body, className)} {...props} />;
}

export function Button({ className, ...props }: JSX.IntrinsicElements["span"]) {
	return <span className={cn(textStyles.button, className)} {...props} />;
}
