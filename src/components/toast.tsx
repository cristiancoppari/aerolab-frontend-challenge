import { CircleCheckIcon, CircleXIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Typography } from "./typography";

type ToastVariant = "success" | "error";

type ToastProps = {
  title: string;
  description: string;
  variant: ToastVariant;
};

const toastIcons = {
  success: CircleCheckIcon,
  error: CircleXIcon,
} as const;

export function Toast({ title, description, variant }: ToastProps) {
  const Icon = toastIcons[variant];

  return (
    <div
      className={cn(
        "flex w-full max-w-[22.5rem] flex-col gap-1 rounded-lg border border-brand-violet-50 bg-white p-4 shadow-2xl",
        variant === "success" && "border-brand-green-600",
        variant === "error" && "border-brand-red-600",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2",
          variant === "success" && "text-brand-green-600",
          variant === "error" && "text-brand-red-600",
        )}
      >
        <Icon className="size-4" />
        <Typography variant="h2">{title}</Typography>
      </div>

      <Typography variant="h4">{description}</Typography>
    </div>
  );
}
