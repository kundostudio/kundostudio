import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import styles from "./link.module.scss";

export function Link({ children, href }: React.HTMLProps<HTMLAnchorElement>) {
  const [isActive, setIsActive] = useState(false);

  return (
    <a
      href={href}
      className={`${styles.link} ${isActive ? styles.active : ""}`}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
    >
      {children}
      <div className={styles.underlineWrapper}>
        <AnimatePresence>
          {isActive && (
            <motion.div
              className={styles.underline}
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.1, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </div>
    </a>
  );
}
