"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as React from "react";

import { cn } from "~/lib/utils";

import styles from "./checkbox.module.scss";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root ref={ref} className={cn(styles.root, className)} {...props}>
    <div className={styles.control}>
      <CheckboxPrimitive.Indicator className={styles.indicator}>
        <div className={styles.light} />
        <div className={styles.light} />
        <div className={styles.light} />
        <div className={styles.light} />
      </CheckboxPrimitive.Indicator>
    </div>
  </CheckboxPrimitive.Root>
));

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
