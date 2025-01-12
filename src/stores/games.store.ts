import type { GameCollected } from "@/types/api";

import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";

type GameStoreState = {
  collectedGames: GameCollected[];
};

type GameStoreActions = {
  addGame: (game: GameCollected) => void;
  removeGame: (gameId: string | number) => void;
};

type GameStore = GameStoreState & GameStoreActions;

export function createGameStore(initialValue: GameCollected[]) {
  return createStore<GameStore>()(
    persist(
      (set) => ({
        collectedGames: initialValue,
        addGame: (game) =>
          set((state) => ({
            collectedGames: [...state.collectedGames, game],
          })),
        removeGame: (gameId) =>
          set((state) => ({
            collectedGames: state.collectedGames.filter(
              (game) => game.id !== gameId,
            ),
          })),
      }),
      {
        name: "game-storage",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );
}
