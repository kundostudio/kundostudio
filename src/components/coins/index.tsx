"use client";

import useSWR from "swr";

import { Marquee } from "~/components/marquee";
import { fetcher } from "~/lib/fetcher";
import { cn } from "~/lib/utils";

import styles from "./coins.module.scss";

type Props = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const parseValue = (value: number) => {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
};

export function Coins({ className, ...props }: Props) {
  const { data: coins = [], error } = useSWR("/api/cat-coins", fetcher, {
    refreshInterval: 60000,
  });

  if (error) {
    return <div className={styles.coin}>{error.info?.error}</div>;
  }

  return (
    <Marquee
      className={cn(styles.coins, className)}
      slowDownOnHover
      speed={0.5}
      repeat={2}
      key={coins?.length}
      {...props}
    >
      {coins.map((coin: any, i: number) => (
        <div key={`${i}-${coin.symbol}`} className={styles.coin}>
          <span className={styles.variationName}>{coin.symbol}</span>
          <span className={styles.variationIndicator}>{coin.change > 0 ? "▲" : "▼"}</span>
          <span className={styles.variationValue}>{parseValue(coin.change)}</span>
        </div>
      ))}
    </Marquee>
  );
}
