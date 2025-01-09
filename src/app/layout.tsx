import type { Metadata } from "next";
import { inter } from "@/lib/font";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Gaming Haven Z",
  description: "Application for searching video games and their reviews from your favorite platforms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
