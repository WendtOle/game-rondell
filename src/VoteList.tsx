// BoardGameList.tsx
import React from "react";
import { Session } from "./types";
import { Heading } from "./components/Heading";
import { List } from "./components/List";

interface VoteListProps {
  getPreviouslyNominatedGames: (sessionId?: string) => string[];
  getSessionById: (sessionId?: string) => Session | undefined;
  onDelete: (voteId: string) => void;
}

export const VoteList: React.FC<VoteListProps> = ({
  getPreviouslyNominatedGames,
  getSessionById,
  onDelete,
}) => {
  const votes = () => getSessionById()?.votes ?? [];
  const nominatedGamesChangedSinceVote = (voteId: string) => {
    const vote = votes().find(({ id }) => id === voteId);
    if (!vote) {
      return false;
    }
    return vote.nominatedGames.length !== getPreviouslyNominatedGames().length;
  };
  if (votes().length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>Keine Stimmem abgegeben vorhanden.</p>
      </div>
    );
  }

  const finishedSession = getSessionById()?.finished;

  return (
    <div className="mx-auto p-4">
      <Heading title={finishedSession ? "Ergebnisse" : "Abgegebene Stimmen"} />
      {finishedSession && <h1>Stimmen von: </h1>}
      <List
        items={votes()}
        getId={({ id }) => id}
        itemRenderer={(vote) => (
          <div className="flex justify-between items-center space-x-4 w-full">
            <div>
              <h3 className="text-3xl text-gray-800">{vote.participant}</h3>
              {nominatedGamesChangedSinceVote(vote.id) && (
                <h2 className="text-2xl text-red-400">
                  Nominated games changed!
                </h2>
              )}
            </div>
            {nominatedGamesChangedSinceVote(vote.id) && (
              <button
                onClick={() => onDelete(vote.id)}
                className="text-2xl rounded-lg bg-red-600 text-white px-4 py-1"
              >
                Löschen
              </button>
            )}
          </div>
        )}
      />
    </div>
  );
};
