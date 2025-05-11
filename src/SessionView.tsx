import React from "react";
import { VoteCreationForm } from "./VoteCreationForm";
import { VoteList } from "./VoteList";
import { ResultList } from "./ResultList";
import { useLocalBoardGames } from "./hooks/useBoardGameStorage";
import { SessionList } from "./SessionList";

export const SessionView = () => {
  const { games, getGameById, saveGame } = useLocalBoardGames();

  return (
    <div className="mx-auto p-4 w-4xl">
      <VoteCreationForm
        games={games}
        getGameById={getGameById}
        saveGame={saveGame}
      />
      <VoteList />
      <ResultList getGameById={getGameById} />
      <SessionList />
    </div>
  );
};
