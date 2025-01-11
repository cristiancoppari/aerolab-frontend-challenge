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
