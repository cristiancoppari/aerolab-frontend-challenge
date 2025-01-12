"use client";

import type { GameFilter } from "@/types/app";

import Image from "next/image";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";

import { Typography } from "@/components/typography";
import { Tabs } from "@/components/tabs";
import { useGameStore } from "@/providers/local-stored-games.provider";
import { cn } from "@/lib/utils";
import { GameCollected } from "@/types/api";

import GameGrid from "./layout/game-grid";
import GameCard from "./ui/game-card";

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

  const tabsRef = useRef(null);
  const isInView = useInView(tabsRef, { margin: "-1px 0px 0px 0px" });

  return (
    <section>
      <div className="flex flex-col gap-4 md:mt-[6.25rem]">
        <Typography variant="h1" as="h2" className="md:text-center">
          Saved games
        </Typography>

        <div ref={tabsRef}>
          <Tabs
            className={cn(!hasGames && "hidden")}
            filter={filter}
            handleFilterChange={setFilter}
          />
        </div>

        <AnimatePresence>
          {!isInView && hasGames && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed left-0 right-0 top-0 z-50"
            >
              <Tabs filter={filter} handleFilterChange={setFilter} isFixed />
            </motion.div>
          )}
        </AnimatePresence>
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
  const { removeGame } = useGameStore();

  const sortedGames = sortMethods[filter](games);

  return (
    <div className="mt-6">
      <GameGrid>
        {sortedGames.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            deleteGame={() => removeGame(game.id)}
          />
        ))}
      </GameGrid>
    </div>
  );
}
