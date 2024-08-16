"use client";

import { View } from "@react-three/drei";

import { Typography } from "~/components/typography";

import styles from "./home.module.scss";
import { HomeScene } from "./scene";

export function HomePage() {
  return (
    <div className={styles.wrapper}>
      <View className={styles.portalWrapper}>
        <HomeScene />
      </View>
      <div className={styles.titleWrapper}>
        <Typography.H1 className={styles.title}>a hyper-fast blockchain</Typography.H1>
      </div>
    </div>
  );
}
