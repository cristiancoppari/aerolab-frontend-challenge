import type { PropsWithChildren } from "react";

export default function GameGrid({ children }: PropsWithChildren) {
  return <div className="grid grid-cols-3 gap-2">{children}</div>;
}
