import { Generator } from "./generator";

export default async function GamePage({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  const { gameId } = await params;
  return <Generator gameId={gameId} />;
}
