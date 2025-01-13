"use client";

import Image from "next/image";
import { useMediaQuery } from "usehooks-ts";

import { getImageUrl } from "@/lib/utils";
import { Game } from "@/types/api";

type Props = {
  game: Game;
};
export function GameImage({ game }: Props) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Image
      src={`${getImageUrl(isMobile ? "cover_small" : "cover_big", game.cover?.image_id)}`}
      alt={game.name}
      height={82}
      width={115}
      loading="eager"
      unoptimized
      className="w-auto rounded-md md:w-[10.625rem]"
    />
  );
}
