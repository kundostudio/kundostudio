import { useMediaQuery } from "@studio-freight/hamo";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { Button } from "~/components/button";
import { cn } from "~/lib/utils";
import BackgroundLogo from "~/public/big-meow-background.svg";
import SmallLogo from "~/public/logo.svg";

import { Link } from "../link";

import styles from "./header.module.scss";
import { ENGLISH_MEOW, JAPANESE_MEOW } from "./letters";

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

  const glitchVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: {
      opacity: [0, 1, 0],
      transition: { duration: 0.3, times: [0, 0.5, 1] },
    },
  };

  return (
    <div className={styles.lettersLogo}>
      <AnimatePresence mode="wait">
        {isEnglish ? (
          <motion.span
            key="english"
            variants={glitchVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            data-text={ENGLISH_MEOW}
            className={styles.glitchText}
          >
            {ENGLISH_MEOW}
          </motion.span>
        ) : (
          <motion.span
            key="japanese"
            variants={glitchVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            data-text={JAPANESE_MEOW}
            className={styles.glitchText}
          >
            {JAPANESE_MEOW}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MeowLinkLogo({ className }: { className?: string }) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isMobileXS = useMediaQuery("(max-width: 640px)");

  if (isMobileXS) {
    return (
      <Link href="/" className={cn(styles.meowLinkLogoMobile, className)}>
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
