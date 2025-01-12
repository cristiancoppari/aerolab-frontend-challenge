import type { Metadata } from "next";

import Image from "next/image";
import { Toaster } from "sonner";

import { inter } from "@/lib/font";
import { QueryProvider } from "@/providers/query-client.provider";
import { GameStoreProvider } from "@/providers/local-stored-games.provider";
import AuthWrapper from "@/components/layout/auth-wrapper";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Gaming Haven Z",
  description:
    "Application for searching video games and their reviews from your favorite platforms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <div className="relative px-4">
          <div className="absolute inset-0 -z-10 h-[800px] bg-gradient-to-b from-brand-pink-50/20 from-[5%] to-brand-gray-0 to-[50%]" />
          <BackgroundImage />
          <QueryProvider>
            <GameStoreProvider>
              <AuthWrapper>{children}</AuthWrapper>
            </GameStoreProvider>
          </QueryProvider>
          <Toaster />
        </div>
      </body>
    </html>
  );
}

function BackgroundImage() {
  return (
    <Image
      src="/images/keys.png"
      alt="Gaming Haven Z"
      width={180}
      height={180}
      unoptimized
      className="absolute right-0 top-0"
    />
  );
}
