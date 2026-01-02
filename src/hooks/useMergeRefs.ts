import { useCallback } from "react";

export function useMergeRefs(...refs) {
  return useCallback(
    (node: any) => {
      refs.forEach((ref) => {
        if (!ref) return;
        if (typeof ref === "function") {
          ref(node);
        } else {
          ref.current = node;
        }
      });
    },
    [refs]
  );
}
