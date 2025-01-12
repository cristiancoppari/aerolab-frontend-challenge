"use client";

import Image from "next/image";

import { Logo } from "@/components/logo";
import { Typography } from "@/components/typography";
import { InputSearch } from "@/components/input-search";
import { Tabs } from "@/components/tabs";

export default function Home() {
  return (
    <div className="pt-8">
      <div className="flex items-center gap-2">
        <Logo />
        <Typography variant="h1">Gaming Haven Z</Typography>
      </div>

      <div className="mb-[1.875rem] mt-5">
        <InputSearch />
      </div>

      <div className="flex flex-col gap-4">
        <Typography variant="h1" as="h2">
          Saved games
        </Typography>

        <Tabs />
      </div>

      <EmptyState />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mt-[4.75rem] flex flex-col items-center justify-center">
      <Image src="/images/empty.png" alt="Empty state" width={358} height={168} />

      <div className="mt-6 flex flex-col gap-2 text-center">
        <Typography variant="h2" as="h2">
          Nothing collected yet
        </Typography>

        <Typography variant="h4" as="h3">
          Here you will see your collected games
        </Typography>
      </div>
    </div>
  );
}
