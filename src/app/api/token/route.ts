import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

import { IGDB_AUTH_URL } from "@/lib/constants";

type TokenResponse = {
  access_token: string;
  expires_in: number;
  token_type: "bearer";
};

export async function POST() {
  try {
    const response = await fetch(
      `${IGDB_AUTH_URL}?client_id=${process.env.IGDB_CLIENT_ID}&client_secret=${process.env.IGDB_CLIENT_SECRET}&grant_type=client_credentials`,
      {
        method: "POST",
      },
    );

    if (!response.ok) {
      console.error("Failed to fetch token", response);
      return NextResponse.json({ error: "Failed to fetch token" }, { status: 500 });
    }

    const data: TokenResponse = await response.json();

    const redis = Redis.fromEnv();

    await redis.set("api-token", data.access_token);

    return NextResponse.json("Token fetched successfully");
  } catch (error) {
    console.error("Error fetching token", error);
    return NextResponse.json({ error: "Failed to fetch token" }, { status: 500 });
  }
}
