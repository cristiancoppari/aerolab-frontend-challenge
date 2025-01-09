"use client";

import { useState, useRef, useEffect } from "react";
import { X, Search } from "lucide-react";
import { useClickOutside } from "@/hooks/use-click-outside";
import { cn } from "@/lib/utils";

interface Game {
  id: string;
  title: string;
  image: string;
}

const games: Game[] = [
  {
    id: "1",
    title: "Grand Theft Auto San Andreas",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "2",
    title: "Grand Theft Auto V",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "3",
    title: "Grand Theft Auto IV",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "4",
    title: "Grand Theft Auto III",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "5",
    title: "Grand Theft Auto",
    image: "/placeholder.svg?height=50&width=50",
  },
];

export function InputSearch() {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapperRef, () => setIsOpen(false));

  const filteredGames = games.filter((game) => game.title.toLowerCase().includes(search.toLowerCase()));

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
          <div className="absolute left-0 right-0 top-full overflow-hidden rounded-3xl rounded-t-[0px] border border-t-0 border-brand-pink-600/40 bg-white shadow-lg">
            <div className="p-2">
              {filteredGames.map((game) => (
                <button
                  key={game.id}
                  className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-purple-50"
                  onClick={() => {
                    setSearch(game.title);
                    setIsOpen(false);
                  }}
                >
                  <img src={game.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                  <span className="text-sm text-gray-900">{game.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
