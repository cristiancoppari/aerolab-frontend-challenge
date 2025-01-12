import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

import { IGDB_BASE_URL } from "@/lib/constants";

const LIMIT = 50;

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    const redis = Redis.fromEnv();
    const token = await redis.get("api-token");
    const response = await fetch(`${IGDB_BASE_URL}/games`, {
      method: "POST",
      headers: {
        "Client-ID": process.env.IGDB_CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      body: `fields slug, name, cover.height, cover.width, cover.image_id; where name ~ *"${query}"*; limit ${LIMIT};`,
    });

    if (!response.ok) {
      console.error("Failed to fetch games", response);
      throw new Error("Failed to fetch games");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching games", error);
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 },
    );
  }
}
