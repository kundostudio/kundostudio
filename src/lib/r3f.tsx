"use client";

import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";
import tunnel from "tunnel-rat";

export const R3F = tunnel();

export const Three = ({ children }) => {
  return <R3F.In>{children}</R3F.In>;
};

export function generateShader(name, uniforms, vertex, fragment) {
  const shader = shaderMaterial(uniforms, vertex, fragment);
  shader.key = THREE.MathUtils.generateUUID();

  extend({ [name]: shader });
  return shader;
}
