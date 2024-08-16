import { useMediaQuery } from "@studio-freight/hamo";
import NextLink from "next/link";

import FullLogo from "~/public/logo-full.svg";
import SmallLogo from "~/public/logo.svg";

import styles from "./header.module.scss";

export function LinkLogo() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  return (
    <NextLink href="/" className={styles.linkLogo}>
      {isMobile ? <SmallLogo className={styles.logo} /> : <FullLogo className={styles.logo} />}
      <span className={styles.corner} />
      <span className={styles.corner} />
      <span className={styles.corner} />
      <span className={styles.corner} />
    </NextLink>
  );
}
