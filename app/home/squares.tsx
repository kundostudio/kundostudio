import { useFrame, useThree } from "@react-three/fiber";
import { MeshLineMaterial } from "meshline";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { useStore } from "~/lib/store";

const DISTANCE = 2;

function Rectangle({ width, height, position }) {
  const material = useRef<MeshLineMaterial>(null!);

  const geometry = useMemo(() => {
    const points = [
      new THREE.Vector3(-width / 2, -height / 2, 0),
      new THREE.Vector3(width / 2, -height / 2, 0),
      new THREE.Vector3(width / 2, height / 2, 0),
      new THREE.Vector3(-width / 2, height / 2, 0),
      new THREE.Vector3(-width / 2, -height / 2, 0),
    ];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [width, height]);

  const theme = useStore((s) => s.theme);
  const primaryColor = useMemo(() => `rgb(${theme.color})`, [theme]);

  return (
    <mesh position={position}>
      <meshLineGeometry points={geometry.attributes.position.array as any} />
      <meshLineMaterial
        ref={material}
        transparent
        lineWidth={0.03}
        color={primaryColor}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

export function Rectangles() {
  const ref = useRef<THREE.Group>(null!);
  const { width, height } = useThree((s) => s.viewport);

  const rectangles = useMemo(() => {
    const rectangleData = [] as any;
    for (let i = 0; i < 20; i++) {
      rectangleData.push({ width, height });
    }
    return rectangleData;
  }, [width, height]);

  useFrame(({ clock }) => {
    ref.current.position.z = (clock.getElapsedTime() * 5) % DISTANCE;
  });

  return (
    <>
      <group ref={ref}>
        {rectangles.map((rectangle, index) => (
          <Rectangle
            key={index}
            width={rectangle.width}
            height={rectangle.height}
            position={[0, 0, -index * DISTANCE]}
          />
        ))}
      </group>
    </>
  );
}
