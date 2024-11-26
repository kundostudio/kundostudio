import { useRef, useState } from "react";

import { Button } from "~/components/button";
import { Input } from "~/components/input";
import { cn } from "~/lib/utils";
import MeowIcon from "~/public/coins/meow.svg";
import WildIcon from "~/public/coins/wild.svg";

import styles from "./stake.module.scss";

type Props = {
  apr: number;
  tvl: number;
  max: number;
  onSuccess: (coin: "wild" | "meow", amount: number) => void;
};

export function Stake({ apr, tvl, max, onSuccess }: Props) {
  const [active, setActive] = useState<"wild" | "meow">("wild");
  const [amount, setAmount] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAmountChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setAmount(numericValue);
  };

  const handleMaxClick = () => {
    setAmount(max.toString());
  };

  const handleStakeClick = () => {
    if (!amount) {
      inputRef.current?.focus();
      return;
    }
    onSuccess(active, Number(amount));
  };

  const displayAmount = amount ? `$${amount}` : "";

  const formattedApr = `${apr.toFixed(2)}%`;
  const formattedTvl = `%${tvl.toFixed(2)}`;

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabs}>
        <button
          onClick={() => setActive("wild")}
          className={cn(styles.tab, { [styles.active]: active === "wild" })}
        >
          <WildIcon className={styles.icon} />
          stake wild
        </button>
        <button
          onClick={() => setActive("meow")}
          className={cn(styles.tab, { [styles.active]: active === "meow" })}
        >
          <MeowIcon className={styles.icon} />
          stake meow
        </button>
      </div>

      <div className={styles.info}>
        <div className={styles.infoSection}>
          <span className={styles.label}>APR</span>
          <span className={styles.value}>{formattedApr}</span>
        </div>
        <div className={styles.infoSection}>
          <span className={styles.label}>TVL</span>
          <span className={styles.value}>{formattedTvl}</span>
        </div>
      </div>

      <Input
        ref={inputRef}
        type="text"
        value={displayAmount}
        onChange={handleAmountChange}
        placeholder="amount"
        showMax
        onMaxClick={handleMaxClick}
      />

      <Button variant="pixel" onClick={handleStakeClick}>
        STAKE NOW
      </Button>

      <div className={styles.footer}>
        <div className={styles.footerRow}>
          <span>Your Balance (WILD)</span>
          <div className={styles.dots} />
          <span>$101</span>
        </div>
        <div className={styles.footerRow}>
          <span>Your Claimable Rewards (WILD)</span>
          <div className={styles.dots} />
          <span>0</span>
        </div>
      </div>
    </div>
  );
}
