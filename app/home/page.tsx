import { Typography } from "~/components/typography";
import BigMeowBackground from "~/public/big-meow-background.svg";
import BigMeow from "~/public/logo.svg";
import Portal from "~/public/portal.svg";

import styles from "./home.module.scss";

export function HomePage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.portalWrapper}>
        <Portal className={styles.portal} />
        <BigMeow className={styles.bigMeow} />
        <BigMeowBackground className={styles.bigMeowBackground} />
      </div>
      <div className={styles.titleWrapper}>
        <Typography.H1 className={styles.title}>a hyper-fast blockchain</Typography.H1>
      </div>
    </div>
  );
}
