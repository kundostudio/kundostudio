"use client";

import { useFrame } from "@react-three/fiber";
import { EffectComposer, wrapEffect } from "@react-three/postprocessing";
import { useControls } from "leva";
import { useRef } from "react";

import { RetroEffectImpl } from "~/shaders/retro-effect";

const RetroEffect = wrapEffect(RetroEffectImpl);

export function PostProcessing() {
  const effect = useRef<any>(null);

  const { postprocessing: enabled } = useControls({
    postprocessing: {
      value: true,
    },
  });

  const { maskIntensity, blending, colorNum, pixelSize } = useControls({
    blending: {
      value: true,
    },
    maskIntensity: {
      value: 0.8,
      min: 0.0,
      max: 1.0,
    },
    colorNum: {
      value: "16.0",
      options: ["2.0", "4.0", "8.0", "16.0"],
    },
    pixelSize: {
      value: "4.0",
      options: ["1.0", "2.0", "4.0", "8.0", "16.0", "32.0"],
    },
  });

  useFrame((state) => {
    if (!effect.current) return;
    const { camera, clock } = state;

    effect.current.colorNum = parseInt(colorNum, 10);
    effect.current.blending = blending;
    effect.current.pixelSize = parseInt(pixelSize, 10);
    effect.current.maskIntensity = maskIntensity;
  });

  return (
    <EffectComposer multisampling={0} enabled={enabled}>
      {/* @ts-ignore */}
      <RetroEffect ref={effect} />
      {/* <Bloom intensity={0.25} luminanceThreshold={0.05} luminanceSmoothing={0.9} /> */}
    </EffectComposer>
  );
}
