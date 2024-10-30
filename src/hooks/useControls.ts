import { useState } from "react";

import { useKeyPress } from "~/hooks/useKeyPress";
import { useSound } from "~/hooks/useSound";
// @ts-ignore
import focusSound from "~/public/sounds/focus.wav";

const ELEMENTS_QUERY =
  'a[href], button:not([tabindex="-1"]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function useControls() {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const [playFocusSound] = useSound(focusSound);

  const moveFocus = (direction: "next" | "prev") => {
    playFocusSound();
    const elements = [...document.querySelectorAll(ELEMENTS_QUERY)] as HTMLElement[];

    const currentIndex = focusedIndex ?? 0;
    let nextIndex;

    if (direction === "next") {
      nextIndex = (currentIndex + 1) % elements.length;
    } else {
      nextIndex = currentIndex <= 0 ? elements.length - 1 : currentIndex - 1;
    }

    const element = elements[nextIndex] as HTMLElement;

    if (element) {
      setFocusedIndex(nextIndex);
      element.focus();
    }
  };

  useKeyPress(["ArrowLeft"], (e) => {
    e.preventDefault();
    moveFocus("prev");
  });

  useKeyPress(["ArrowRight"], (e) => {
    e.preventDefault();
    moveFocus("next");
  });

  return {
    focusBack: () => moveFocus("prev"),
    focusNext: () => moveFocus("next"),
  };
}
