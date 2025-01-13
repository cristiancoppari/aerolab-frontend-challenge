import type { Metadata } from "next";

import { Toaster } from "sonner";

import { inter } from "@/lib/font";
import { QueryProvider } from "@/providers/query-client.provider";
import { GameStoreProvider } from "@/providers/local-stored-games.provider";
import AuthWrapper from "@/components/layout/auth-wrapper";
import Background from "@/components/layout/background";
import { getBaseUrl } from "@/lib/utils";
import { OG_DATA_BASE, TWITTER_DATA_BASE } from "@/lib/opengraph-data";
import { Header } from "@/components/layout/header";

import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  alternates: {
    canonical: "/",
  },
  title: OG_DATA_BASE?.title,
  description: OG_DATA_BASE?.description,
  openGraph: {
    ...OG_DATA_BASE,
    images: [`${getBaseUrl()}/images/opengraph-image.jpeg`],
    url: "/",
  },
  twitter: {
    ...TWITTER_DATA_BASE,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} relative antialiased`}>
        <Background />
        <GradientBackground />

        <div className="relative mx-auto max-w-[728px] px-4 pt-8 md:pt-[8.75rem]">
          <QueryProvider>
            <GameStoreProvider>
              <AuthWrapper>
                <Header />
                {children}
              </AuthWrapper>
            </GameStoreProvider>
          </QueryProvider>
          <Toaster position="bottom-center" />
        </div>
      </body>
    </html>
  );
}

function GradientBackground() {
  return (
    <div className="absolute inset-0 -z-10 h-[800px] bg-gradient-to-b from-brand-pink-50/20 from-[5%] to-brand-gray-0 to-[50%]" />
  );
}
