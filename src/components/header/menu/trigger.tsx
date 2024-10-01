import { cn } from "~/lib/utils";

import styles from "./menu.module.scss";

type Props = {
  isOpen: boolean;
} & JSX.IntrinsicElements["button"];

export function MenuTrigger({ className, isOpen, ...props }: Props) {
  return (
    <button
      type="button"
      className={cn(styles.menuIcon, isOpen && styles.open, className)}
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
