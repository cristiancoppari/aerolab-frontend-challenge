import { SwordsIcon } from "lucide-react";

export function Logo() {
  return (
    <div className="shadow-[0px_8px_24px_0px_#FF00AE29; ] relative w-fit rounded-lg bg-gradient-to-tr from-brand-pink-600 to-brand-pink-100 p-[2px]">
      <div className="relative overflow-hidden rounded-md bg-white">
        <span
          className="flex h-7 w-7 items-center justify-center bg-opacity-50 bg-gradient-to-t from-brand-pink-50/20 to-brand-gray-0"
          role="button"
          aria-label="Gaming Haven Z"
        >
          <SwordsIcon className="h-4 w-4 text-brand-violet-900" />
          <span className="sr-only">Gaming Haven Z</span>
        </span>
      </div>
    </div>
  );
}
