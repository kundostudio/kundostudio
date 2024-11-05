import type { JSX } from "react";

import { cn } from "~/lib/utils";

import styles from "./typography.module.scss";

function H1({ className, ...props }: JSX.IntrinsicElements["h1"]) {
  return <h1 className={cn(styles.h1, className)} {...props} />;
}

function H2({ className, ...props }: JSX.IntrinsicElements["h2"]) {
  return <h2 className={cn(styles.h2, className)} {...props} />;
}

function H3({ className, ...props }: JSX.IntrinsicElements["h3"]) {
  return <h3 className={cn(styles.h3, className)} {...props} />;
}

function P({
  className,
  shine = false,
  ...props
}: JSX.IntrinsicElements["p"] & { shine?: boolean }) {
  return <p className={cn(styles.paragraph, shine && styles.textShine, className)} {...props} />;
}

function Miscelaneous({ className, ...props }: JSX.IntrinsicElements["span"]) {
  return <span className={cn(styles.miscelaneous, className)} {...props} />;
}

function Span({ className, ...props }: JSX.IntrinsicElements["span"]) {
  return <span className={cn(styles.span, className)} {...props} />;
}

export const Typography = {
  H1,
  H2,
  H3,
  Miscelaneous,
  P,
  Span,
};
