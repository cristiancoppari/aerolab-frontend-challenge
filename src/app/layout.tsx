import type { Metadata } from "next";

import Image from "next/image";

import { inter } from "@/lib/font";
import "@/styles/globals.css";
import { QueryProvider } from "@/providers/query-client.provider";
import AuthWrapper from "@/components/layout/auth-wrapper";

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
      <body className={`${inter.variable} antialiased`}>
        <main className="relative bg-gradient-to-b from-brand-pink-50/20 from-[5%] to-brand-gray-0 to-[50%] px-4">
          <Image
            src="/images/keys.png"
            alt="Gaming Haven Z"
            width={180}
            height={180}
            className="absolute right-0 top-0"
          />
          <QueryProvider>
            <AuthWrapper>{children}</AuthWrapper>
          </QueryProvider>
        </main>
      </body>
    </html>
  );
}
