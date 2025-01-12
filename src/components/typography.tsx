import type { PropsWithChildren } from "react";

import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "text-xl font-semibold md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-brand-violet-900 via-brand-violet-600 to-brand-violet-600",
      h2: "text-base font-semibold text-brand-gray-1000",
      h3: "text-sm font-medium text-brand-violet-100",
      h4: "text-sm font-medium text-brand-gray-600",
      h5: "text-sm font-medium",
      chip: "text-sm font-medium text-brand-violet-900",
    },
  },
});

type TypographyProps = {
  as?: React.ElementType;
  className?: string;
} & VariantProps<typeof typographyVariants>;

export function Typography({
  children,
  as: Comp = "p",
  variant,
  className,
  ...props
}: PropsWithChildren<TypographyProps>) {
  return (
    <Comp className={cn(typographyVariants({ variant, className }))} {...props}>
      {children}
    </Comp>
  );
}
