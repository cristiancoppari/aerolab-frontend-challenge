"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useGameStore } from "@/providers/local-stored-games.provider";
import { Game, GameCollected } from "@/types/api";
import { cn } from "@/lib/utils";

import { Toast } from "./toast";

type Props = {
  game: Game;
  className?: string;
};

export default function CollectedGamesButton({ game, className }: Props) {
  const { collectedGames, addGame, removeGame } = useGameStore();

  if (!game.first_release_date) return null;

  const collectedGameData: GameCollected = {
    id: game.id,
    name: game.name,
    slug: game.slug,
    cover: game.cover,
    releaseDate: game.first_release_date,
    addedAt: new Date().toISOString(),
  };

  const isCollected = collectedGames.some((_game) => _game.id === game.id);

  function addGameHandler() {
    addGame(collectedGameData);
    toast.custom(() => (
      <Toast
        title="Game collected"
        description={`${game.name} has been added to your collection`}
        variant="success"
      />
    ));
  }

  function removeGameHandler() {
    removeGame(game.id);
    toast.custom(() => (
      <Toast
        title="Game removed"
        description={`${game.name} has been removed from your collection`}
        variant="error"
      />
    ));
  }

  return isCollected ? (
    <Button
      className={cn("w-full", className)}
      variant="secondary"
      onClick={removeGameHandler}
    >
      Game collected
    </Button>
  ) : (
    <Button className={cn("w-full", className)} onClick={addGameHandler}>
      Collect game
    </Button>
  );
}
