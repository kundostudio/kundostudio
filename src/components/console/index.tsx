import { useMediaQuery, useRect } from "@studio-freight/hamo";
import localFont from "next/font/local";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Marquee } from "~/components/marquee";
import { useSound } from "~/hooks/useSound";
import { useViewport } from "~/hooks/useViewport";
import { useStore } from "~/lib/store";
import { cn } from "~/lib/utils";
import DirectionalPad from "~/public/console/directional-pad.svg";
import MeowTitle from "~/public/console/meow-title.svg";
import ScreenLaptop from "~/public/console/screen-1024.svg";
import ScreenDesktop from "~/public/console/screen-1440.svg";
import ScreenDesktopXL from "~/public/console/screen-1728.svg";
import ScreenMobileXL from "~/public/console/screen-640.svg";
import ScreenTablet from "~/public/console/screen-768.svg";
import ScreenMobile from "~/public/console/screen-mobile.svg";
import texture from "~/public/console/texture.png";
import SpeakerIconOff from "~/public/icons/speaker-off.svg";
import SpeakerIcon from "~/public/icons/speaker.svg";
import FullLogo from "~/public/logo-full-shadows.svg";
// @ts-ignore
import volumeToggleSound from "~/public/sounds/volume-toggle.mp3";

import { Checkbox } from "../checkbox";

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

function ChainLive() {
  return (
    <div className={styles.status}>
      <div className={styles.lightIndicator}>
        <div className={styles.light} />
        <div className={styles.light} />
        <div className={styles.light} />
        <div className={styles.light} />
      </div>
      <span className={neue.className}>chain live</span>
    </div>
  );
}

function TopStripes() {
  const isUpperMobile = useMediaQuery("(min-width: 640px)");
  return (
    <div className={styles.topStripes}>
      <div className={styles.stripe} />
      <div className={styles.stripe} />
      <div className={styles.stripe} />
      <div className={styles.stripe} />
      {isUpperMobile && <div className={styles.stripe} />}
    </div>
  );
}

function LateralStripes({ className }: React.HTMLProps<HTMLDivElement>) {
  return <div className={cn(styles.lateralStripes, className)} />;
}

function VolumeControl({ className }: React.HTMLProps<HTMLDivElement>) {
  const [playToggleSound] = useSound(volumeToggleSound, { soundEnabled: true });

  const soundEnabled = useStore((state) => state.soundEnabled);
  const { setSoundEnabled } = useStore.getState();

  const handleChange = (checked: boolean) => {
    playToggleSound();
    setSoundEnabled(!checked);
  };

  return (
    <div className={cn(styles.volumeControl, className)}>
      <Checkbox
        id="volume-control"
        checked={!soundEnabled}
        onCheckedChange={handleChange}
        className={styles.volumeCheckbox}
        aria-label={soundEnabled ? "Mute sound" : "Activate sound"}
        tabIndex={-1}
        data-prevent-lose-focus
      />
      <label htmlFor="volume-control" className={styles.volumeLabel} data-prevent-lose-focus>
        {soundEnabled ? (
          <SpeakerIcon className={styles.speakerIcon} />
        ) : (
          <SpeakerIconOff className={styles.speakerIcon} />
        )}
      </label>
    </div>
  );
}

function Speaker({ className }: React.HTMLProps<HTMLDivElement>) {
  const [circlesAmout, setCirclesAmout] = useState(0);
  const [setRef, rect] = useRect({
    callback: (rect) => setCirclesAmout(Math.floor(rect.width / (circleWidth + gap))),
  });
  const isUpperMobile = useMediaQuery("(min-width: 640px)");

  const circleWidth = isUpperMobile ? 10 : 8;
  const gap = 4;

  useEffect(() => {
    if (!rect) return;

    const rowWidth = rect.width;
    const amout = Math.floor(rowWidth / (circleWidth + gap));
    setCirclesAmout(amout);
  }, [rect, setCirclesAmout, circleWidth]);

  return (
    <div className={cn(styles.speaker, className)}>
      <div className={cn(styles.mainCircle, styles.circleLeft)} />
      <div className={cn(styles.mainCircle, styles.circleRight)} />
      <div className={styles.circles}>
        {Array.from({ length: circlesAmout }, (_, i) => (
          <div key={i} className={styles.circle} />
        ))}
      </div>
      <div ref={setRef} className={styles.circles}>
        {Array.from({ length: circlesAmout }, (_, i) => (
          <div key={i} className={styles.circle} />
        ))}
      </div>
    </div>
  );
}

