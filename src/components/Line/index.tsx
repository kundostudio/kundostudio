import { cn } from "~/lib/utils";

import styles from "./line.module.scss";

type Props = {
  direction: "vertical" | "horizontal";
} & React.HTMLProps<HTMLDivElement>;

export function Line({ className, direction }: Props) {
  return (
    <div
      className={cn(
        direction === "horizontal" ? styles.lineHorizontal : styles.lineVertical,
        className
      )}
    />
  );
}
