import React, { useState } from "react";
import { GameCreationForm } from "./GameCreationForm";
import { BoardGameList } from "./GameList";
import { useLocalBoardGames } from "./useBoardGameStorage";
import { SessionCreationForm } from "./SessionCreationForm";
import { SessionList } from "./SessionList";

export const App = () => {
  const { games } = useLocalBoardGames();
  const [marked, setMarked] = useState<string[]>([]);
  const onSelectGame = (id: string) =>
    setMarked(
      marked.includes(id)
        ? marked.filter((game) => game !== id)
        : [...marked, id],
    );

  return (
    <div>
      <BoardGameList
        games={games}
        onSelectGame={onSelectGame}
        selected={marked}
      />
      <GameCreationForm />
      <SessionList />
      <SessionCreationForm gameIds={marked} />
    </div>
  );
};
