import React from "react";
import { GameCreationForm } from "./GameCreationForm";
import { BoardGameList } from "./GameList";
import { useLocalBoardGames } from "./useBoardGameStorage";

export const App = () => {
  const { games } = useLocalBoardGames();
  return (
    <div>
      <BoardGameList games={games} />
      <GameCreationForm />
    </div>
  );
};
