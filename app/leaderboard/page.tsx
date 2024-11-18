"use client";

import { useMediaQuery } from "@studio-freight/hamo";

import { Line } from "~/components/Line";
import { Footer } from "~/components/footer";
import { Typography } from "~/components/typography";

import { Leaderboard } from "./leaderboard";
import styles from "./leaderboard.module.scss";
import { RecentJoins } from "./recent-joins";

export default function Page() {
  const isUpperMobile = useMediaQuery("(min-width: 640px)");
  return (
    <main className={styles.leaderboardPage}>
      <Leaderboard className={styles.leaderboardWrapperWrapper} />
      <Line direction="horizontal" />
      <Typography.H2 className={styles.title}>recent joins</Typography.H2>
      <RecentJoins />
      {isUpperMobile && (
        <>
          <Line direction="horizontal" className={styles.footerTopLine} />
          <Footer />
        </>
      )}
    </main>
  );
}
