import { useCallback, useEffect } from "react";

export function useKeyPress(key: string | string[], callback: () => void) {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (Array.isArray(key) ? key.includes(event.key) : event.key === key) {
        callback();
      }
    },
    [key, callback]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
}
