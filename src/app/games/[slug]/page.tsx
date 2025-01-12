import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

import { getGame } from "@/lib/fetchers";
import { Typography } from "@/components/typography";
import { InputSearch } from "@/components/input-search";
import { extractGameData, getImageUrl } from "@/lib/utils";
import { Chip } from "@/components/chip";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { GameSimilar } from "@/types/api";

type Params = {
  params: Promise<{ slug: string }>;
};

export default async function GamePage({ params }: Params) {
  const { slug } = await params;
  const game = await getGame(slug);
  const {
    involvedCompanies,
    releaseDate,
    rating,
    genres,
    summary,
    platforms,
    screenshots,
    similarGames,
  } = extractGameData(game);

  return (
    <main className="flex flex-col justify-center">
      <div className="mb-6 mt-8">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <Typography as="span" variant="h2" className="text-gradient">
            Back
          </Typography>
        </Link>

        <div className="mb-[1.875rem] mt-5">
          <InputSearch />
        </div>
      </div>

      <section className="flex gap-4">
        <Image
          src={`${getImageUrl("cover_small", game.cover?.image_id)}`}
          alt={game.name}
          height={82}
          width={115}
          unoptimized
          className="rounded-md"
        />

        <div className="flex flex-col gap-2">
          <Typography as="h1" variant="h1">
            {game.name}
          </Typography>

          {involvedCompanies.length && (
            <Typography as="h3" variant="h3">
              {involvedCompanies.join(", ")}
            </Typography>
          )}
        </div>
      </section>

      {/* TODO: has to add to local storage */}
      <div className="my-6">
        <Button className="w-full">Collect game</Button>
      </div>

      <div className="mb-10 flex flex-col gap-6">
        <div className="flex flex-wrap gap-2">
          <Chip type="release">{releaseDate}</Chip>
          <Chip type="rating">{rating}</Chip>
          <Chip type="genre">{genres}</Chip>
        </div>

        {summary && (
          <section>
            <Typography as="h2" variant="h2" className="mb-2">
              Summary
            </Typography>

            <Typography as="p" variant="h4">
              {summary}
            </Typography>
          </section>
        )}

        {platforms && (
          <section>
            <Typography as="h2" variant="h2" className="mb-2">
              Platforms
            </Typography>

            <Typography as="p" variant="h4">
              {platforms}
            </Typography>
          </section>
        )}

        {screenshots && (
          <section>
            <Typography as="h2" variant="h2" className="mb-2">
              Media
            </Typography>

            <ScreenshotsCarousel
              screenshots={screenshots}
              gameName={game.name}
            />
          </section>
        )}
      </div>

      {similarGames && (
        <section className="mb-4">
          <Typography as="h2" variant="h1" className="mb-4">
            Similar games
          </Typography>

          <SimilarGamesGrid similarGames={similarGames} />
        </section>
      )}
    </main>
  );
}

function ScreenshotsCarousel({
  screenshots,
  gameName,
}: {
  screenshots: string[];
  gameName: string;
}) {
  return (
    <Carousel>
      <CarouselContent>
        {screenshots.map((screenshot) => (
          <CarouselItem key={screenshot} className="basis-1/4">
            <Image
              src={`${getImageUrl("1080p", screenshot)}`}
              alt={`${gameName} screenshot`}
              height={84}
              width={84}
              unoptimized
              className="h-[5.25rem] w-[5.25rem] rounded-md object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="absolute -left-2 top-1/2 h-10 w-10 -translate-y-1/2 border-none bg-brand-gray-150/50 backdrop-blur-sm" />
      <CarouselNext className="absolute -right-2 top-1/2 h-10 w-10 -translate-y-1/2 border-none bg-brand-gray-150/50 backdrop-blur-sm" />
    </Carousel>
  );
}

function SimilarGamesGrid({ similarGames }: { similarGames: GameSimilar[] }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {similarGames.map((game) => (
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
