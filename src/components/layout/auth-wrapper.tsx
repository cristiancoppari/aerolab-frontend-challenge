"use client";

import type { PropsWithChildren } from "react";

import { useQuery } from "@tanstack/react-query";

import { Typography } from "@/components/typography";
import { getToken } from "@/lib/fetchers";

export default function AuthWrapper({ children }: PropsWithChildren) {
  const { isLoading, error } = useQuery({
    queryKey: ["api-token"],
    queryFn: getToken,
  });

  if (isLoading)
    return (
      <div className="flex h-[50vh] items-center justify-center bg-transparent">
        <Typography as="h1" variant="h1">
          Loading app...
        </Typography>
      </div>
    );
  if (error)
    return (
      <div className="flex h-[50vh] items-center justify-center bg-transparent">
        <Typography as="h1" variant="h1">
          Error: {error.message}
        </Typography>
      </div>
    );

  return <>{children}</>;
}
