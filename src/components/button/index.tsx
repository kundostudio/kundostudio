import { motion, MotionProps } from "motion/react";
import Link, { LinkProps } from "next/link";
import { forwardRef, type JSX } from "react";

import { cn } from "~/lib/utils";

import styles from "./button.module.scss";

type CommonProps = {
  size?: "small" | "large";
  variant?: "default" | "highlight" | "subtle" | "pixel";
  href?: string;
  disabled?: boolean;
  className?: string;
};

type ButtonProps = CommonProps & JSX.IntrinsicElements["button"] & MotionProps;
type AnchorProps = CommonProps & Omit<LinkProps, keyof CommonProps> & MotionProps;

export type Props = ButtonProps | AnchorProps;

const MotionButton = motion.button;
const MotionLink = motion(Link);

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
      onMouseEnter,
      ...props
    },
    ref
  ) => {
    const sizeStyle = size === "small" ? styles.small : styles.large;

    const variantStyle = {
      default: "",
      highlight: styles.highlight,
      subtle: styles.subtle,
      pixel: styles.pixel,
    }[variant];

    if (href) {
      const isExternal = href.toString().startsWith("http");
      return (
        <MotionLink
          ref={ref as any}
          className={cn(styles.button, sizeStyle, variantStyle, className)}
          href={href}
          onMouseEnter={onMouseEnter as (e: React.MouseEvent<HTMLAnchorElement>) => void}
          {...(disabled && { "aria-disabled": true, tabIndex: -1 })}
          {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
          {...(props as AnchorProps)}
        >
          {children}
        </MotionLink>
      );
    }

    return (
      <MotionButton
        ref={ref as any}
        className={cn(styles.button, sizeStyle, variantStyle, className)}
        onClick={onClick as ButtonProps["onClick"]}
        onMouseEnter={onMouseEnter as (e: React.MouseEvent<HTMLButtonElement>) => void}
        {...(disabled && { "aria-disabled": true, tabIndex: -1, disabled: true })}
        {...(props as ButtonProps)}
      >
        {children}
      </MotionButton>
    );
  }
);

Button.displayName = "Button";
