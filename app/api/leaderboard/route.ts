import { NextResponse } from "next/server";

import { LeaderboardResponse } from "~/types";

const DEFAULT_LIMIT = 20;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || String(DEFAULT_LIMIT), 10);

    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, Math.min(limit, 50));

    const response = await fetch(
      `https://zosapi.zero.tech/api/v2/users/leaderboard?page=${safePage}&limit=${safeLimit}`
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data: LeaderboardResponse = await response.json();

    const parsedData = data.map((user, index) => ({
      rank: (safePage - 1) * safeLimit + index + 1,
      name: user.name,
      invitedBy: user.invitedBy,
      rewards: {
        amount: user.rewards.amount,
        unit: user.rewards.unit,
        precision: user.rewards.precision,
      },
    }));

    return NextResponse.json({
      data: parsedData,
      page: safePage,
      limit: safeLimit,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch leaderboard data";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
