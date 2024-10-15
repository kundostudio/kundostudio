import { Environment, PerspectiveCamera } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";

extend({ MeshLineGeometry, MeshLineMaterial });

import { DashedLines } from "./dashedLines";
import { Rectangles } from "./squares";

export function HomeScene() {
  return (
    <>
      <DashedLines />
      <Rectangles />
      <Environment preset="city" environmentIntensity={0} />
      <ambientLight intensity={1} />
      <PerspectiveCamera makeDefault fov={40} position={[0, 0, 5]} />
    </>
  );
}
