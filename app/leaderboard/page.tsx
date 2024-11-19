"use client";

import { Line } from "~/components/Line";
import { Typography } from "~/components/typography";

import { Leaderboard } from "./leaderboard";
import styles from "./leaderboard.module.scss";
import { RecentJoins } from "./recent-joins";

export default function Page() {
  return (
    <main className={styles.leaderboardPage}>
      <Leaderboard className={styles.leaderboardWrapperWrapper} />
      <Line direction="horizontal" />
      <Typography.H2 className={styles.title}>recent joins</Typography.H2>
      <RecentJoins />
    </main>
  );
}
