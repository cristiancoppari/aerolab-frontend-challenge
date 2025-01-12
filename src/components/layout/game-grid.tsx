import type { GameCollected, GameSimilar } from "@/types/api";

import Link from "next/link";
import Image from "next/image";

import { getImageUrl } from "@/lib/utils";

type GameGridProps = {
  games: GameCollected[] | GameSimilar[];
};

export default function GameGrid({ games }: GameGridProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {games.map((game) => (
        <Link key={game.id} href={`/games/${game.slug}`}>
          <Image
            key={game.id}
            src={`${getImageUrl("cover_big", game.cover?.image_id)}`}
            alt={game.name}
            height={358}
            width={150}
            unoptimized
            className="rounded-md"
          />
        </Link>
      ))}
    </div>
  );
}
