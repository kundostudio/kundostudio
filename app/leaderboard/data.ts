export type Multiplier = "MEOW" | "FIVE" | "TEN" | "A" | "X" | "WWW";

export type LeaderboardPosition = {
  rank: number;
  name: string;
  invitedBy: string;
  multipliers: Multiplier[];
  meowAmount: number;
};

export const LEADERBOARD_POSITIONS: LeaderboardPosition[] = [
  {
    rank: 1,
    name: "Astroclaw",
    invitedBy: "Nebula Neko",
    multipliers: ["MEOW", "FIVE", "TEN", "A", "X", "WWW"],
    meowAmount: 367421000,
  },
  {
    rank: 2,
    name: "Nebulakat",
    invitedBy: "Warp Whisker",
    multipliers: ["MEOW", "FIVE", "TEN", "WWW"],
    meowAmount: 123456789,
  },
  {
    rank: 3,
    name: "Quantum Purr",
    invitedBy: "Nova Pounce",
    multipliers: ["TEN", "X", "WWW"],
    meowAmount: 85632100,
  },
  {
    rank: 4,
    name: "Stellar Whisker",
    invitedBy: "Galaxy Feline",
    multipliers: ["FIVE", "TEN", "A", "X"],
    meowAmount: 294827000,
  },
  {
    rank: 5,
    name: "Cosmo Claw",
    invitedBy: "Cosmo Claw",
    multipliers: ["MEOW", "TEN", "WWW"],
    meowAmount: 178903400,
  },
  {
    rank: 6,
    name: "Galaxy Feline",
    invitedBy: "Stellar Whisker",
    multipliers: ["FIVE", "TEN", "A", "WWW"],
    meowAmount: 45678912,
  },
  {
    rank: 7,
    name: "Nova Pounce",
    invitedBy: "Quantum Purr",
    multipliers: ["TEN", "X", "WWW"],
    meowAmount: 212345600,
  },
  {
    rank: 8,
    name: "Warp Whisker",
    invitedBy: "Nebulakat",
    multipliers: ["MEOW", "TEN", "A"],
    meowAmount: 98765432,
  },
  {
    rank: 9,
    name: "Nebula Neko",
    invitedBy: "Astroclaw",
    multipliers: ["MEOW", "FIVE", "A", "WWW"],
    meowAmount: 87654321,
  },
  {
    rank: 10,
    name: "Comet Catcher",
    invitedBy: "Stellar Whisker",
    multipliers: ["TEN", "X", "WWW"],
    meowAmount: 76543210,
  },
  {
    rank: 11,
    name: "Lunar Leap",
    invitedBy: "Nova Pounce",
    multipliers: ["MEOW", "FIVE", "TEN"],
    meowAmount: 65432109,
  },
  {
    rank: 12,
    name: "Stardust Scratcher",
    invitedBy: "Cosmo Claw",
    multipliers: ["FIVE", "A", "X", "WWW"],
    meowAmount: 54321098,
  },
  {
    rank: 13,
    name: "Orbit Ounce",
    invitedBy: "Quantum Purr",
    multipliers: ["MEOW", "TEN", "A"],
    meowAmount: 43210987,
  },
  {
    rank: 14,
    name: "Meteor Meow",
    invitedBy: "Galaxy Feline",
    multipliers: ["FIVE", "X", "WWW"],
    meowAmount: 32109876,
  },
  {
    rank: 15,
    name: "Cosmic Cuddle",
    invitedBy: "Nebulakat",
    multipliers: ["MEOW", "TEN", "X"],
    meowAmount: 21098765,
  },
  {
    rank: 16,
    name: "Supernova Snuggle",
    invitedBy: "Warp Whisker",
    multipliers: ["FIVE", "A", "WWW"],
    meowAmount: 10987654,
  },
  {
    rank: 17,
    name: "Galactic Groomer",
    invitedBy: "Astroclaw",
    multipliers: ["MEOW", "TEN", "X"],
    meowAmount: 9876543,
  },
  {
    rank: 18,
    name: "Interstellar Itch",
    invitedBy: "Lunar Leap",
    multipliers: ["FIVE", "A", "WWW"],
    meowAmount: 8765432,
  },
  {
    rank: 19,
    name: "Pulsar Purr",
    invitedBy: "Comet Catcher",
    multipliers: ["MEOW", "TEN", "X"],
    meowAmount: 7654321,
  },
  {
    rank: 20,
    name: "Void Voyager",
    invitedBy: "Stardust Scratcher",
    multipliers: ["FIVE", "A", "WWW"],
    meowAmount: 6543210,
  },
];

export type RecentJoin = {
  name: string;
  since: string;
};

export const RECENT_JOINS: RecentJoin[] = [
  { name: "Cosmo Claw", since: "1 minute" },
  { name: "Stellar Whisker", since: "15 minutes" },
  { name: "Quantum Purr", since: "11 minutes" },
  { name: "Nebulakat", since: "9 minutes" },
  { name: "Astroclaw", since: "7 minutes" },
  { name: "Pounce", since: "3 minutes" },
  { name: "Nova Pounce", since: "18 minutes" },
  { name: "Galactic Groomer", since: "22 minutes" },
  { name: "Meteor Meow", since: "25 minutes" },
  { name: "Lunar Leap", since: "30 minutes" },
  { name: "Stardust Scratcher", since: "35 minutes" },
  { name: "Orbit Ounce", since: "40 minutes" },
  { name: "Cosmic Cuddle", since: "45 minutes" },
  { name: "Supernova Snuggle", since: "50 minutes" },
  { name: "Interstellar Itch", since: "55 minutes" },
  { name: "Void Voyager", since: "1 hour" },
];
