import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/category?id=65c06eba1736b10877f3f55d&start=1&limit=50",
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.COINBASE_APIKEY!,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.data?.coins) {
      throw new Error("Invalid data structure received");
    }

    const parsedData = data.data.coins.map((c) => ({
      symbol: c.symbol,
      change: c.quote.USD.percent_change_24h,
    }));

    return NextResponse.json(parsedData);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch coins data";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
