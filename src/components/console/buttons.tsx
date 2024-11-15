import { cn } from "~/lib/utils";

import styles from "./console.module.scss";

export function Buttons({ onSelect, onUnselect, className }: any) {
  return (
    <div className={cn(styles.buttons, className)}>
      <button
        className={styles.button}
        onClick={onUnselect}
        aria-label="Secondary button"
        tabIndex={-1}
        data-prevent-lose-focus
      >
        b
      </button>
      <button
        className={styles.button}
        onClick={onSelect}
        aria-label="Primary button"
        tabIndex={-1}
        data-prevent-lose-focus
      >
        a
      </button>
    </div>
  );
}
