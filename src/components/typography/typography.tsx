import type { JSX } from "react";

import { cn } from "~/lib/utils";

export const textStyles = {
	button: "font-neue text-[14px] font-medium leading-[20px] tracking-[-0.05%]",
	buttonNav: "font-neue text-[16px] font-medium leading-[22px] tracking-[-0.05%]",
	body: "font-neue text-[16px] font-medium leading-[24px] tracking-[0] text-balance",
	bodyAA: "font-neue text-[16px] font-medium leading-[24px] tracking-[0] text-balance",
	label: "font-neue text-[12px] font-medium leading-[16px] tracking-[-0.05%]",
	h1: "font-neue font-bold text-[54px] leading-[1.1] tracking-[-0.05%] text-balance",
	h2: "font-neue font-medium text-[41px] leading-[1.25] tracking-[-0.5px] text-balance",
	h3: "font-neue font-medium text-[30px] leading-[1.35] tracking-[-0.5px] text-balance",
	h4: "font-neue font-medium text-[23px] leading-[1.45] tracking-[-0.5px] text-balance",
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
