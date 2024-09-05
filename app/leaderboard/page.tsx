import { Typography } from "~/components/typography";

import styles from "./leaderboard.module.scss";

export default function Page() {
  return (
    <main className={styles.leaderboardPage}>
      <Typography.H2 className={styles.title}>leaderboard</Typography.H2>
      <div className={styles.lineHorizontal} />
      <div className={styles.leaderboard}></div>
      <div className={styles.lineHorizontal} />
      <Typography.H2 className={styles.title}>recent joins</Typography.H2>
    </main>
  );
}
