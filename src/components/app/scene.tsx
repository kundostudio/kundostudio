"use client";

import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export function Scene({ texture }) {
  const { width, height } = useThree((state) => state.viewport);
  return (
    <>
      <group>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="red" />
        </mesh>
        <mesh>
          <planeGeometry args={[width, height]} />
          <meshBasicMaterial map={texture} />
        </mesh>
      </group>

      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 10, 5]} intensity={10.5} />
      <OrbitControls />
      <OrthographicCamera makeDefault position={[5, 5, 5]} zoom={80} near={0.01} far={500} />
    </>
  );
}
