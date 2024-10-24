import { MaterialNode, Object3DNode } from "@react-three/fiber";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";

export type Theme = {
  name: string;
  color: string;
  light: string | null;
  shadow: string | null;
};

export type Multiplier = "MEOW" | "FIVE" | "TEN" | "A" | "X" | "WWW";

export type LeaderboardPosition = {
  rank: number;
  name: string;
  invitedBy: string;
  multipliers: Multiplier[];
  meowAmount: number;
};

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>;
    meshLineMaterial: MaterialNode<MeshLineMaterial, typeof MeshLineMaterial>;
  }
}
