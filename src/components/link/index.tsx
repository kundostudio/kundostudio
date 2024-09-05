"use client";

import { AnimatePresence, motion, MotionProps } from "framer-motion";
import NextLink, { type LinkProps } from "next/link";
import { useState } from "react";

import { cn } from "~/lib/utils";

import styles from "./link.module.scss";

type Props = React.HTMLProps<HTMLAnchorElement> & LinkProps<{}> & MotionProps;

export function Link({ children, href, layoutId, ...props }: Props) {
  const [isActive, setIsActive] = useState(false);
  const isExternal = href?.toString().startsWith("http");
  const Component = isExternal ? "a" : NextLink;

  return (
    <Component
      href={href}
      className={cn(styles.link, isActive && styles.active)}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      {...(isExternal && { target: "_blank", rel: "noreferrer" })}
      {...props}
    >
      {children}
      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            layoutId={layoutId}
            className={styles.border}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ duration: 0.1 }}
          />
        )}
      </AnimatePresence>
    </Component>
  );
}
