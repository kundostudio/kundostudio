'use client'

import { AnimatePresence, motion } from "motion/react";
import { useState, type JSX } from "react";

import { cn } from "~/lib/utils";
import Chevron from "~/public/icons/chevron.svg";

import { Typography } from "../typography";

type Props = JSX.IntrinsicElements["button"] & {
  direction: "left" | "right";
};

export function CarouselButton({ direction, onClick, className, children, ...props }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div
      className={cn("absolute top-0 bottom-0 p-10 sm:p-20 z-10 flex items-center justify-center group", direction === "left" ? "left-0" : "right-0", className)}
      aria-label={`Previous slide`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
  >
    <AnimatePresence mode="wait" initial={false}>
      {isVisible && (
        <motion.button
          className={cn(
            "bg-background flex items-center gap-2 p-2 w-[80px]",
            direction === "right" && "flex-row-reverse"
          )}
          onClick={onClick}
          initial={{ 
            opacity: 0,
            filter: "blur(8px)",
            x: direction === "left" ? -5 : 5
          }}
          animate={{ 
            opacity: [0, 1, 0.8, 1],
            filter: ["blur(8px)", "blur(0px)", "blur(4px)", "blur(0px)"],
            x: [
              direction === "left" ? -5 : 5, 
              0, 
              direction === "left" ? 3 : -3, 
              0
            ]
          }}
          transition={{ 
            duration: 0.2,
            times: [0, 0.3, 0.6, 1],
            ease: "easeInOut"
          }}
          exit={{ 
            opacity: 0,
            filter: "blur(8px)",
            x: direction === "left" ? -5 : 5,
            transition: { duration: 0.1 }
          }}
        >
          <Chevron className={cn("w-4 h-4", direction === "right" ? "rotate-180" : "")} />
          <Typography.P className="uppercase text-primary">{children}</Typography.P>
        </motion.button>
      )}
    </AnimatePresence>
  </div>
  )
}