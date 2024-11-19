import { useEffect, useState } from "react";

import { cn } from "~/lib/utils";

import frame1 from "./ascii/1.txt";
import frame10 from "./ascii/10.txt";
import frame11 from "./ascii/11.txt";
import frame2 from "./ascii/2.txt";
import frame3 from "./ascii/3.txt";
import frame4 from "./ascii/4.txt";
import frame5 from "./ascii/5.txt";
import frame6 from "./ascii/6.txt";
import frame7 from "./ascii/7.txt";
import frame8 from "./ascii/8.txt";
import frame9 from "./ascii/9.txt";
import styles from "./stake.module.scss";

const FRAMES = [
  frame1,
  frame2,
  frame3,
  frame4,
  frame5,
  frame6,
  frame7,
  frame8,
  frame9,
  frame10,
  frame11,
];

const FRAME_DURATION = 150;

export function CatAscii({ className }: JSX.IntrinsicElements["pre"]) {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % FRAMES.length);
    }, FRAME_DURATION);

    return () => clearInterval(interval);
  }, []);

  return <pre className={cn(styles.asciiArt, className)}>{FRAMES[currentFrame]}</pre>;
}
