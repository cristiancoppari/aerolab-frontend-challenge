import type { Metadata } from "next";

import Image from "next/image";
import { redirect } from "next/navigation";

import { getGame } from "@/lib/fetchers";
import { Typography } from "@/components/typography";
import { extractGameData, getImageUrl } from "@/lib/utils";
import { Chip } from "@/components/chip";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { GameSimilar } from "@/types/api";
import { GameCard } from "@/components/game/game-card";
import { GameImage } from "@/components/game/game-image";
import { GameGrid } from "@/components/game/game-grid";
import { CollectedGamesButton } from "@/components/collected-games/collected-games-button";

type Params = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
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
  } = extractGameData(game);

  const title = `${game.name} - ${releaseDate} - Game Haven`;
  const description = `${game.name} is a ${genres} game released in ${releaseDate} by ${involvedCompanies} for ${platforms} and rated ${rating}. Here is a summary of the game: ${summary}`;

  return {
    alternates: {
      canonical: `/games/${game.slug}`,
    },
    title,
    description,
    openGraph: {
      title,
      url: `/games/${game.slug}`,
      siteName: "Game Haven",
      images: screenshots && [getImageUrl("1080p", screenshots[0])],
      locale: "en_US",
    },
    twitter: {
      title,
      description,
      images: screenshots && [getImageUrl("1080p", screenshots[0])],
      creator: "@cristiancoppari",
      site: "@cristiancoppari",
    },
  };
}

export default async function GamePage({ params }: Params) {
  const { slug } = await params;
  const game = await getGame(slug);

  if (!game) {
    return redirect("/");
  }

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
      <section className="flex gap-4 md:mb-6 md:mt-20">
        <GameImage game={game} />

        <div className="flex flex-col gap-2">
          <Typography as="h1" variant="h1">
            {game.name}
          </Typography>

          {involvedCompanies.length && (
            <Typography as="h3" variant="h3">
              {involvedCompanies.join(", ")}
            </Typography>
          )}

          <CollectedGamesButton
            game={game}
            className="hidden w-fit md:mt-6 md:block"
          />
        </div>
      </section>

      <div className="my-6 md:hidden">
        <CollectedGamesButton game={game} />
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
        <section>
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
              className="h-[5.25rem] w-[5.25rem] rounded-md object-cover md:aspect-square md:h-auto md:w-auto"
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
    <GameGrid>
      {similarGames.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </GameGrid>
  );
}
