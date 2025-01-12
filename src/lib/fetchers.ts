import type { Game, GameSearchResults } from "@/types/api";

import { getBaseUrl } from "./utils";

/**
 * Fetches a token from the API
 * @returns The token
 */
export async function getToken() {
  try {
    const response = await fetch("/api/token", {
      method: "POST",
    });

    if (!response.ok) {
      console.error("Failed to fetch token", response);
      throw new Error("Failed to fetch token");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching token", error);
    throw new Error("Failed to fetch token");
  }
}

/**
 * Fetches games from the API
 * @param slug - The slug of the game to search for
 * @returns The games that match the slug
 */
export async function searchGames(query: string): Promise<GameSearchResults> {
  try {
    const response = await fetch("/api/games", {
      method: "POST",
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      console.error("Failed to fetch games", response);
      throw new Error("Failed to fetch games");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching games", error);
    throw new Error("Failed to fetch games");
  }
}

/**
 * Fetch a single game from the API
 * @param slug - The slug of the game to search for
 * @returns The games that match the slug
 */
export async function getGame(slug: string): Promise<Game> {
  try {
    const response = await fetch(`${getBaseUrl()}/api/game`, {
      method: "POST",
      body: JSON.stringify({ slug }),
      next: {
        tags: ["game"],
        revalidate: 60 * 60 * 24,
      },
      cache: "force-cache",
    });

    if (!response.ok) {
      console.error("Failed to fetch games", response);
      throw new Error("Failed to fetch games");
    }

    const data = await response.json();

    return data[0];
  } catch (error) {
    console.error("Error fetching games", error);
    throw new Error("Failed to fetch games");
  }
}
