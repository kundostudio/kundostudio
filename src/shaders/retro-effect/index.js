import { Effect } from "postprocessing";
import * as THREE from "three";

import fragmentShader from "./retro-effect.frag";

export class RetroEffectImpl extends Effect {
  constructor() {
    const uniforms = new Map([
      ["colorNum", new THREE.Uniform(64.0)],
      ["pixelSize", new THREE.Uniform(1.0)],
      ["blending", new THREE.Uniform(true)],
      ["maskIntensity", new THREE.Uniform(0.6)],
      ["curve", new THREE.Uniform(0.15)],
    ]);

    super("RetroEffect", fragmentShader, {
      uniforms,
    });

    this.uniforms = uniforms;
  }

  set blending(value) {
    this.uniforms.get("blending").value = value;
  }

  get blending() {
    return this.uniforms.get("blending").value;
  }

  set curve(value) {
    this.uniforms.get("curve").value = value;
  }

  get curve() {
    return this.uniforms.get("curve").value;
  }

  set colorNum(value) {
    this.uniforms.get("colorNum").value = value;
  }

  get colorNum() {
    return this.uniforms.get("colorNum").value;
  }

  set pixelSize(value) {
    this.uniforms.get("pixelSize").value = value;
  }

  get pixelSize() {
    return this.uniforms.get("pixelSize").value;
  }

  set maskIntensity(value) {
    this.uniforms.get("maskIntensity").value = value;
  }

  get maskIntensity() {
    return this.uniforms.get("maskIntensity").value;
  }
}
