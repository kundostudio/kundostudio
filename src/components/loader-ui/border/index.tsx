import { MotionProps, motion } from "framer-motion";

import { cn } from "~/lib/utils";

import styles from "./border.module.scss";

type Props = {
  delay?: number;
} & JSX.IntrinsicElements["div"] &
  MotionProps;

export function Border({ className, delay = 0, ...props }: Props) {
  return (
    <motion.div
      initial={{ "--size": "0%" } as any}
      animate={
        {
          "--size": "100%",
          opacity: 1,
          transition: {
            duration: 0.25,
            ease: "easeOut",
            delay: delay,
          },
        } as any
      }
      exit={{ "--size": "0%", opacity: 0 } as any}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(styles.border, className)}
      {...props}
    />
  );
}
