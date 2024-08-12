"use client";

import { Preload, View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";

import { R3F } from "~/lib/r3f";

export function GlobalCanvas() {
  return (
    <Canvas
      style={{
        position: "fixed",
        zIndex: -1,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
      camera={{ position: [0, 0, -15], far: 200, near: 0.01, fov: 60 }}
      gl={{
        powerPreference: "high-performance",
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      eventPrefix="client"
      eventSource={document.body}
      shadows
    >
      <Suspense fallback={null}>
        <View.Port />
        <R3F.Out />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
