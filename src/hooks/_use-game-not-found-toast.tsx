/**
 * @deprecated
 * hook to show a toast when a game is not found
 */

"use client";

import { toast } from "sonner";
import { useEffect, useRef } from "react";
import { redirect } from "next/navigation";

import { Toast } from "@/components/toast";

export default function useGameNotFoundToast() {
  const hasShownToast = useRef(false); // to prevent multiple toasts in development

  useEffect(() => {
    if (!hasShownToast.current) {
      hasShownToast.current = true;
      toast.custom(() => (
        <Toast
          title="Game not found"
          description="The game you are looking for does not exist."
          variant="error"
        />
      ));
      redirect("/");
    }
  }, []);

  return null;
}
