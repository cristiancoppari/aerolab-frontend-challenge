"use client";

import type { PropsWithChildren } from "react";

import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";

import { getToken } from "@/lib/fetchers";

export default function AuthWrapper({ children }: PropsWithChildren) {
  const { isLoading, error } = useQuery({
    queryKey: ["token"],
    queryFn: getToken,
  });

  if (isLoading || error) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          className="flex h-[50vh] items-center justify-center bg-transparent"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {isLoading ? "Loading..." : `Error: ${error?.message}`}
        </motion.div>
      </AnimatePresence>
    );
  }

  return <>{children}</>;
}
