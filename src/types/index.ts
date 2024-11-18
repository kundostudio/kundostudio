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

export type LeaderboardUser = {
  name: string;
  zid: string | null;
  walletAddress: string | null;
  invitedBy: string | null;
  rewards: {
    amount: string;
    unit: string;
    precision: number;
  };
};

export type PaginatedLeaderboardResponse = {
  data: LeaderboardUser[];
  page: number;
  totalItems: number;
};

export type LeaderboardResponse = LeaderboardUser[];

export type LeaderboardTableRow = {
  rank: number;
  name: string;
  walletAddress: string | null;
  rewards: {
    amount: string;
    unit: string;
    precision: number;
  };
};

export type CoinInfo = {
  name: string;
  symbol: string;
  description: string;
  urls: {
    website: string;
    twitter: string;
    explorer: string;
  };
};

export type CoinData = {
  symbol: string;
  slug: string;
  change: number;
};

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>;
    meshLineMaterial: MaterialNode<MeshLineMaterial, typeof MeshLineMaterial>;
  }
}
