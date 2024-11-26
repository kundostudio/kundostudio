import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://zosapi.zero.tech/api/v2/users/info");
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching user info:", error);
    return NextResponse.json({ error: "Failed to fetch user info" }, { status: 500 });
  }
}
