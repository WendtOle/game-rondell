// BoardGameList.tsx
import React from "react";
import { Heading } from "./components/Heading";
import { List } from "./components/List";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  nominatedGamesState,
  sessionState,
  votesState,
} from "./state/sessions";
import { SimpleList } from "./components/SimpleList";

export const VoteList: React.FC = () => {
  const [votes, setVotes] = useRecoilState(votesState);
  const session = useRecoilValue(sessionState);
  const nominatedGames = useRecoilValue(nominatedGamesState);
  const nominatedGamesChangedSinceVote = (voteId: string) => {
    const vote = votes.find(({ id }) => id === voteId);
    if (!vote) {
      return false;
    }
    return vote.nominatedGames.length !== nominatedGames.length;
  };
  if (votes.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>Keine abgegebenen Stimmen vorhanden.</p>
      </div>
    );
  }

  const finishedSession = session?.finished;

  return (
    <div className="mx-auto p-4">
      <Heading title={finishedSession ? "Ergebnisse" : "Abgegebene Stimmen"} />
      {finishedSession ? (
        <SimpleList
          label="Es haben folgende Personen abgestimmt:"
          items={votes.map(({ participant, id }) => ({
            label: participant,
            id,
          }))}
        />
      ) : (
        <List
          items={votes}
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
                  onClick={() =>
                    setVotes((curVotesState) =>
                      curVotesState.filter((item) => item.id !== vote.id),
                    )
                  }
                  className="text-2xl rounded-lg bg-red-600 text-white px-4 py-1"
                >
                  Löschen
                </button>
              )}
            </div>
          )}
        />
      )}
    </div>
  );
};
