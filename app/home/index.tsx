"use client";

import { View } from "@react-three/drei";

import { Footer } from "~/components/footer";
import { Line } from "~/components/Line";

import styles from "./home.module.scss";
import { HomeScene } from "./scene";

export function HomePage() {
  return (
    <div className={styles.wrapper}>
      <View className={styles.portalWrapper}>
        <HomeScene />
      </View>
      <Line direction="horizontal" className={styles.footerTopLine} />
      <Footer />
    </div>
  );
}
