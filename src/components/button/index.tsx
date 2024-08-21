import Link, { LinkRestProps } from "next/link";
import { forwardRef } from "react";

import { Typography } from "~/components/typography";
import { cn } from "~/lib/utils";

import styles from "./button.module.scss";

type CommonProps = {
  size?: "small" | "large";
  variant?: "default" | "highlight";
  href?: string;
  disabled?: boolean;
};

type ButtonProps = CommonProps & JSX.IntrinsicElements["button"];
type AnchorProps = CommonProps & LinkRestProps;

type Props = ButtonProps | AnchorProps;

function Content({ children }: { children: React.ReactNode }) {
  if (typeof children === "string") {
    return (
      <>
        <Typography.Span className={styles.text}>{children}</Typography.Span>
        <span className={styles.corner} />
        <span className={styles.corner} />
        <span className={styles.corner} />
        <span className={styles.corner} />
      </>
    );
  }
  return (
    <>
      {children}
      <span className={styles.corner} />
      <span className={styles.corner} />
      <span className={styles.corner} />
      <span className={styles.corner} />
    </>
  );
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  (
    {
      children,
      size = "small",
      variant = "default",
      className,
      href,
      disabled = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const sizeStyle = size === "small" ? styles.small : styles.large;
    const variantStyle = variant === "highlight" ? styles.highlight : "";

    if (href) {
      const isExternal = href?.toString().startsWith("http");
      return (
        <Link
          ref={ref as any}
          className={cn(styles.button, sizeStyle, variantStyle, className)}
          href={href as any}
          {...(disabled && { "aria-disabled": true, tabIndex: -1, disabled: true })}
          {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
          {...(props as AnchorProps)}
        >
          <Content>{children}</Content>
        </Link>
      );
    }

    return (
      <button
        ref={ref as any}
        className={cn(styles.button, sizeStyle, variantStyle, className)}
        onClick={onClick as ButtonProps["onClick"]}
        {...(disabled && { "aria-disabled": true, tabIndex: -1, disabled: true })}
        {...(props as ButtonProps)}
      >
        <Content>{children}</Content>
      </button>
    );
  }
);

Button.displayName = "Button";
