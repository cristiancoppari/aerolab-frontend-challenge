/**
 * Font configuration
 *
 * @returns {NextFontWithVariable} Font configuration for Inter font family
 */
import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600"],
});
