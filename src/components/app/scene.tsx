"use client";

import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export function Scene({ texture }) {
  const { width, height } = useThree((state) => state.viewport);
  console.log("render");
  return (
    <>
      {texture && (
        <mesh>
          <planeGeometry args={[width, height]} />
          <meshBasicMaterial map={texture} />
        </mesh>
      )}

      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 10, 5]} intensity={10.5} />
      <OrbitControls />
      <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={80} near={0.01} far={1000} />
    </>
  );
}
