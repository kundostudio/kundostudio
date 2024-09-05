import { View } from "@react-three/drei";
import { Canvas as R3FCanvas } from "@react-three/fiber";
import * as THREE from "three";

import styles from "./app.module.scss";

export function Canvas({ children }: React.PropsWithChildren) {
  return (
    <R3FCanvas
      className={styles.canvas}
      gl={{
        powerPreference: "high-performance",
        alpha: true,
        localClippingEnabled: true,
        toneMapping: THREE.CineonToneMapping,
        toneMappingExposure: 1,
      }}
      eventPrefix="offset"
      eventSource={document.body}
      shadows
    >
      <View.Port />
      {children}
    </R3FCanvas>
  );
}
