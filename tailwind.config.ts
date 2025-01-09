import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-gray-1000": "var(--gray-1000)",
        "brand-gray-500": "var(--gray-500)",
        "brand-gray-200": "var(--gray-200)",
        "brand-gray-100": "var(--gray-100)",
        "brand-gray-0": "var(--gray-0)",

        "brand-pink-600": "var(--pink-600)",
        "brand-pink-200": "var(--pink-200)",
        "brand-pink-100": "var(--pink-100)",
        "brand-pink-50": "var(--pink-50)",

        "brand-violet-900": "var(--violet-900)",
        "brand-violet-600": "var(--violet-600)",
        "brand-violet-100": "var(--violet-100)",
        "brand-violet-50": "var(--violet-50)",

        "brand-red-600": "var(--red-600)",

        "brand-green-600": "var(--green-600)",

        "brand-violet-gradient": "var(--violet-gradient)",
      },
    },
  },
  plugins: [],
} satisfies Config;
