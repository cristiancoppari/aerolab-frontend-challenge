"use client";

import { Logo } from "@/components/logo";
import { Typography } from "@/components/typography";
import { InputSearch } from "@/components/input-search";
import { CollectedGames } from "@/components/collected-games";

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

      <CollectedGames />
    </div>
  );
}
