import type { JSX } from "react";
import { cn } from "~/lib/utils";

export const textStyles = {
	// H1 — Page hero heading
	// 56px → 48 → 40 → 36 → 32 | weight 600 | line-height: 62→53→44→40→35 | ls: -1.5→-0.5
	h1: [
		"font-inter text-[32px] font-bold leading-[35px] tracking-[-0.5px] text-balance",
		"min-[640px]:text-[36px] min-[640px]:leading-[40px] min-[640px]:tracking-[-0.8px]",
		"md:text-[40px] md:leading-[44px] md:tracking-[-1px]",
		"lg:text-[48px] lg:leading-[53px] lg:tracking-[-1.3px]",
		"xl:text-[56px] xl:leading-[62px] xl:tracking-[-1.5px]",
	].join(" "),

	// H2 — Section heading
	// 40→36→32→28→26 | weight 600 | lh: 48→43→38→34→31 | ls: -0.8→-0.2
	h2: [
		"font-inter text-[26px] font-semibold leading-[31px] tracking-[-0.2px] text-balance",
		"min-[640px]:text-[28px] min-[640px]:leading-[34px] min-[640px]:tracking-[-0.3px]",
		"md:text-[32px] md:leading-[38px] md:tracking-[-0.5px]",
		"lg:text-[36px] lg:leading-[43px] lg:tracking-[-0.7px]",
		"xl:text-[40px] xl:leading-[48px] xl:tracking-[-0.8px]",
	].join(" "),

	// H3 — Feature / card heading
	// 24→22→20→20→18 | weight 600 | lh: 30→28→25→25→22 | ls: -0.3→0
	h3: [
		"font-inter text-[18px] font-semibold leading-[22px] tracking-[0px] text-balance",
		"min-[640px]:text-[20px] min-[640px]:leading-[25px] min-[640px]:tracking-[0px]",
		"md:text-[20px] md:leading-[25px] md:tracking-[-0.1px]",
		"lg:text-[22px] lg:leading-[28px] lg:tracking-[-0.2px]",
		"xl:text-[24px] xl:leading-[30px] xl:tracking-[-0.3px]",
	].join(" "),

	// H4 — Sub-section heading
	// 20→20→18→18 | weight 600 | lh: 26→26→23→23 | ls: -0.1→0
	h4: [
		"font-inter text-[18px] font-semibold leading-[23px] tracking-[0px] text-balance",
		"md:text-[18px] md:leading-[23px] md:tracking-[0px]",
		"lg:text-[20px] lg:leading-[26px] lg:tracking-[-0.1px]",
		"xl:text-[20px] xl:leading-[26px] xl:tracking-[-0.1px]",
	].join(" "),

	// H5 — List title / changelog title
	// 16→16→15→15→15 | weight 500 | lh: 22→22→20→20→20
	h5: [
		"font-inter text-[15px] font-medium leading-[20px] tracking-[0px] text-balance",
		"lg:text-[16px] lg:leading-[22px]",
	].join(" "),

	// H6 — Footer heading / nav group
	// 14→14→14→13→13 | weight 500 | lh: 19→19→19→18→18
	h6: [
		"font-inter text-[13px] font-medium leading-[18px] tracking-[0px] text-balance",
		"md:text-[14px] md:leading-[19px]",
	].join(" "),

	// P-LG — Lead paragraph / subtitle
	// 20→18→17→16→16 | weight 400 | lh: 30→27→26→24→24
	pLg: [
		"font-inter text-[16px] font-normal leading-[24px] tracking-[0px] text-pretty",
		"md:text-[17px] md:leading-[26px]",
		"lg:text-[18px] lg:leading-[27px]",
		"xl:text-[20px] xl:leading-[30px]",
	].join(" "),

	// P / Body — Default paragraph
	// 16→16→15→15→15 | weight 400 | lh: 25→25→23→23→23
	body: [
		"font-inter text-[15px] font-normal leading-[23px] tracking-[0px] text-pretty",
		"lg:text-[16px] lg:leading-[25px]",
	].join(" "),

	// Small — Secondary body / nav links
	// 14→14→13→13→13 | weight 400 | lh: 21→21→20→20→20
	small: [
		"font-inter text-[13px] font-normal leading-[20px] tracking-[0px] text-pretty",
		"lg:text-[14px] lg:leading-[21px]",
	].join(" "),

	// Caption — Captions, badges, metadata
	// 13→13→12→12→12 | weight 500 | lh: 19→19→17→17→17
	caption: [
		"font-inter text-[12px] font-medium leading-[17px] tracking-[0px] text-pretty",
		"lg:text-[13px] lg:leading-[19px]",
	].join(" "),

	// Overline — Small uppercase labels (quotes, attributions)
	// 12→12→11→11→11 | weight 600 | uppercase | ls: 0.6→0.5
	overline: [
		"font-inter text-[11px] font-semibold leading-[15px] tracking-[0.5px] uppercase",
		"lg:text-[12px] lg:leading-[16px] lg:tracking-[0.6px]",
	].join(" "),

	// Overline LG — Hero label, prominent overlines
	// 24→22→20→18→16 | weight 600 | uppercase | lh: 29→26→24→22→19 | ls: 1.2→0.8
	overlineLg: [
		"font-inter text-[16px] font-semibold leading-[19px] tracking-[0.8px]",
		"min-[640px]:text-[18px] min-[640px]:leading-[22px] min-[640px]:tracking-[0.9px]",
		"md:text-[20px] md:leading-[24px] md:tracking-[1px]",
		"lg:text-[22px] lg:leading-[26px] lg:tracking-[1.1px]",
		"xl:text-[24px] xl:leading-[29px] xl:tracking-[1.2px]",
	].join(" "),

	// Button text
	// Same as small but semibold
	button: [
		"font-inter text-[13px] font-semibold leading-[20px] tracking-[0px]",
		"lg:text-[14px] lg:leading-[21px]",
	].join(" "),

	// Button Nav text
	// Same as small but medium weight
	buttonNav: [
		"font-inter text-[13px] font-medium leading-[20px] tracking-[0px]",
		"lg:text-[14px] lg:leading-[21px]",
	].join(" "),

	// Label — keep for backwards compat, maps to caption
	label: [
		"font-inter text-[12px] font-semibold leading-[17px] tracking-[0px]",
		"lg:text-[13px] lg:leading-[19px]",
	].join(" "),
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
