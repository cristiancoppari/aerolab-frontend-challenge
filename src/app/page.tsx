"use client";

import { motion } from "motion/react";

import { Logo } from "@/components/logo";
import { Typography } from "@/components/typography";
import { InputSearch } from "@/components/input-search";
import { CollectedGames } from "@/components/collected-games";
import { FADE_IN_VARIANTS } from "@/lib/constants";
export default function Home() {
  return (
    <>
      <motion.header
        className="flex items-center gap-2 md:justify-center"
        variants={FADE_IN_VARIANTS}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.2, delay: 0.3 }}
      >
        <Logo />
        <Typography variant="h1">Gaming Haven Z</Typography>
      </motion.header>

      <motion.div
        className="mb-[1.875rem] mt-5"
        variants={FADE_IN_VARIANTS}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.2, delay: 0.4 }}
      >
        <InputSearch />
      </motion.div>

      <CollectedGames />
    </>
  );
}
