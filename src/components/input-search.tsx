"use client";

import type { GameSearchResult } from "@/types/api";

import Image from "next/image";
import { useState, useRef } from "react";
import { X, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useDebounceValue } from "usehooks-ts";
import Link from "next/link";

import { FAV_GAMES_SLUGS } from "@/lib/constants";
import { getGame } from "@/lib/fetchers";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useClickOutside } from "@/hooks/use-click-outside";
import { cn } from "@/lib/utils";
import { searchGames } from "@/lib/fetchers";
import { getImageUrl } from "@/lib/utils";

const LIMIT = 10;

export function InputSearch() {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debouncedSearch = useDebounceValue(search, 300);

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["games", debouncedSearch[0]],
    queryFn: () => searchGames(debouncedSearch[0]),
    enabled: debouncedSearch[0]?.length > 0,
  });

  const { data: favGames, isLoading: favGamesLoading } = useQuery({
    queryKey: ["favGames"],
    queryFn: async () => {
      const games = await Promise.all(FAV_GAMES_SLUGS.map(getGame));
      return games;
    },
    staleTime: 1000 * 60 * 60 * 1.5, // 1.5 hours
  });

  useClickOutside(wrapperRef, () => setIsOpen(false));

  return (
    <div className="mx-auto w-full max-w-md rounded-full shadow-[0px_4px_16px_0px_#F2D0E766]">
      <div className="relative" ref={wrapperRef}>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center overflow-hidden">
            <Search className="h-4 w-4 text-brand-pink-200" />
          </div>
          <input
            type="search"
            placeholder="Search games..."
            className={cn(
              "h-10 w-full rounded-3xl border border-brand-pink-600/40 bg-white pl-10 pr-8 shadow-brand-pink-100 placeholder:text-brand-pink-200 focus:border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-100 [&::-webkit-search-cancel-button]:hidden",
              isOpen && "rounded-b-[0px]",
            )}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
          />
          <button
            onClick={() => {
              setSearch("");
              setIsOpen(false);
            }}
            className={`absolute inset-y-0 right-3 flex items-center ${
              search ? "text-gray-400 hover:text-gray-600" : "hidden"
            }`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {isOpen && (
          <div className="absolute left-0 right-0 top-full z-10 overflow-hidden rounded-3xl rounded-t-[0px] border border-t-0 border-brand-pink-600/40 bg-white shadow-lg">
            <ScrollArea className="h-auto max-h-[375px] overflow-y-auto p-2">
              {isLoading ? (
                <div className="p-2 text-sm text-gray-500">Loading...</div>
              ) : search.length > 0 ? (
                <>
                  <div className="mb-2 px-2 text-sm font-medium text-gray-500">
                    Search Results
                  </div>
                  {searchResults && searchResults.length > 0 ? (
                    searchResults
                      .slice(0, LIMIT)
                      .map((game: GameSearchResult) => (
                        <Link
                          key={game.id}
                          href={`/games/${game.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-purple-50"
                        >
                          <div className="h-10 w-10 flex-shrink-0">
                            <Image
                              src={getImageUrl(
                                "cover_small",
                                game.cover?.image_id,
                              )}
                              alt={game.name}
                              className="h-full w-full rounded-lg object-cover"
                              width={40}
                              height={40}
                            />
                          </div>
                          <span className="text-sm text-gray-900">
                            {game.name}
                          </span>
                        </Link>
                      ))
                  ) : (
                    <div className="p-2 text-sm text-gray-500">
                      No results found
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="mb-2 px-2 text-sm font-medium text-gray-500">
                    Recommended Games
                  </div>
                  {favGamesLoading
                    ? Array.from({ length: 5 }).map((_, index) => (
                        <div
                          key={index}
                          className="flex w-full items-center gap-3 rounded-xl p-2"
                        >
                          <div className="h-10 w-10 flex-shrink-0 animate-pulse rounded-lg bg-gray-200" />
                          <div className="h-4 w-[80%] animate-pulse rounded bg-gray-200" />
                        </div>
                      ))
                    : favGames?.map((game) => (
                        <Link
                          key={game.id}
                          href={`/games/${game.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-purple-50"
                        >
                          <div className="h-10 w-10 flex-shrink-0">
                            <Image
                              src={getImageUrl(
                                "cover_small",
                                game.cover?.image_id,
                              )}
                              alt={game.name}
                              className="h-full w-full rounded-lg object-cover"
                              width={40}
                              height={40}
                            />
                          </div>
                          <span className="text-sm text-gray-900">
                            {game.name}
                          </span>
                        </Link>
                      ))}
                </>
              )}
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
}
