// BoardGameList.tsx
import React from "react";
import { Vote } from "./useGameSessionStorage";
import { Heading } from "./components/Heading";
import { List } from "./components/List";

interface VoteListProps {
  votes: Vote[];
}

export const VoteList: React.FC<VoteListProps> = ({ votes }) => {
  if (votes.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>Keine Stimmem abgegeben vorhanden.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto p-4">
      <Heading title="Abgegebene Stimmen" />
      <List
        items={votes}
        getId={({ id }) => id}
        itemRenderer={(vote) => (
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {vote.participant}
              </h3>
            </div>
          </div>
        )}
      />
    </div>
  );
};
