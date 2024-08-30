import localFont from "next/font/local";

import { Marquee } from "~/components/marquee";
import { useViewport } from "~/hooks/useViewport";
import ConsoleBottomLaptop from "~/public/console/console-bottom-1024.svg";
import ConsoleBottomDesktop from "~/public/console/console-bottom-1440.svg";
import ConsoleBottomDesktopXL from "~/public/console/console-bottom-1728.svg";
import ConsoleBottomMobileXL from "~/public/console/console-bottom-640.svg";
import ConsoleBottomTablet from "~/public/console/console-bottom-768.svg";
import ConsoleTopLaptop from "~/public/console/console-top-1024.svg";
import ConsoleTopDesktop from "~/public/console/console-top-1440.svg";
import ConsoleTopDesktopXL from "~/public/console/console-top-1728.svg";
import FullLogo from "~/public/logo-full-shadows.svg";

import styles from "./console.module.scss";

const neue = localFont({
  src: [
    {
      path: "../../../public/fonts/neue.woff2",
      weight: "400",
      style: "regular",
    },
  ],
  variable: "--font-neue",
});

export function Console({ children }) {
  const viewport = useViewport();

  const ConsoleTop = {
    desktopXL: ConsoleTopDesktopXL,
    desktop: ConsoleTopDesktop,
    laptop: ConsoleTopLaptop,
    // tablet: ConsoleTopTablet,
    // mobileXL: ConsoleTopMobileXL,
    none: null,
  }[viewport ?? "none"];

  const ConsoleBottom = {
    desktopXL: ConsoleBottomDesktopXL,
    desktop: ConsoleBottomDesktop,
    laptop: ConsoleBottomLaptop,
    tablet: ConsoleBottomTablet,
    mobileXL: ConsoleBottomMobileXL,
    none: null,
  }[viewport ?? "none"];

  if (!ConsoleTop || !ConsoleBottom) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.status}>
        <div className={styles.lightIndicator}>
          <div className={styles.light} />
          <div className={styles.light} />
          <div className={styles.light} />
          <div className={styles.light} />
        </div>
        <span className={neue.className}>chain live</span>
      </div>
      <ConsoleTop />
      <div className={styles.borders}>
        <div className={styles.borderLeft} />
        {children}
        <div className={styles.borderRight} />
      </div>
      <ConsoleBottom className={styles.consoleBottom} />
      <div>
        <Marquee className={styles.mindsEnteringNewWorlds} repeat={2} duration={10} offset={0}>
          <span className={neue.className}>minds entering other worlds</span>
        </Marquee>
        <FullLogo className={styles.logo} />
      </div>
    </div>
  );
}
