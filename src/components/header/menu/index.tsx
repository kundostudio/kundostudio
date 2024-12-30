"use client";

import { AnimatePresence, motion } from "framer-motion";

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
}

export function Menu({ isOpen, children }: Props) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-background z-[60] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
