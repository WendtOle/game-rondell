import React from "react";
import { useSessionId } from "./hooks/useSessionId";
import { VoteCreationForm } from "./VoteCreationForm";
import { VoteList } from "./VoteList";
import { ResultList } from "./ResultList";
import { useLocalBoardGames } from "./hooks/useBoardGameStorage";
import { useLocalSessions } from "./hooks/useGameSessionStorage";
import { SessionList } from "./SessionList";

export const SessionView = () => {
  const params = useSessionId();
  const { games, getGameById, saveGame } = useLocalBoardGames();
  const {
    getPreviouslyNominatedGames,
    saveVote,
    getSessionById,
    sessionSummaryList,
    removeVote,
    isValidSession,
    finishSession,
  } = useLocalSessions();

  const onSelectSessions = (sessionId) => params.set("session", sessionId);

  return (
    <div className="mx-auto p-4 w-4xl">
      <VoteCreationForm
        games={games}
        getGameById={getGameById}
        getPreviouslyNominatedGames={getPreviouslyNominatedGames}
        saveVote={saveVote}
        setSession={onSelectSessions}
        saveGame={saveGame}
      />
      <VoteList
        getPreviouslyNominatedGames={getPreviouslyNominatedGames}
        getSessionById={getSessionById}
        onDelete={(id) => removeVote(id)}
      />
      <ResultList
        votes={getSessionById()?.votes ?? []}
        getGameById={getGameById}
        nominatedGameIds={getPreviouslyNominatedGames()}
        isValidSession={isValidSession}
        session={getSessionById()}
        finishSession={finishSession}
      />
      <SessionList
        sessions={sessionSummaryList}
        onClickSession={onSelectSessions}
      />
    </div>
  );
};
