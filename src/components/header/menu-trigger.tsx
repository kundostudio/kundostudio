"use client";
import { motion } from "motion/react";
import type { JSX } from "react";

import { cn } from "~/lib/utils";


type Props = JSX.IntrinsicElements["button"] & {
  isOpen: boolean;
};

export function MenuTrigger({ isOpen, className, onClick, ...props }: Props) {
  return (
    <button
      onClick={onClick}
      className={cn("relative w-8 h-8 flex items-center flex-col justify-center gap-3", className)}
      {...props}
    >
      <motion.span
        className="w-6 h-[1.5px] bg-foreground absolute"
        animate={{
          top: isOpen ? "50%" : "35%",
          rotate: isOpen ? 45 : 0,
          y: isOpen ? "-50%" : 0,
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="w-6 h-[1.5px] bg-foreground absolute"
        animate={{
          top: isOpen ? "50%" : "65%",
          rotate: isOpen ? -45 : 0,
          y: isOpen ? "-50%" : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </button>
  );
}
