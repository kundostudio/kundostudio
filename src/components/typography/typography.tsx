import type { JSX } from "react";
import { cn } from "~/lib/utils";

const baseStyle = "font-inter text-[12px] font-normal leading-[14px] tracking-[0.2px]";
const proseStyle = "font-inter text-[12px] font-normal leading-[18px] tracking-[0.2px]";

export const textStyles = {
	h1: baseStyle,
	h2: baseStyle,
	h3: baseStyle,
	h4: baseStyle,
	h5: baseStyle,
	h6: baseStyle,
	pLg: baseStyle,
	body: baseStyle,
	small: baseStyle,
	caption: baseStyle,
	overline: baseStyle,
	overlineLg: baseStyle,
	button: "font-inter text-[12px] font-semibold leading-[14px] tracking-[0.2px]",
	buttonNav: baseStyle,
	label: baseStyle,
	prose: proseStyle,
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

export function H5({ className, ...props }: JSX.IntrinsicElements["h5"]) {
	return <h5 className={cn(textStyles.h5, className)} {...props} />;
}

export function H6({ className, ...props }: JSX.IntrinsicElements["h6"]) {
	return <h6 className={cn(textStyles.h6, className)} {...props} />;
}

export function P({ className, ...props }: JSX.IntrinsicElements["p"]) {
	return <p className={cn(textStyles.body, className)} {...props} />;
}

export function PLg({ className, ...props }: JSX.IntrinsicElements["p"]) {
	return <p className={cn(textStyles.pLg, className)} {...props} />;
}

export function Small({ className, ...props }: JSX.IntrinsicElements["small"]) {
	return <small className={cn(textStyles.small, className)} {...props} />;
}

export function Caption({ className, ...props }: JSX.IntrinsicElements["span"]) {
	return <span className={cn(textStyles.caption, className)} {...props} />;
}

export function Overline({ className, ...props }: JSX.IntrinsicElements["span"]) {
	return <span className={cn(textStyles.overline, className)} {...props} />;
}

export function OverlineLg({ className, ...props }: JSX.IntrinsicElements["span"]) {
	return <span className={cn(textStyles.overlineLg, className)} {...props} />;
}

export function Button({ className, ...props }: JSX.IntrinsicElements["span"]) {
	return <span className={cn(textStyles.button, className)} {...props} />;
}
