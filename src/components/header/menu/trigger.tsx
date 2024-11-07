import { useEffect, useRef, useState, type JSX } from "react";

import { cn } from "~/lib/utils";

import styles from "./menu.module.scss";

type Props = {
  isOpen: boolean;
} & JSX.IntrinsicElements["button"];

export function MenuTrigger({ className, isOpen, ...props }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const [wasOpened, setWasOpened] = useState(false);

  // ENCONTRAR OTRA SOLUCION DESDE EL LADO DE USE CONTROLS
  useEffect(() => {
    if (wasOpened) {
      ref.current?.classList.add("focused");
    }
    if (isOpen) {
      setWasOpened(true);
    }
  }, [isOpen, wasOpened]);

  return (
    <button
      ref={ref}
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
