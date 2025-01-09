"use client";

/**
 * @description Hook to handle click outside of a component
 * @param ref - The ref of the component
 * @param callback - The callback to be executed when the click is outside the component
 */

import { useEffect, RefObject } from "react";

export const useClickOutside = (ref: RefObject<HTMLElement | null>, handler: () => void) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};
