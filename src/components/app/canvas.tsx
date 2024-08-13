import { Canvas as R3FCanvas } from "@react-three/fiber";

import styles from "./app.module.scss";

export function Canvas({ children }: React.PropsWithChildren) {
  return (
    <R3FCanvas
      className={styles.canvas}
      gl={{
        powerPreference: "high-performance",
        alpha: true,
        localClippingEnabled: true,
      }}
      eventPrefix="offset"
      eventSource={document.body}
      shadows
    >
      {children}
    </R3FCanvas>
  );
}
