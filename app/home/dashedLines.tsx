import { useFrame, useThree } from "@react-three/fiber";
import { MeshLineMaterial } from "meshline";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { useStore } from "~/lib/store";

function Line({ curve, color }) {
  const material = useRef<MeshLineMaterial>(null!);
  const speed = 1;

  useFrame((state, delta) => (material.current.dashOffset += (delta * speed) / 4));

  return (
    <mesh>
      <meshLineGeometry points={curve} />
      <meshLineMaterial
        ref={material}
        transparent
        lineWidth={0.03}
        color={color}
        depthWrite={false}
        dashArray={0.015}
        dashRatio={0.2}
        toneMapped={false}
      />
    </mesh>
  );
}

export function DashedLines() {
  const { width, height } = useThree((s) => s.viewport);
  const theme = useStore((s) => s.theme);

  const primaryColor = useMemo(() => `rgb(${theme.color})`, [theme]);

  const lines = useMemo(() => {
    const curves: any = [];
    const center = new THREE.Vector3(0, 0, -50);
    const viewportWidth = width;
    const viewportHeight = height;

    // Left side
    for (let i = 0; i < 5; i++) {
      const startPoint = new THREE.Vector3(
        -viewportWidth / 2,
        (i / 4) * viewportHeight - viewportHeight / 2,
        1
      );
      const endPoint = new THREE.Vector3(
        -viewportWidth / 2,
        (i / 4) * viewportHeight - viewportHeight / 2,
        -30
      );
      const curve = new THREE.CatmullRomCurve3([startPoint, endPoint]).getPoints(300);
      curves.push(curve);
    }

    // Right side
    for (let i = 0; i < 5; i++) {
      const startPoint = new THREE.Vector3(
        viewportWidth / 2,
        (i / 4) * viewportHeight - viewportHeight / 2,
        1
      );
      const endPoint = new THREE.Vector3(
        viewportWidth / 2,
        (i / 4) * viewportHeight - viewportHeight / 2,
        -30
      );
      const curve = new THREE.CatmullRomCurve3([startPoint, endPoint]).getPoints(300);
      curves.push(curve);
    }

    // Top
    for (let i = 1; i < 6; i++) {
      const startPoint = new THREE.Vector3(
        (i / 6) * viewportWidth - viewportWidth / 2,
        viewportHeight / 2,
        1
      );
      const endPoint = new THREE.Vector3(
        (i / 6) * viewportWidth - viewportWidth / 2,
        viewportHeight / 2,
        -30
      );
      const curve = new THREE.CatmullRomCurve3([startPoint, endPoint]).getPoints(300);
      curves.push(curve);
    }

    // Bottom
    for (let i = 1; i < 6; i++) {
      const startPoint = new THREE.Vector3(
        (i / 6) * viewportWidth - viewportWidth / 2,
        -viewportHeight / 2,
        1
      );
      const endPoint = new THREE.Vector3(
        (i / 6) * viewportWidth - viewportWidth / 2,
        -viewportHeight / 2,
        -30
      );
      const curve = new THREE.CatmullRomCurve3([startPoint, endPoint]).getPoints(300);
      curves.push(curve);
    }

    return curves;
  }, [width, height]);

  return lines.map((curve, i) => <Line key={i} curve={curve} color={primaryColor} />);
}
