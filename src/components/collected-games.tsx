"use client";

import type { GameFilter } from "@/types/app";

import Image from "next/image";
import { useState } from "react";

import { Typography } from "@/components/typography";
import { Tabs } from "@/components/tabs";
import { useGameStore } from "@/providers/local-stored-games.provider";
import { cn } from "@/lib/utils";
import { GameCollected } from "@/types/api";

import GameGrid from "./layout/game-grid";

const DEFAULT_FILTER = "last-added";

const sortMethods = {
  "last-added": (games: GameCollected[]) =>
    [...games].sort((a, b) => b.addedAt.localeCompare(a.addedAt)),
  newest: (games: GameCollected[]) =>
    [...games].sort((a, b) => b.releaseDate - a.releaseDate),
  oldest: (games: GameCollected[]) =>
    [...games].sort((a, b) => a.releaseDate - b.releaseDate),
};

export function CollectedGames() {
  const { collectedGames } = useGameStore();

  const hasGames = collectedGames.length > 0;

  const [filter, setFilter] = useState<GameFilter>(() => DEFAULT_FILTER);

  return (
    <section>
      <div className="flex flex-col gap-4">
        <Typography variant="h1" as="h2">
          Saved games
        </Typography>

        <Tabs
          className={cn(!hasGames && "hidden")}
          filter={filter}
          handleFilterChange={setFilter}
        />
      </div>

      {hasGames ? (
        <Games games={collectedGames} filter={filter} />
      ) : (
        <EmptyState />
      )}
    </section>
  );
}

function EmptyState() {
  return (
    <div className="mt-[4.75rem] flex flex-col items-center justify-center">
      <Image
        src="/images/empty.png"
        alt="Empty state"
        width={358}
        height={168}
      />

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

function Games({
  games,
  filter,
}: {
  games: GameCollected[];
  filter: GameFilter;
}) {
  const sortedGames = sortMethods[filter](games);

  return (
    <div className="mt-6">
      <GameGrid games={sortedGames} />
    </div>
  );
}
