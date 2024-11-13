import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const response = await fetch(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?slug=${slug}`,
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
    const coinData: any = Object.values(data.data)[0];

    return NextResponse.json({
      name: coinData.name,
      symbol: coinData.symbol,
      description: coinData.description,
      urls: {
        website: coinData.urls.website[0],
        twitter: coinData.urls.twitter[0],
        explorer: coinData.urls.explorer[0],
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch coin info";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
