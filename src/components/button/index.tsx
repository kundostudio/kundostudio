import Link, { LinkRestProps } from "next/link";
import { forwardRef } from "react";

import { Typography } from "~/components/typography";
import { cn } from "~/lib/utils";

import styles from "./button.module.scss";

type CommonProps = {
  size?: "small" | "large";
  variant?: "default" | "highlight";
  href?: string;
};

type ButtonProps = CommonProps & JSX.IntrinsicElements["button"];
type AnchorProps = CommonProps & LinkRestProps;

type Props = ButtonProps | AnchorProps;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  ({ children, size = "small", variant = "default", className, href, onClick, ...props }, ref) => {
    const sizeStyle = size === "small" ? styles.small : styles.large;
    const variantStyle = variant === "highlight" ? styles.highlight : "";

    if (href) {
      const isExternal = href?.toString().startsWith("http");
      return (
        <Link
          ref={ref as any}
          className={cn(styles.button, sizeStyle, variantStyle, className)}
          href={href as any}
          {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
          {...(props as AnchorProps)}
        >
          <Typography.Span className={styles.text}>{children}</Typography.Span>
          <span className={styles.corner} />
          <span className={styles.corner} />
          <span className={styles.corner} />
          <span className={styles.corner} />
        </Link>
      );
    }

    return (
      <button
        ref={ref as any}
        className={cn(styles.button, sizeStyle, variantStyle, className)}
        onClick={onClick as ButtonProps["onClick"]}
        {...(props as ButtonProps)}
      >
        <Typography.Span className={styles.text}>{children}</Typography.Span>
        <span className={styles.corner} />
        <span className={styles.corner} />
        <span className={styles.corner} />
        <span className={styles.corner} />
      </button>
    );
  }
);

Button.displayName = "Button";
