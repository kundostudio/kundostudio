import { motion, MotionProps } from "framer-motion";
import Link, { LinkRestProps } from "next/link";
import { forwardRef, type JSX } from "react";

import { cn } from "~/lib/utils";

import styles from "./button.module.scss";

type CommonProps = {
  size?: "small" | "large";
  variant?: "default" | "highlight" | "subtle" | "pixel";
  href?: string;
  disabled?: boolean;
};

type ButtonProps = CommonProps & JSX.IntrinsicElements["button"] & MotionProps;
type AnchorProps = CommonProps & LinkRestProps & MotionProps;

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

    const handleMouseEnter = (e: any) => {
      if (!disabled) {
        onMouseEnter?.(e);
      }
    };

    if (href) {
      const isExternal = href?.toString().startsWith("http");
      return (
        <MotionLink
          ref={ref as any}
          className={cn(styles.button, sizeStyle, variantStyle, className)}
          href={href as any}
          onMouseEnter={handleMouseEnter}
          {...(disabled && { "aria-disabled": true, tabIndex: -1, disabled: true })}
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
        onMouseEnter={handleMouseEnter}
        {...(disabled && { "aria-disabled": true, tabIndex: -1, disabled: true })}
        {...(props as ButtonProps)}
      >
        {children}
      </MotionButton>
    );
  }
);

Button.displayName = "Button";
