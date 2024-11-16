"use client";

import { useEffect, useState } from "react";

import { cn } from "~/lib/utils";

import styles from "./gamepad-detected.module.scss";

export function GamepadDetected({ className }: { className?: string }) {
  const [isGamepadConnected, setIsGamepadConnected] = useState(false);

  useEffect(() => {
    const handleGamepadConnected = () => {
      setIsGamepadConnected(true);
    };

    const handleGamepadDisconnected = () => {
      setIsGamepadConnected(false);
    };

    window.addEventListener("gamepadconnected", handleGamepadConnected);
    window.addEventListener("gamepaddisconnected", handleGamepadDisconnected);

    // Check initial state
    const gamepads = navigator.getGamepads();
    if (gamepads[0]) {
      setIsGamepadConnected(true);
    }

    return () => {
      window.removeEventListener("gamepadconnected", handleGamepadConnected);
      window.removeEventListener("gamepaddisconnected", handleGamepadDisconnected);
    };
  }, []);

  if (!isGamepadConnected) return null;

  return (
    <button tabIndex={-1} className={cn(styles.gamepadDetected, className)}>
      GAMEPAD DETECTED
    </button>
  );
}
