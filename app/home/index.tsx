"use client";

import { View } from "@react-three/drei";

import styles from "./home.module.scss";
import { HomeScene } from "./scene";

export function HomePage() {
  return (
    <div className={styles.wrapper}>
      <View className={styles.portalWrapper}>
        <HomeScene />
      </View>
    </div>
  );
}
