import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

import { getGame } from "@/lib/fetchers";
import { Typography } from "@/components/typography";
import { InputSearch } from "@/components/input-search";
import { getImageUrl } from "@/lib/utils";
import { Chip } from "@/components/chip";
import { Button } from "@/components/ui/button";

type Params = {
  params: Promise<{ slug: string }>;
};

export default async function GamePage({ params }: Params) {
  const { slug } = await params;
  const game = await getGame(slug);

  const involvedCompanies = game.involved_companies?.map((company) => company.company.name) || [];
  const releaseDate = game.first_release_date
    ? new Date(game.first_release_date * 1000).toLocaleDateString("en-US")
    : null;
  const rating = game.total_rating ? (game.total_rating / 10).toFixed(1) : null;
  const genres = game.genres?.map((genre) => genre.name).join(" & ");
  const summary = game.summary;
  const platforms = game.platforms?.map((platform) => platform.name).join(", ");

  console.log(JSON.stringify(game, null, 2));

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

      <div className="flex flex-col gap-6">
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
      </div>
    </main>
  );
}
