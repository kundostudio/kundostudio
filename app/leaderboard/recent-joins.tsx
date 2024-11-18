"use client";

import { useQuery } from "@tanstack/react-query";

import { Marquee } from "~/components/marquee";
import { fetcher } from "~/lib/fetcher";
import { RecentJoinUser } from "~/types";

import styles from "./leaderboard.module.scss";

export function RecentJoins() {
  const { data } = useQuery({
    queryKey: ["recent-joins"],
    queryFn: () => fetcher("/api/recent-joins"),
    refetchInterval: 20000,
  });

  if (!data) return null;

  return (
    <Marquee className={styles.recentJoinMarquee} speed={0.5} offset={0} slowDownOnHover>
      {data.map((user: RecentJoinUser) => (
        <div key={`${user.name}-${user.joined_at}`} className={styles.recentJoin}>
          <span className={styles.recentJoinName}>{user.name}</span>
          <span className={styles.recentJoinSince}>{user.relative}</span>
        </div>
      ))}
    </Marquee>
  );
}
