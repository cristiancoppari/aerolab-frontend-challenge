"use client";

import { Logo } from "@/components/logo";
import { Typography } from "@/components/typography";
import { InputSearch } from "@/components/input-search";
import { CollectedGames } from "@/components/collected-games";

export default function Home() {
  return (
    <>
      <header className="flex items-center gap-2 md:justify-center">
        <Logo />
        <Typography variant="h1">Gaming Haven Z</Typography>
      </header>

      <div className="mb-[1.875rem] mt-5">
        <InputSearch />
      </div>

      <CollectedGames />
    </>
  );
}
