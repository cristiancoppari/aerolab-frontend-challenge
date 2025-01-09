import { Typography } from "@/components/typography";
import { Button } from "@/components/button";
import { Chip } from "@/components/chip";

export default function Home() {
  return (
    <main>
      <Typography style="h1">Hello World</Typography>
      <Typography style="h2">Hello World</Typography>
      <Typography style="h3">Hello World</Typography>
      <Typography style="h4">Hello World</Typography>
      <Typography style="h5">Hello World</Typography>
      <Button>Hello World</Button>

      <Chip type="rating">8.9</Chip>
      <Chip type="release">01/01/2025</Chip>
      <Chip type="genre">Card & Board Game</Chip>
    </main>
  );
}
