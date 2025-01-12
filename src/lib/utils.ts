import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Game } from "@/types/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type IGDBImageSize = "cover_small" | "cover_big" | "1080p";

export function getImageUrl(size: IGDBImageSize, image_id: string | undefined) {
  if (!image_id)
    return "https://images.igdb.com/igdb/image/upload/t_cover_big/nocover.webp";
  return `https://images.igdb.com/igdb/image/upload/t_${size}/${image_id}.jpg`;
}

/**
 * Get the base URL for the current environment
 * Helper function to get the base URL for the current environment
 * Usefull when working with
 * @returns The base URL for the current environment
 */
export function getBaseUrl() {
  return process.env.API_URL;
}

/**
 * Extract game data to be used in the UI
 */
export function extractGameData(game: Game) {
  return {
    involvedCompanies:
      game.involved_companies?.map((company) => company.company.name) || [],
    releaseDate: game.first_release_date
      ? formatIGDBDate(game.first_release_date)
      : null,
    rating: game.total_rating ? (game.total_rating / 10).toFixed(1) : null,
    genres: game.genres?.map((genre) => genre.name).join(" & ") || null,
    summary: game.summary,
    platforms:
      game.platforms?.map((platform) => platform.name).join(", ") || null,
    screenshots: game.screenshots?.map((screenshot) => screenshot.image_id),
    similarGames: game.similar_games?.map((game) => game).slice(0, 6),
  };
}

export function formatIGDBDate(date: number) {
  return new Date(date * 1000).toLocaleDateString("en-US");
}
