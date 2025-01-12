import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type IGDBImageSize = "cover_small" | "cover_big" | "1080p";

export function getImageUrl(size: IGDBImageSize, image_id: string | undefined) {
  if (!image_id) return "https://images.igdb.com/igdb/image/upload/t_cover_big/nocover.webp";
  return `https://images.igdb.com/igdb/image/upload/t_${size}/${image_id}.jpg`;
}

/**
 * Get the base URL for the current environment
 * Helper function to get the base URL for the current environment
 * Usefull when working with
 * @returns The base URL for the current environment
 */
export function getBaseUrl() {
  return process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://game-library-app.vercel.app";
}
