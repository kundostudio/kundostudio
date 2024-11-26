"use client";

import { useMediaQuery } from "@studio-freight/hamo";

import { Button } from "~/components/button";
import { useDialog } from "~/hooks/useDialog";

import { CatAscii } from "./cat-ascii";
import { StakeDialog } from "./stake-dialog";
import styles from "./stake.module.scss";

export default function Page() {
  const isUpperTablet = useMediaQuery("(min-width: 768px)");

  const { setDialogOpen } = useDialog("stake-dialog", {
    title: "stake",
    closeOnClickOutside: false,
    content: <StakeDialog />,
  });

  return (
    <main className={styles.stakePage}>
      {isUpperTablet && (
        <div className={styles.imageSection}>
          <span className={styles.imageCorner} />
          <span className={styles.imageCorner} />
          <span className={styles.imageCorner} />
          <span className={styles.imageCorner} />
          <CatAscii />
        </div>
      )}

      <div className={styles.contentWrapper}>
        <div className={styles.contentSection}>
          <div className={styles.stakeInfo}>
            <div className={styles.infoRow}>
              <span className={styles.label}>TVL:</span>
              <span className={styles.value}>$240,375.201</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>EARNED</span>
              <span className={styles.value}>246 MEOW</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>APR:</span>
              <span className={styles.value}>201.333.111%</span>
            </div>
          </div>

          <div className={styles.stakeContent}>
            <h2 className={styles.title}>
              STAKE WILD / CONNECT YOUR WALLET AND START STAKING TO EARN MEOW
            </h2>

            <Button
              variant="pixel"
              className={styles.stakeButton}
              onClick={() => setDialogOpen(true)}
            >
              STAKE NOW
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
