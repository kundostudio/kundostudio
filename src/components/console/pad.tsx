import { useState } from "react";

import { cn } from "~/lib/utils";
import HoverDown from "~/public/console/pad/hover-down.svg";
import HoverLeft from "~/public/console/pad/hover-left.svg";
import HoverRight from "~/public/console/pad/hover-right.svg";
import HoverUp from "~/public/console/pad/hover-up.svg";
import Idle from "~/public/console/pad/idle.svg";
import PressedDown from "~/public/console/pad/pressed-down.svg";
import PressedLeft from "~/public/console/pad/pressed-left.svg";
import PressedRight from "~/public/console/pad/pressed-right.svg";
import PressedUp from "~/public/console/pad/pressed-up.svg";

import styles from "./console.module.scss";

export function Pad({ onPressUp, onPressDown, onPressLeft, onPressRight }) {
  const [status, setStatus] = useState("idle");

  const PadSVG = {
    idle: Idle,
    "hover-up": HoverUp,
    "hover-down": HoverDown,
    "hover-left": HoverLeft,
    "hover-right": HoverRight,
    "pressed-up": PressedUp,
    "pressed-down": PressedDown,
    "pressed-left": PressedLeft,
    "pressed-right": PressedRight,
  }[status];

  return (
    <div className={styles.padWrapper}>
      <div
        aria-label="Directional pad up"
        tabIndex={-1}
        className={cn(styles.touchable, styles.padUp)}
        onClick={onPressUp}
        onPointerDown={() => setStatus("pressed-up")}
        onPointerUp={() => setStatus("idle")}
        onPointerEnter={() => setStatus("hover-up")}
        onPointerLeave={() => setStatus("idle")}
        data-prevent-lose-focus
      />
      <div
        aria-label="Direction pad down"
        tabIndex={-1}
        className={cn(styles.touchable, styles.padDown)}
        onClick={onPressDown}
        onPointerDown={() => setStatus("pressed-down")}
        onPointerUp={() => setStatus("idle")}
        onPointerEnter={() => setStatus("hover-down")}
        onPointerLeave={() => setStatus("idle")}
        data-prevent-lose-focus
      />
      <div
        aria-label="Directional pad left"
        tabIndex={-1}
        className={cn(styles.touchable, styles.padLeft)}
        onClick={onPressLeft}
        onPointerDown={() => setStatus("pressed-left")}
        onPointerUp={() => setStatus("idle")}
        onPointerEnter={() => setStatus("hover-left")}
        onPointerLeave={() => setStatus("idle")}
        data-prevent-lose-focus
      />
      <div
        aria-label="Directional pad right"
        tabIndex={-1}
        className={cn(styles.touchable, styles.padRight)}
        onClick={onPressRight}
        onPointerDown={() => setStatus("pressed-right")}
        onPointerUp={() => setStatus("idle")}
        onPointerEnter={() => setStatus("hover-right")}
        onPointerLeave={() => setStatus("idle")}
        data-prevent-lose-focus
      />

      <PadSVG className={styles.pad} />
    </div>
  );
}
