import { useCallback, useEffect, useRef, useState } from "react";

import { useKeyPress } from "~/hooks/useKeyPress";
import { useSound } from "~/hooks/useSound";
// @ts-ignore
import focusSound from "~/public/sounds/focus.wav";

const ELEMENTS_QUERY =
  'a[href], button:not([tabindex="-1"]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function useControls() {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [isFocusActive, setIsFocusActive] = useState<boolean | null>(null);

  const gamepadRef = useRef({
    lastAxisUpdate: 0,
    lastButtonPress: 0,
    buttonPressTimeout: null as NodeJS.Timeout | null,
  });

  const [playFocusSound] = useSound(focusSound);

  const moveFocus = useCallback(
    (direction: "next" | "prev") => {
      playFocusSound();

      const elements = [...document.querySelectorAll(ELEMENTS_QUERY)] as HTMLElement[];

      const currentIndex = focusedIndex ?? 0;
      let nextIndex;

      if (!isFocusActive || isFocusActive === null) {
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
    },
    [focusedIndex, isFocusActive, playFocusSound]
  );

  const select = useCallback(() => {
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
  }, [focusedIndex]);

  const unselect = useCallback(() => {
    console.log("unselect");
    if (focusedIndex !== null) {
      const elements = [...document.querySelectorAll(ELEMENTS_QUERY)] as HTMLElement[];
      const element = elements[focusedIndex];
      if (element) {
        element.classList.remove("focused");
        element.blur();
        setIsFocusActive(false);
      }
    }
  }, [focusedIndex]);

  const focusElement = (elementRef: React.RefObject<HTMLElement>) => {
    if (!elementRef.current) return;

    const elements = [...document.querySelectorAll(ELEMENTS_QUERY)] as HTMLElement[];
    const elementIndex = elements.findIndex((el) => el === elementRef.current);

    if (elementIndex !== -1) {
      const prevElement = focusedIndex !== null ? elements[focusedIndex] : null;
      prevElement?.classList.remove("focused");

      setFocusedIndex(elementIndex);
      setIsFocusActive(true);
      elementRef.current.classList.add("focused");
      elementRef.current.focus();
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

  const handleGamepadInput = useCallback(() => {
    const gamepad = navigator.getGamepads()?.[0];
    if (!gamepad) return;

    const now = Date.now();
    const DEBOUNCE_TIME = 150;

    if (now - gamepadRef.current.lastAxisUpdate > DEBOUNCE_TIME) {
      const axisH = gamepad.axes[0];

      if (Math.abs(axisH) > 0.5) {
        if (axisH > 0.5) {
          moveFocus("next");
        } else if (axisH < -0.5) {
          moveFocus("prev");
        }
        gamepadRef.current.lastAxisUpdate = now;
      }
    }

    const buttonA = gamepad.buttons[0];
    const buttonB = gamepad.buttons[1];

    if (buttonA.pressed && !gamepadRef.current.buttonPressTimeout) {
      select();
      gamepadRef.current.buttonPressTimeout = setTimeout(() => {
        gamepadRef.current.buttonPressTimeout = null;
      }, 300);
    } else if (buttonB.pressed && !gamepadRef.current.buttonPressTimeout) {
      unselect();
      gamepadRef.current.buttonPressTimeout = setTimeout(() => {
        gamepadRef.current.buttonPressTimeout = null;
      }, 300);
    }
  }, [moveFocus, select, unselect]);

  useEffect(() => {
    const handleGamepadConnected = (e: GamepadEvent) => {
      console.log("Gamepad connected:", e.gamepad);
    };

    const handleGamepadDisconnected = (e: GamepadEvent) => {
      console.log("Gamepad disconnected:", e.gamepad);
    };

    window.addEventListener("gamepadconnected", handleGamepadConnected);
    window.addEventListener("gamepaddisconnected", handleGamepadDisconnected);

    let animationFrameId: number;
    const pollGamepad = () => {
      handleGamepadInput();
      animationFrameId = requestAnimationFrame(pollGamepad);
    };
    pollGamepad();

    return () => {
      window.removeEventListener("gamepadconnected", handleGamepadConnected);
      window.removeEventListener("gamepaddisconnected", handleGamepadDisconnected);
      cancelAnimationFrame(animationFrameId);
    };
  }, [handleGamepadInput]);

  return {
    focusBack: () => moveFocus("prev"),
    focusNext: () => moveFocus("next"),
    select,
    unselect,
    focusElement,
  };
}
