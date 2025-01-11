type Params = {
  params: Promise<{ slug: string }>;
};

export default async function GamePage({ params }: Params) {
  const { slug } = await params;

  return <div>Game: {slug}</div>;
}
