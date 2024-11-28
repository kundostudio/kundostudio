import { useMediaQuery } from "@studio-freight/hamo";

import { cn } from "~/lib/utils";

import styles from "./console.module.scss";

export function TopStripes({ className, ...props }: React.HTMLProps<HTMLDivElement>) {
  const isUpperMobile = useMediaQuery("(min-width: 640px)");
  return (
    <div className={cn(styles.topStripes, className)} {...props}>
      <div className={styles.stripe} />
      <div className={styles.stripe} />
      <div className={styles.stripe} />
      <div className={styles.stripe} />
      {isUpperMobile && <div className={styles.stripe} />}
    </div>
  );
}
