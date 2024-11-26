import { motion, MotionProps } from "framer-motion";
import Link, { LinkRestProps } from "next/link";
import { forwardRef, type JSX } from "react";

import { Typography } from "~/components/typography";
import { useSound } from "~/hooks/useSound";
import { cn } from "~/lib/utils";
// @ts-ignore
import buttonSound from "~/public/sounds/button.mp3";

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

function Content({ variant, children }: { variant: string; children: React.ReactNode }) {
  if (variant === "pixel") {
    return (
      <>
        <span className={styles.pixelCorner} />
        <span className={styles.pixelText}>{children}</span>
        <span className={styles.pixelCorner} />
      </>
    );
  }

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

    const [playHoverSound] = useSound(buttonSound);

    const handleMouseEnter = (e: any) => {
      if (!disabled) {
        playHoverSound();
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
          <Content variant={variant}>{children}</Content>
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
        <Content variant={variant}>{children}</Content>
      </MotionButton>
    );
  }
);

Button.displayName = "Button";
