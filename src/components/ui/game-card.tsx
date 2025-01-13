"use client";

import type { GameCollected, GameSimilar } from "@/types/api";

import Link from "next/link";
import Image from "next/image";
import { TrashIcon } from "lucide-react";

import { getImageUrl } from "@/lib/utils";

type GameCardProps = {
  game: GameCollected | GameSimilar;
  deleteGame?: (gameId: string | number) => void;
};

export default function GameCard({ game, deleteGame }: GameCardProps) {
  return (
    <Link
      key={game.id}
      href={`/games/${game.slug}`}
      className="group relative w-full"
    >
      <Image
        key={game.id}
        src={`${getImageUrl("cover_big", game.cover?.image_id)}`}
        alt={game.name}
        height={358}
        width={150}
        unoptimized
        className="h-auto w-full rounded-md"
      />

      {deleteGame && <DeleteButton onClick={() => deleteGame(game.id)} />}
    </Link>
  );
}

function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 opacity-100 backdrop-blur-[10px] transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100"
    >
      <TrashIcon className="h-5 w-5" />
    </button>
  );
}
