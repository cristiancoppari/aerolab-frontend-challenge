import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-gray": {
          "0": "rgb(var(--gray-0) / <alpha-value>)",
          "100": "rgb(var(--gray-100) / <alpha-value>)",
          "150": "rgb(var(--gray-150) / <alpha-value>)",
          "200": "rgb(var(--gray-200) / <alpha-value>)",
          "500": "rgb(var(--gray-500) / <alpha-value>)",
          "600": "rgb(var(--gray-600) / <alpha-value>)",
          "1000": "rgb(var(--gray-1000) / <alpha-value>)",
        },
        "brand-pink": {
          "50": "rgb(var(--pink-50) / <alpha-value>)",
          "100": "rgb(var(--pink-100) / <alpha-value>)",
          "200": "rgb(var(--pink-200) / <alpha-value>)",
          "600": "rgb(var(--pink-600) / <alpha-value>)",
        },
        "brand-violet": {
          "50": "rgb(var(--violet-50) / <alpha-value>)",
          "100": "rgb(var(--violet-100) / <alpha-value>)",
          "600": "rgb(var(--violet-600) / <alpha-value>)",
          "900": "rgb(var(--violet-900) / <alpha-value>)",
        },
        "brand-red": {
          "600": "rgb(var(--red-600) / <alpha-value>)",
        },
        "brand-green": {
          "600": "rgb(var(--green-600) / <alpha-value>)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
