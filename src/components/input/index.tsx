import { forwardRef } from "react";

import { cn } from "~/lib/utils";

import styles from "./input.module.scss";

type Props = {
  value?: string | number;
  placeholder?: string;
  className?: string;
  type?: "text" | "number";
  max?: number;
  showMax?: boolean;
  onMaxClick?: () => void;
  onChange?: (value: string) => void;
};

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    { value, placeholder, className, type = "text", showMax, onMaxClick, onChange, ...props },
    ref
  ) => {
    return (
      <div className={cn(styles.wrapper, className)}>
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={styles.input}
          {...props}
        />
        {!value && <span className={styles.placeholder}>{placeholder}</span>}
        {value && <span className={styles.value}>{value}</span>}
        {showMax && (
          <button type="button" className={styles.maxButton} onClick={onMaxClick}>
            max
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
