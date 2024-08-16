import { Marquee } from "~/components/marquee";
import { cn } from "~/lib/utils";

import styles from "./variations.module.scss";

const variations = [
  {
    name: "mog",
    value: -0.12,
  },
  {
    name: "eth",
    value: -0.12,
  },
  {
    name: "wbtc",
    value: -0.12,
  },
  {
    name: "meow",
    value: 0.12,
  },
  {
    name: "wild",
    value: 0.22,
  },
  {
    name: "tsla",
    value: -0.23,
  },
];

const parseValue = (value: number) => {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value}%`;
};

export function Variations({ className, ...props }: JSX.IntrinsicElements["div"]) {
  return (
    <Marquee className={cn(styles.variations, className)} repeat={4} duration={10} {...props}>
      {variations.map((v, i) => (
        <div key={i} className={styles.variation}>
          <span className={styles.variationName}>{v.name}</span>
          <span className={styles.variationIndicator}>{v.value > 0 ? "▲" : "▼"}</span>
          <span className={styles.variationValue}>{parseValue(v.value)}</span>
        </div>
      ))}
    </Marquee>
  );
}
