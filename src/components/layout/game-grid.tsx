import type { PropsWithChildren } from "react";

export default function GameGrid({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto grid max-w-[45.5rem] grid-cols-3 gap-2 md:grid-cols-4">
      {children}
    </div>
  );
}
