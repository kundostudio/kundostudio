"use client";

import { Bloom, EffectComposer, wrapEffect } from "@react-three/postprocessing";

import { RetroEffectImpl } from "~/shaders/retro-effect";

const RetroEffect = wrapEffect(RetroEffectImpl);

export function PostProcessing() {
  return (
    <EffectComposer multisampling={0}>
      {/* @ts-ignore */}
      <RetroEffect />
      <Bloom intensity={0.25} luminanceThreshold={0.05} luminanceSmoothing={0.9} />
    </EffectComposer>
  );
}
