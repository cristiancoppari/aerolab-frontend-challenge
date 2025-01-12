"use client";

import type { PropsWithChildren } from "react";

import { useQuery } from "@tanstack/react-query";

import { getToken } from "@/lib/fetchers";

export default function AuthWrapper({ children }: PropsWithChildren) {
  const { isLoading, error } = useQuery({
    queryKey: ["api-token"],
    queryFn: getToken,
  });

  if (isLoading)
    return (
      <div className="flex h-[50vh] items-center justify-center bg-transparent">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex h-[50vh] items-center justify-center bg-transparent">
        Error: {error.message}
      </div>
    );

  return <>{children}</>;
}
