"use client";

import { View } from "@react-three/drei";

import { Footer } from "~/components/footer";
import { Line } from "~/components/Line";

import { Cat } from "./cat";
import styles from "./home.module.scss";
import { HomeScene } from "./scene";

export function HomePage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.portalWrapper}>
        <Cat className={styles.logo} />
        <div className={styles.fog} />
        <View as="button" frames={1} className={styles.portal}>
          <HomeScene />
        </View>
      </div>
      <Line direction="horizontal" className={styles.footerTopLine} />
      <Footer />
    </div>
  );
}
