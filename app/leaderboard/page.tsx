"use client";

import { useMediaQuery } from "@studio-freight/hamo";

import { Line } from "~/components/Line";
import { Footer } from "~/components/footer";
import { Marquee } from "~/components/marquee";
import { Typography } from "~/components/typography";

import { RECENT_JOINS } from "./data";
import { Leaderboard } from "./leaderboard";
import styles from "./leaderboard.module.scss";

export default function Page() {
  const isUpperMobile = useMediaQuery("(min-width: 640px)");
  return (
    <main className={styles.leaderboardPage}>
      <Typography.H2 className={styles.title}>leaderboard</Typography.H2>
      <Line direction="horizontal" />
      <Leaderboard className={styles.leaderboardWrapperWrapper} />
      <Line direction="horizontal" />
      <Typography.H2 className={styles.title}>recent joins</Typography.H2>
      <Marquee className={styles.recentJoinMarquee} duration={60} offset={0}>
        {RECENT_JOINS.map(({ name, since }) => (
          <div key={name} className={styles.recentJoin}>
            <span className={styles.recentJoinName}>{name}</span>
            <span className={styles.recentJoinSince}>{since}</span>
          </div>
        ))}
      </Marquee>
      {isUpperMobile && (
        <>
          <Line direction="horizontal" className={styles.footerTopLine} />
          <Footer />
        </>
      )}
    </main>
  );
}
