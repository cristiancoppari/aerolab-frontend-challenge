import type { GameFilter } from "@/types/app";
import type { Dispatch, RefObject, SetStateAction } from "react";

import { cn } from "@/lib/utils";

const pills: { label: string; dataFilter: GameFilter }[] = [
  { label: "Last added", dataFilter: "last-added" },
  { label: "Newest", dataFilter: "newest" },
  { label: "Oldest", dataFilter: "oldest" },
];

type TabsProps = {
  className?: string;
  filter: GameFilter;
  handleFilterChange: Dispatch<SetStateAction<GameFilter>>;
  isFixed?: boolean;
<<<<<<< Updated upstream
=======
  ref?: RefObject<HTMLUListElement | null>;
>>>>>>> Stashed changes
};

export function Tabs({
  className,
  filter,
  handleFilterChange,
  isFixed = false,
<<<<<<< Updated upstream
=======
  ref = undefined,
>>>>>>> Stashed changes
}: TabsProps) {
  return (
    <ul
      className={cn(
        "flex items-center md:justify-center",
        isFixed &&
          "mx-auto mt-4 max-w-fit rounded-full bg-white/85 p-1 backdrop-blur-sm",
        className,
      )}
<<<<<<< Updated upstream
=======
      ref={ref}
>>>>>>> Stashed changes
    >
      {pills.map((pill) => (
        <li key={pill.label}>
          <button
            onClick={() => handleFilterChange(pill.dataFilter)}
            className={cn(
              "inline-flex items-center justify-center rounded-full px-3 py-1.5 text-sm font-semibold text-brand-violet-900 transition-all duration-200 ease-in-out",
              pill.dataFilter === filter &&
                "bg-brand-violet-900 text-brand-gray-0",
            )}
          >
            {pill.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
