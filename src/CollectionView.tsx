import React, { useState } from "react";
import { GameCreationForm } from "./GameCreationForm";
import { BoardGameList } from "./GameList";
import { useLocalBoardGames } from "./useBoardGameStorage";
import { SessionCreationForm } from "./SessionCreationForm";
import { SessionList } from "./SessionList";
import { useQuery } from "./useQuery";

export const CollectionView = () => {
  const params = useQuery();
  const { games } = useLocalBoardGames();
  const [marked, setMarked] = useState<string[]>([]);
  const onSelectGame = (id: string) =>
    setMarked(
      marked.includes(id)
        ? marked.filter((game) => game !== id)
        : [...marked, id],
    );

  return (
    <div className="mx-auto p-4 w-4xl">
      <BoardGameList
        games={games}
        onSelectGame={onSelectGame}
        selected={marked}
      />
      <GameCreationForm />
      <SessionList
        onClickSession={(sessionId) => params.set("session", sessionId)}
      />
      <SessionCreationForm gameIds={marked} />
    </div>
  );
};
