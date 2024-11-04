import { AnimatePresence, motion } from "framer-motion";

import { useStore } from "~/lib/store";
import LogoBackground from "~/public/logo-outline/background.svg";
import LogoCake from "~/public/logo-outline/cake.svg";
import LogoNeon from "~/public/logo-outline/neon.svg";
import LogoPeach from "~/public/logo-outline/peach.svg";
import LogoSky from "~/public/logo-outline/sky.svg";
import LogoStereo from "~/public/logo-outline/stereo.svg";
import LogoWave from "~/public/logo-outline/wave.svg";

export function Cat({ className }) {
  const theme = useStore((s) => s.theme);

  const LogoOutline = {
    stereo: LogoStereo,
    sky: LogoSky,
    cake: LogoCake,
    peach: LogoPeach,
    wave: LogoWave,
    neon: LogoNeon,
    undefined: null,
  }[theme.name || "undefined"];

  const glitchVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, x: [10, 0] },
    exit: {
      opacity: [0, 1, 0],
      x: [-5, 0, -10, 0],
      y: [0, -1, 0, 2, 0],
      transition: { duration: 0.3, times: [0, 0.3, 0.5, 1] },
    },
  };

  return (
    <AnimatePresence mode="sync">
      <motion.div
        key={theme.name}
        className={className}
        variants={glitchVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <LogoBackground />
        <LogoOutline />
      </motion.div>
    </AnimatePresence>
  );
}
