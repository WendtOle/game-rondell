// BoardGameList.tsx
import React from "react";
import { Vote } from "./useGameSessionStorage";
import { Heading } from "./components/Heading";

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
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {votes.map((vote) => (
            <li
              key={vote.id}
              className={`p-4 transition-colors cursor-pointer hover:bg-gray-50 border-l-4 border-transparent`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {vote.participant}
                  </h3>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
