import { useMediaQuery } from "@studio-freight/hamo";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { Button } from "~/components/button";
import { cn } from "~/lib/utils";
import BackgroundLogo from "~/public/big-meow-background.svg";
import SmallLogo from "~/public/logo.svg";
import MeowJapanese from "~/public/logo/letter-japanese.svg";
import MeowEnglish from "~/public/logo/letters.svg";

import { Link } from "../link";

import styles from "./header.module.scss";

const GLITCH_VARIANTS = {
  initial: { opacity: 0 },
  animate: { opacity: 1, x: [5, 0] },
  exit: {
    opacity: [0, 1, 1, 0, 1, 0],
    x: [-2, 0, -3, 0],
    y: [-1, 0, 1, 0],
    transition: { duration: 0.3, times: [0, 0.3, 0.5, 0.7, 0.9, 1] },
  },
};

function LettersLogo() {
  const [isEnglish, setIsEnglish] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIsEnglish((prev) => !prev);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isEnglish ? "english" : "japanese"}
        variants={GLITCH_VARIANTS}
        initial="initial"
        animate="animate"
        exit="exit"
        className={styles.lettersLogo}
      >
        {isEnglish ? <MeowEnglish /> : <MeowJapanese />}
      </motion.div>
    </AnimatePresence>
  );
}

export function MeowLinkLogo({ className, ...props }: any) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isMobileXS = useMediaQuery("(max-width: 640px)");

  if (isMobileXS) {
    return (
      <Link href="/" className={cn(styles.meowLinkLogoMobile, className)} {...props}>
        <BackgroundLogo className={styles.logoBackground} />
        <SmallLogo className={styles.logo} />
      </Link>
    );
  }

  return (
    <Button href="/" variant="highlight" className={className}>
      <span className={styles.linkLogo}>
        {isMobile ? <SmallLogo className={styles.logo} /> : <LettersLogo />}
      </span>
    </Button>
  );
}
