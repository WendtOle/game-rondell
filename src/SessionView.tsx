import React from "react";
import { useSessionId } from "./useSessionId";
import { VoteCreationForm } from "./VoteCreationForm";
import { VoteList } from "./VoteList";
import { ResultList } from "./ResultList";
import { GameCreationForm } from "./GameCreationForm";
import { useLocalBoardGames } from "./useBoardGameStorage";
import { useLocalSessions } from "./useGameSessionStorage";

export const SessionView = () => {
  const params = useSessionId();
  const { games, getGameById, saveGame } = useLocalBoardGames();
  const { getPreviouslyNominatedGames, saveVote, getSessionById } =
    useLocalSessions();

  return (
    <div className="mx-auto p-4 w-4xl">
      <VoteCreationForm
        games={games}
        getGameById={getGameById}
        getPreviouslyNominatedGames={getPreviouslyNominatedGames}
        saveVote={saveVote}
        setSession={(sessionId) => params.set("session", sessionId)}
      />
      <VoteList
        getPreviouslyNominatedGames={getPreviouslyNominatedGames}
        getSessionById={getSessionById}
      />
      <ResultList
        votes={getSessionById()?.votes ?? []}
        getGameById={getGameById}
        nominatedGameIds={getPreviouslyNominatedGames()}
      />
      <GameCreationForm saveGame={saveGame} />
    </div>
  );
};
