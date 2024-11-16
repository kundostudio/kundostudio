import { forwardRef, useRef, type JSX } from "react";

import { cn } from "~/lib/utils";

import styles from "./menu.module.scss";

type Props = {
  isOpen: boolean;
} & JSX.IntrinsicElements["button"];

export const MenuTrigger = forwardRef<HTMLButtonElement, Props>(
  ({ className, isOpen, onClick, ...props }, ref) => {
    const lastClickTime = useRef(0);
    const DEBOUNCE_TIME = 300;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const now = Date.now();
      if (now - lastClickTime.current >= DEBOUNCE_TIME) {
        lastClickTime.current = now;
        onClick?.(e);
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        className={cn(styles.menuIcon, isOpen && styles.open, className)}
        onClick={handleClick}
        {...props}
      >
        <div className={styles.line}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 1.5">
            <rect width="14" height="1.5" />
          </svg>
        </div>
        <div className={styles.line}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 1.5">
            <rect width="14" height="1.5" />
          </svg>
        </div>
        <div className={styles.line}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 1.5">
            <rect width="14" height="1.5" />
          </svg>
        </div>
      </button>
    );
  }
);

MenuTrigger.displayName = "MenuTrigger";
