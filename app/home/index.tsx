"use client";

import { View } from "@react-three/drei";

import { Footer } from "~/components/footer";
import { Line } from "~/components/Line";
import LogoOutline from "~/public/logo-outline.svg";

import styles from "./home.module.scss";
import { HomeScene } from "./scene";

export function HomePage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.portalWrapper}>
        <LogoOutline className={styles.logo} />
        <div className={styles.fog} />
        <View className={styles.portal}>
          <HomeScene />
        </View>
      </div>
      <Line direction="horizontal" className={styles.footerTopLine} />
      <Footer />
    </div>
  );
}
