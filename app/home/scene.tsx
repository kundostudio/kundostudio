import { Center, Environment, Float, PerspectiveCamera, Svg } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import { useStore } from "~/lib/store";

const logo = `

`;

export function HomeScene() {
  const logoRef = useRef(null!);
  const boxRef = useRef<THREE.Mesh>(null!);

  const primaryColor = useStore((s) => s.primaryColor);
  const { width, height } = useThree((s) => s.viewport);

  useFrame(({ pointer, camera, clock }) => {
    camera.position.z = -(clock.getElapsedTime() * 20) % 100;
  });

  return (
    <>
      <mesh ref={boxRef} position={[0, 0, 0]}>
        <boxGeometry args={[width, height, 400, 1, 1, 40]} />
        <meshStandardMaterial color={primaryColor} wireframe />
      </mesh>
      <ambientLight intensity={1} />
      <Environment preset="city" />
      <PerspectiveCamera makeDefault fov={40} position={[0, 0, 5]}>
        {primaryColor && (
          <Float speed={3} position={[0, 0, -5]}>
            <Center>
              <Svg
                ref={logoRef}
                scale={0.07}
                src={`<svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.5633 0L17.3702 5.72216H9.29144L2.09839 0L0 13.5779L8.82972 23.4821C8.9751 23.6452 9.15234 23.7755 9.35013 23.8647C9.54783 23.954 9.76171 24 9.97793 24H16.6838C16.9 24 17.1139 23.954 17.3116 23.8647C17.5093 23.7755 17.6865 23.6452 17.832 23.4821L26.6617 13.5779L24.5633 0ZM4.77899 14.3829C4.15898 13.3326 3.69919 11.9871 3.51473 10.2654H5.77838C5.77838 10.2654 12.5184 10.2654 12.5184 18.041C12.5186 18.041 7.31294 18.675 4.77899 14.3829ZM21.8827 14.3829C19.3488 18.6751 14.1431 18.041 14.1431 18.041C14.1431 10.2654 20.8832 10.2654 20.8832 10.2654H23.147C22.9625 11.9871 22.5026 13.3326 21.8827 14.3829Z" fill="${primaryColor}"/>
            </svg>
            `}
              ></Svg>
            </Center>
            <Center position={[0, 0, -0.1]}>
              <Svg
                ref={logoRef}
                scale={0.013}
                src={`<svg fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.0617815 76.7167C-0.174683 78.2075 0.274945 79.7253 1.28524 80.8467L51.2852 136.347C52.2334 137.399 53.5835 138 55 138H99C100.417 138 101.767 137.399 102.715 136.347L152.715 80.8467C153.717 79.7341 154.168 78.2307 153.943 76.75L142.943 4.25002C142.677 2.49315 141.498 1.00976 139.847 0.353512C138.195 -0.302733 136.32 -0.0332165 134.92 1.06146L97.2771 30.5001H56.7406L19.6049 1.08086C18.2123 -0.0223227 16.339 -0.30374 14.6838 0.341603C13.0286 0.986945 11.8401 2.46212 11.5618 4.21674L0.0617815 76.7167Z" fill="black"/>
</svg>
                  `}
              ></Svg>
            </Center>
          </Float>
        )}
      </PerspectiveCamera>
    </>
  );
}
