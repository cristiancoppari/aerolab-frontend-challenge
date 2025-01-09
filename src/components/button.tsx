import type { PropsWithChildren } from "react";

import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva("", {
  variants: {
    style: {
      default:
        "inline-block py-2 px-4 font-base rounded-full bg-brand-violet-900 text-brand-gray-0 border border-brand-violet-900 font-semibold active:bg-brand-gray-0 active:text-brand-violet-900 transition-all duration-200 ease-in-out hover:bg-brand-violet-600",
    },
  },
  defaultVariants: {
    style: "default",
  },
});

type TypographyProps = {
  as?: React.ElementType;
  className?: string;
} & VariantProps<typeof buttonVariants>;

export function Button({ children, style, className, ...props }: PropsWithChildren<TypographyProps>) {
  return (
    <button className={cn(buttonVariants({ style, className }))} {...props}>
      {children}
    </button>
  );
}
