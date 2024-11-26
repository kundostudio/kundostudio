import * as RadixDialog from "@radix-ui/react-dialog";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

import MeowIcon from "~/public/coins/meow.svg";
import WildIcon from "~/public/coins/wild.svg";
import Check from "~/public/icons/check.svg";

import { DotMatrix } from "./dot-matrix";
import styles from "./stake-success.module.scss";

type Props = {
  coin: "wild" | "meow";
  amount: number;
};

export function StakeSuccess({ coin, amount }: Props) {
  const Icon = coin === "meow" ? MeowIcon : WildIcon;
  const count = useMotionValue(0);
  const rounded = useTransform(count, (value) => value.toFixed(2));

  useEffect(() => {
    const animation = animate(count, amount, {
      duration: 2,
      ease: "easeOut",
    });

    return animation.stop;
  }, [amount, count]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.check}>
        <Check className={styles.checkIcon} />
      </div>
      <h2 className={styles.title}>success</h2>
      <p className={styles.subtitle}>you successfully staked wild!</p>
      <div className={styles.stakedWrapper}>
        <DotMatrix className={styles.dots} />
        <div className={styles.staked}>
          <Icon className={styles.icon} />
          <span className={styles.text}>
            <span className={styles.numberWrapper}>
              <span className={styles.placeholder}>{amount.toFixed(2)}</span>
              <motion.span className={styles.animatedNumber}>{rounded}</motion.span>
            </span>{" "}
            staked
          </span>
        </div>
        <DotMatrix className={styles.dots} />
      </div>
      <RadixDialog.Close className={styles.closeButton}>
        back to home
        <span className="sr-only">Close</span>
      </RadixDialog.Close>
    </div>
  );
}
