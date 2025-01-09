"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

// TODO: fix
const pillLabels = ["Last added", "Newest", "Oldest"];

export function Tabs() {
  const [active, setActive] = useState(1);

  return (
    <div>
      <ul className="flex items-center">
        {pillLabels.map((label, index) => (
          <li key={label}>
            <button
              onClick={() => setActive(index)}
              className={cn(
                "inline-flex items-center justify-center rounded-full px-3 py-1.5 text-sm font-semibold text-brand-violet-900 transition-all duration-200 ease-in-out",
                active === index && "bg-brand-violet-900 text-brand-gray-0",
              )}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
