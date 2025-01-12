/**
 * https://zustand.docs.pmnd.rs/guides/nextjs
 */

"use client";

import {
  type PropsWithChildren,
  createContext,
  useRef,
  useContext,
} from "react";
import { useStore } from "zustand";

import { createGameStore } from "@/stores/games.store";

export type GameStoreApi = ReturnType<typeof createGameStore>;

export const GameStoreContext = createContext<GameStoreApi | null>(null);

export const GameStoreProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef<GameStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createGameStore([]);
  }
  return (
    <GameStoreContext.Provider value={storeRef.current}>
      {children}
    </GameStoreContext.Provider>
  );
};

export const useGameStore = () => {
  const gamesStoreContext = useContext(GameStoreContext);
  if (!gamesStoreContext) {
    throw new Error("useGameStore must be used within a GameStoreProvider");
  }
  return useStore(gamesStoreContext);
};
