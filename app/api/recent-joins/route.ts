import { NextResponse } from "next/server";

import { RecentJoinsResponse } from "~/types";

const DEFAULT_LIMIT = 30;

export async function GET() {
  try {
    const response = await fetch(
      `https://zosapi.zero.tech/api/v2/users/recent-joins?page=1&limit=${DEFAULT_LIMIT}`
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data: RecentJoinsResponse = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch recent joins data";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
