"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as React from "react";

import * as Typography from "~/components/typography";
import { cn } from "~/lib/utils";
import PlusIcon from "~/public/icons/plus.svg";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
	<AccordionPrimitive.Item
		ref={ref}
		className={cn("border-t border-tertiary", className)}
		{...props}
	/>
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Header className="flex">
		<AccordionPrimitive.Trigger
			ref={ref}
			className={cn(
				"flex flex-1 items-center justify-between py-4 transition-colors group",
				"[&[data-state=open]>svg]:rotate-45",
				className,
			)}
			{...props}
		>
			<Typography.P className="uppercase text-secondary group-hover:text-foreground transition-colors duration-200">
				{children}
			</Typography.P>
			<PlusIcon className="w-4 h-4 text-secondary group-hover:text-foreground transition-all duration-200" />
		</AccordionPrimitive.Trigger>
	</AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Content
		ref={ref}
		className={cn(
			"overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
			className,
		)}
		{...props}
	>
		<div className="pb-4 pt-0 space-y-2">{children}</div>
	</AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
