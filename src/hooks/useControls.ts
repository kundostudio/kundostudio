import { useEffect, useState } from "react";

import { useKeyPress } from "~/hooks/useKeyPress";
import { useSound } from "~/hooks/useSound";
// @ts-ignore
import focusSound from "~/public/sounds/focus.wav";

const ELEMENTS_QUERY =
  'a[href], button:not([tabindex="-1"]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function useControls() {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [isFocusActive, setIsFocusActive] = useState<boolean | null>(null);

  const [playFocusSound] = useSound(focusSound);

  const moveFocus = (direction: "next" | "prev") => {
    playFocusSound();

    const elements = [...document.querySelectorAll(ELEMENTS_QUERY)] as HTMLElement[];

    const currentIndex = focusedIndex ?? 0;
    let nextIndex;

    if (!isFocusActive || isFocusActive === null) {
      console.log("focus", isFocusActive);
      nextIndex = currentIndex;
    } else {
      if (direction === "next") {
        nextIndex = (currentIndex + 1) % elements.length;
      } else {
        nextIndex = currentIndex <= 0 ? elements.length - 1 : currentIndex - 1;
      }
    }

    const element = elements[nextIndex] as HTMLElement;
    const prev = elements[currentIndex] as HTMLElement;

    if (element) {
      prev?.classList.remove("focused");

      setFocusedIndex(nextIndex);
      setIsFocusActive(true);

      element.focus();
      element.classList.add("focused");
    }
  };

  const select = () => {
    if (focusedIndex !== null) {
      const elements = [...document.querySelectorAll(ELEMENTS_QUERY)] as HTMLElement[];
      const element = elements[focusedIndex];
      if (element) {
        element.click();
        setIsFocusActive(true);

        if (!element.classList.contains("focused")) {
          element.classList.add("focused");
        }
      }
    }
  };

  const unselect = () => {
    if (focusedIndex !== null) {
      const elements = [...document.querySelectorAll(ELEMENTS_QUERY)] as HTMLElement[];
      const element = elements[focusedIndex];
      if (element) {
        element.classList.remove("focused");
        element.blur();
        setIsFocusActive(false);
      }
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

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      // Verificar si el click fue en un elemento con data-prevent-lose-focus o dentro de uno
      const clickedElement = e.target as HTMLElement;
      const shouldPreventLoseFocus = !!clickedElement.closest("[data-prevent-lose-focus]");

      if (!shouldPreventLoseFocus) {
        const elements = document.querySelectorAll(ELEMENTS_QUERY);
        elements.forEach((element) => element.classList.remove("focused"));

        setIsFocusActive(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return {
    focusBack: () => moveFocus("prev"),
    focusNext: () => moveFocus("next"),
    select,
    unselect,
  };
}
