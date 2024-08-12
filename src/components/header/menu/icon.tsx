import { cn } from "~/lib/utils";

import styles from "./menu.module.scss";

type Props = {
  isOpen: boolean;
} & JSX.IntrinsicElements["div"];

export function MenuIcon({ className, isOpen }: Props) {
  return (
    <div className={cn(styles.menuIcon, className)}>
      <div className={cn(styles.line, isOpen && styles.open)} />
      <div className={cn(styles.line, isOpen && styles.open)} />
      <div className={cn(styles.line, isOpen && styles.open)} />
    </div>
  );
}