function Text({ className, children }) {
  return <span className={cn(styles.text, className)}>{children}</span>;
}

function Pad({ onPressUp, onPressDown, onPressLeft, onPressRight }) {
  return (
    <div className={styles.padWrapper}>
      <div
        aria-label="Directional pad up"
        tabIndex={-1}
        className={cn(styles.touchable, styles.padUp)}
        onClick={onPressUp}
      />
      <div
        aria-label="Direction pad down"
        tabIndex={-1}
        className={cn(styles.touchable, styles.padDown)}
        onClick={onPressDown}
      />
      <div
        aria-label="Directional pad left"
        tabIndex={-1}
        className={cn(styles.touchable, styles.padLeft)}
        onClick={onPressLeft}
      />
      <div
        aria-label="Directional pad right"
        tabIndex={-1}
        className={cn(styles.touchable, styles.padRight)}
        onClick={onPressRight}
      />

      <DirectionalPad className={styles.pad} />
    </div>
  );
}

function Buttons({ onSelect, onUnselect, className }: any) {
  return (
    <div className={cn(styles.buttons, className)}>
      <button
        className={styles.button}
        onClick={onUnselect}
        aria-label="Secondary button"
        tabIndex={-1}
        data-prevent-lose-focus
      >
        b
      </button>
      <button
        className={styles.button}
        onClick={onSelect}
        aria-label="Primary button"
        tabIndex={-1}
        data-prevent-lose-focus
      >
        a
      </button>
    </div>
  );
}

export function Console({
  children,
  className,
  onPressUp,
  onPressDown,
  onPressLeft,
  onPressRight,
  onPressSelect,
  onPressUnselect,
}) {
  const viewport = useViewport();

  const Screen = {
    mobile: ScreenMobile,
    mobileXL: ScreenMobileXL,
    tablet: ScreenTablet,
    laptop: ScreenLaptop,
    desktop: ScreenDesktop,
    desktopXL: ScreenDesktopXL,
    none: null,
  }[viewport ?? "none"];

  if (!Screen) return null;

  return (
    <div className={cn(styles.consoleWrapper, className)}>
      {/* decorations */}
      <ChainLive />
      <MeowTitle className={styles.meowTitle} />
      <Text className={styles.textTop}>f3-m</Text>
      <Text className={styles.textLeft}>c24</Text>
      <Text className={styles.textRight}>f3-m</Text>
      <TopStripes />
      <LateralStripes className={styles.lateralTopStripes} />
      <LateralStripes className={styles.lateralBottomStripes} />

      {/* screen */}
      <div className={styles.screenWrapper}>
        <div className={styles.screenBlackFill} />
        <Screen className={styles.screen} />

        {/* content */}
        <div className={styles.content}>{children}</div>

        <div className={styles.screenBottomAddons}>
          <Marquee className={styles.mindsEnteringNewWorlds} repeat={4} speed={0.5} offset={0}>
            <span className={neue.className}>minds entering other worlds</span>
          </Marquee>
          <FullLogo className={styles.logo} />
        </div>
      </div>

      {/* volume */}
      <VolumeControl />
      <Speaker />

      {/* controls */}
      <Pad
        onPressUp={onPressUp}
        onPressDown={onPressDown}
        onPressLeft={onPressLeft}
        onPressRight={onPressRight}
      />
      <Buttons onSelect={onPressSelect} onUnselect={onPressUnselect} />

      {/* texture */}
      <Image src={texture} alt="texture" priority className={styles.texture} />
      <div className={styles.textureOverlay} />
    </div>
  );
}
