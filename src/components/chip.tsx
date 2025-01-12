import type { PropsWithChildren } from "react";

import { StarIcon, CalendarIcon, PuzzleIcon } from "lucide-react";

import { Typography } from "@/components/typography";

type ChipProps = {
  type: "rating" | "release" | "genre";
} & PropsWithChildren;

const chipIcons = {
  rating: StarIcon,
  release: CalendarIcon,
  genre: PuzzleIcon,
} as const;

const chipLabels = {
  rating: "Rating",
  release: "Calendar",
  genre: "Genre",
} as const;

export function Chip({ children, type }: ChipProps) {
  const Icon = chipIcons[type];
  const label = chipLabels[type];

  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-brand-violet-50 px-3 py-1 text-sm font-medium text-brand-violet-100">
      <div className="flex items-center gap-1 text-brand-violet-600">
        <Icon className="size-4" />
        <Typography variant="h5">{label}:</Typography>
      </div>

      <Typography variant="chip">{children}</Typography>
    </span>
  );
}
