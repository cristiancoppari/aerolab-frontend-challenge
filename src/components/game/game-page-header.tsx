/**
 * @deprecated
 * Extracted this component to test router.back()
 */
"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Typography } from "@/components/typography";
import { InputSearch } from "@/components/input-search";

export function GamePageHeader() {
  const router = useRouter();

  return (
    <header className="relative">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2"
      >
        <ArrowLeft className="h-4 w-4" />
        <Typography as="span" variant="h2" className="text-gradient">
          Back
        </Typography>
      </button>

      <div className="mb-[1.875rem] mt-5 md:m-0">
        <InputSearch />
      </div>
    </header>
  );
}
