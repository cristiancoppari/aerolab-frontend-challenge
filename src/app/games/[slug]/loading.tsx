import { Typography } from "@/components/typography";

export default function Loading() {
  return (
    <div className="flex h-[50vh] items-center justify-center bg-transparent">
      <Typography as="h1" variant="h1">
        Loading game...
      </Typography>
    </div>
  );
}
