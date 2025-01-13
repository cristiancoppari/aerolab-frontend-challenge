"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

import { Typography } from "@/components/typography";
import { InputSearch } from "@/components/input-search";
import { FADE_IN_VARIANTS } from "@/lib/constants";
import { Logo } from "@/components/logo";

export function Header() {
  const pathname = usePathname();

  const isGamePage = pathname.includes("/games/");

  if (isGamePage) {
    return (
      <header className="relative">
        <Link
          href="/"
          className="flex items-center gap-2 md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2"
        >
          <ArrowLeft className="h-4 w-4" />
          <Typography as="span" variant="h2" className="text-gradient">
            Back
          </Typography>
        </Link>

        <div className="mb-[1.875rem] mt-5 md:m-0">
          <InputSearch />
        </div>
      </header>
    );
  }

  return (
    <motion.header
      variants={FADE_IN_VARIANTS}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.2, delay: 0.3 }}
    >
      <Link href="/" className="flex items-center gap-2 md:justify-center">
        <Logo />
        <Typography variant="h1">Gaming Haven Z</Typography>
      </Link>

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
    </motion.header>
  );
}
