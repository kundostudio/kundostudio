import type { JSX } from "react";

import { cn } from "~/lib/utils";

export const textStyles = {
	label: "font-neue text-[12px] font-semibold leading-[1.4] tracking-[-0.05%]",
	button: "font-neue text-[14px] font-semibold leading-[1.32] tracking-[-0.05%]",
	buttonNav: "font-neue text-[16px] font-medium leading-[1.4] tracking-[-0.05%]",
	body: "font-neue text-[18px] font-normal leading-[1.4] tracking-[0] text-balance",
	bodyAA: "font-neue text-[18px] font-normal leading-[1.4] tracking-[0] text-balance",
	h4: "font-neue text-[24px] font-semibold leading-[1.35] tracking-[-0.5px] text-balance",
	h3: "font-neue text-[30px] font-semibold leading-[1.3] tracking-[-0.5px] text-balance",
	h2: "font-neue text-[48px] font-semibold leading-[1.15] tracking-[-0.5px] text-balance",
	h1: "font-neue text-[54px] font-semibold leading-[1.1] tracking-[-0.05%] text-balance",
};

export function H1({ className, ...props }: JSX.IntrinsicElements["h1"]) {
	return <h1 className={cn(textStyles.h1, className)} {...props} />;
}

export function H2({ className, ...props }: JSX.IntrinsicElements["h2"]) {
	return <h2 className={cn(textStyles.h2, className)} {...props} />;
}

export function H3({ className, ...props }: JSX.IntrinsicElements["h3"]) {
	return <h3 className={cn(textStyles.h3, className)} {...props} />;
}

export function H4({ className, ...props }: JSX.IntrinsicElements["h4"]) {
	return <h4 className={cn(textStyles.h4, className)} {...props} />;
}

export function P({ className, ...props }: JSX.IntrinsicElements["p"]) {
	return <p className={cn(textStyles.body, className)} {...props} />;
}

export function Button({ className, ...props }: JSX.IntrinsicElements["span"]) {
	return <span className={cn(textStyles.button, className)} {...props} />;
}
