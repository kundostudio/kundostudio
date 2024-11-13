"use client";

import { useQuery } from "@tanstack/react-query";

import { Marquee } from "~/components/marquee";
import { fetcher } from "~/lib/fetcher";
import { cn } from "~/lib/utils";
import { CoinData } from "~/types";

import styles from "./coins.module.scss";

type Props = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const parseValue = (value: number) => {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
};

export function Coins({ className, ...props }: Props) {
  const {
    data: coins = [],
    error,
    isError,
  } = useQuery<CoinData[]>({
    queryKey: ["cat-coins"],
    queryFn: () => fetcher("/api/cat-coins"),
    refetchInterval: 60000,
  });

  // const coinInfoMutation = useMutation({
  //   mutationFn: async (slug: string) => {
  //     const response = await fetcher(`/api/coin-info?slug=${slug}`);
  //     return response as CoinInfo;
  //   },
  //   onSuccess: (data) => {
  //     // Abrimos la URL del sitio web de la moneda en una nueva pestaña
  //     if (data.urls.website) {
  //       window.open(data.urls.explorer, "_blank");
  //     }
  //   },
  // });

  if (isError) {
    return <div className={styles.coin}>{(error as any).info?.error}</div>;
  }

  const handleCoinClick = (coin: CoinData) => {
    // coinInfoMutation.mutate(coin.slug);
    window.open(`https://coinmarketcap.com/currencies/${coin.slug}/`, "_blank");
  };

  return (
    <Marquee
      className={cn(styles.coins, className)}
      slowDownOnHover
      speed={0.5}
      repeat={2}
      key={coins?.length}
      {...props}
    >
      {coins.map((coin: CoinData, i: number) => (
        <div
          key={`${i}-${coin.symbol}`}
          className={cn(styles.coin, {
            // [styles.loading]: coinInfoMutation.isPending,
          })}
          onClick={() => handleCoinClick(coin)}
        >
          <span className={styles.variationName}>{coin.symbol}</span>
          <span className={styles.variationIndicator}>{coin.change > 0 ? "▲" : "▼"}</span>
          <span className={styles.variationValue}>{parseValue(coin.change)}</span>
        </div>
      ))}
    </Marquee>
  );
}
