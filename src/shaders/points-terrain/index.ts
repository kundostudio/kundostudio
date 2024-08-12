import * as THREE from "three";

import { generateShader } from "~/lib/r3f";

import fragment from "./points-terrain.frag";
import vertex from "./points-terrain.vert";

export const PointsTerrainMaterial = generateShader(
  "PointsTerrainMaterial",
  {
    uTime: 0,
    uNoiseScale: 0.3,
    uAmplitude: 2,
    uHorizontalSpeed: 0.01,
    uVerticalSpeed: 0.01,
    uRadius: 10,
    uSize: 10,
    uSizeAttenuationFactor: 1,
    uNoise2Scale: 10,
    uNoise2Amplitude: 0.2,
    uTexture: null,
    uDistance: 0.3,
    uFalloffStart: 0.1,
    uBaseColor: new THREE.Color(0.89, 0.1, 0.18),
    uOpacityFactor: 0.03,
  },
  vertex,
  fragment
);

export type PointsTerrainMaterialProps = THREE.ShaderMaterial & {
  uTime: number;
  uNoiseScale: number;
  uAmplitude: number;
  uHorizontalSpeed: number;
  uVerticalSpeed: number;
  uRadius: number;
  uSize: number;
  uSizeAttenuationFactor: number;
  uNoise2Scale: number;
  uNoise2Amplitude: number;
  uTexture: THREE.Texture | null;
  uDistance: number;
  uFalloffStart: number;
  uBaseColor: THREE.Color;
  uOpacityFactor: number;
};
