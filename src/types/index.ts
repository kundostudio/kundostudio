export type Theme = {
  name: string;
  color: string;
};

export type Multiplier = "MEOW" | "FIVE" | "TEN" | "A" | "X" | "WWW";

export type LeaderboardPosition = {
  rank: number;
  name: string;
  invitedBy: string;
  multipliers: Multiplier[];
  meowAmount: number;
};
