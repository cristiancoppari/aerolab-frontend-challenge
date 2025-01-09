import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { IGDB_BASE_URL } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get IGDB token
 * @returns {Promise<string>}
 */

type IGDBTokenResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

export async function getIGDBToken(): Promise<string> {
  try {
    const response = await fetch(
      `${IGDB_BASE_URL}?client_id=${process.env.IGDB_CLIENT_ID}&client_secret=${process.env.IGDB_CLIENT_SECRET}&grant_type=client_credentials`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    console.log(response);

    if (!response.ok) {
      throw new Error("Failed to fetch IGDB token");
    }

    const data: IGDBTokenResponse = await response.json();
    return data.access_token;
  } catch (error) {
    console.error(error);
    throw new Error("Unexpected error. Please try again later.");
  }
}
