// BoardGameList.tsx
import React from "react";
import { List } from "./components/List";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  nominatedGamesState,
  sessionState,
  votesState,
} from "./state/sessions";
import { Vote } from "./types";
import { voteParticipantNameState } from "./state/voteName";

export const VoteList: React.FC = () => {
  const [votes, setVotes] = useRecoilState(votesState);
  const session = useRecoilValue(sessionState);
  const nominatedGames = useRecoilValue(nominatedGamesState);
  const setNewVoteParticipantName = useSetRecoilState(voteParticipantNameState);

  const nominatedGamesChangedSinceVote = (voteId: string) => {
    const vote = votes.find(({ id }) => id === voteId);
    if (!vote) {
      return false;
    }
    return vote.nominatedGames.length !== nominatedGames.length;
  };

  const handleVoteUpdateClick = (vote: Vote) => {
    setVotes((curVotesState) =>
      curVotesState.filter((item) => item.id !== vote.id),
    );
    setNewVoteParticipantName(vote.participant);
  };

  if (votes.length === 0 || session?.finished) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <h1 className="text-2xl">Abgegebene Stimmen</h1>
      <List
        items={votes}
        getId={({ id }) => id}
        itemRenderer={(vote) => (
          <div className="flex justify-between items-center space-x-4 w-full">
            <h3 className="text-xl text-gray-800">{vote.participant}</h3>
            {nominatedGamesChangedSinceVote(vote.id) && (
              <button
                onClick={() => handleVoteUpdateClick(vote)}
                className="cursor-pointer text-1xl rounded-lg bg-red-600 text-white px-4 py-1"
              >
                Stimme aktualisieren
              </button>
            )}
          </div>
        )}
      />
    </div>
  );
};
